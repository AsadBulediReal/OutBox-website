import React, { useState, useEffect, useRef } from 'react';
import { 
  Folder, 
  FolderOpen, 
  File, 
  FileVideo, 
  FileImage, 
  FileAudio, 
  FileText, 
  FileCode,
  CheckSquare, 
  Square, 
  Play, 
  Pause, 
  Square as StopIcon,
  Search, 
  Settings, 
  RefreshCw, 
  ShieldCheck, 
  FolderSync, 
  CheckCircle2, 
  Lock, 
  ChevronRight,
  ChevronDown,
  Terminal,
  ArrowRight
} from 'lucide-react';
import type { FileNode, PresetProject } from '../data/mockData';
import { PRESET_PROJECTS } from '../data/mockData';

export const InteractiveAppSimulator: React.FC = () => {
  // Current active wizard step (0: Link, 1: Tree, 2: Transfers)
  const [activeStep, setActiveStep] = useState<number>(0);
  
  // Selected project preset
  const [selectedPreset, setSelectedPreset] = useState<PresetProject>(PRESET_PROJECTS[0]);
  const [linkInput, setLinkInput] = useState<string>(PRESET_PROJECTS[0].url);
  const [destPath, setDestPath] = useState<string>('D:\\Client_Projects\\Cinema_Reel_2026');
  const [isPasswordProtected, setIsPasswordProtected] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [showPasswordDialog, setShowPasswordDialog] = useState<boolean>(false);
  
  // Loading simulation
  const [isLoadingTree, setIsLoadingTree] = useState<boolean>(false);
  const [loadingStatus, setLoadingStatus] = useState<string>('Connecting to Dropbox API...');
  
  // Tree state
  const [treeData, setTreeData] = useState<FileNode>(JSON.parse(JSON.stringify(PRESET_PROJECTS[0].rootFolder)));
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Transfer simulation state
  const [isTransferring, setIsTransferring] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [overallProgress, setOverallProgress] = useState<number>(0);
  const [fileProgress, setFileProgress] = useState<number>(0);
  const [currentFileName] = useState<string>('A001_C001_1117_001.R3D');
  const [currentSpeed, setCurrentSpeed] = useState<string>('34.2 MB/s');
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [logs, setLogs] = useState<Array<{ id: number; time: string; tag: string; message: string; color: string }>>([
    { id: 1, time: '14:20:01', tag: 'SESSION', message: 'Dropbox session connected & authenticated', color: 'text-blue-400' },
    { id: 2, time: '14:20:02', tag: 'ACCOUNT', message: 'Connected as Alex Mercer (alex@cinema-studio.io)', color: 'text-emerald-400' },
  ]);
  
  // Settings drawer simulation
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [autoRepair, setAutoRepair] = useState<boolean>(true);
  const [concurrency, setConcurrency] = useState<number>(3);
  
  const timerRef = useRef<number | null>(null);

  // Switch preset
  const handleSelectPreset = (preset: PresetProject) => {
    setSelectedPreset(preset);
    setLinkInput(preset.url);
    setTreeData(JSON.parse(JSON.stringify(preset.rootFolder)));
    if (preset.id === 'cinema') {
      setDestPath('D:\\Client_Projects\\Cinema_Reel_2026');
    } else if (preset.id === 'photos') {
      setDestPath('D:\\Photography_Shoots\\Studio_Editorial_RAW');
    } else {
      setDestPath('D:\\UnrealProjects\\Cyberpunk_City_UE5');
    }
  };

  // Trigger loading directory tree
  const handleLoadFolders = () => {
    if (isPasswordProtected && !passwordInput) {
      setShowPasswordDialog(true);
      return;
    }
    
    setIsLoadingTree(true);
    setLoadingStatus('Connecting to Dropbox API endpoint...');
    
    setTimeout(() => {
      setLoadingStatus('Authenticating session...');
    }, 400);

    setTimeout(() => {
      setLoadingStatus('Resolving shared link tree hierarchy & metadata...');
    }, 900);

    setTimeout(() => {
      setIsLoadingTree(false);
      setActiveStep(1);
      addLog('SCAN', `Successfully parsed remote directory tree: ${selectedPreset.totalFiles} files detected`, 'text-blue-400');
    }, 1500);
  };

  // Helper to add logs
  const addLog = (tag: string, message: string, color: string = 'text-slate-300') => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    setLogs(prev => [
      ...prev.slice(-40),
      { id: Date.now() + Math.random(), time: timeStr, tag, message, color }
    ]);
  };

  // Toggle tree node expansion
  const toggleExpand = (nodeId: string) => {
    const updateRecursive = (node: FileNode): FileNode => {
      if (node.id === nodeId) {
        return { ...node, expanded: !node.expanded };
      }
      if (node.children) {
        return { ...node, children: node.children.map(updateRecursive) };
      }
      return node;
    };
    setTreeData(updateRecursive(treeData));
  };

  // Toggle selection checkbox
  const toggleSelect = (nodeId: string) => {
    const setSelection = (node: FileNode, targetId: string, newState?: boolean): FileNode => {
      if (node.id === targetId) {
        const val = newState !== undefined ? newState : !node.selected;
        return setSubtree(node, val);
      }
      if (node.children) {
        const updatedChildren = node.children.map(child => setSelection(child, targetId, newState));
        const allChecked = updatedChildren.every(c => c.selected);
        return { ...node, children: updatedChildren, selected: allChecked };
      }
      return node;
    };

    const setSubtree = (node: FileNode, val: boolean): FileNode => {
      return {
        ...node,
        selected: val,
        children: node.children ? node.children.map(c => setSubtree(c, val)) : undefined
      };
    };

    setTreeData(setSelection(treeData, nodeId));
  };

  // Select / Deselect all
  const setAllSelected = (val: boolean) => {
    const setAll = (node: FileNode): FileNode => ({
      ...node,
      selected: val,
      children: node.children ? node.children.map(setAll) : undefined
    });
    setTreeData(setAll(treeData));
  };

  // Calculate selected count and size
  const calculateSelection = (node: FileNode): { count: number; bytes: number } => {
    let count = 0;
    let bytes = 0;
    if (node.type === 'file' && node.selected) {
      count += 1;
      bytes += node.sizeBytes;
    }
    if (node.children) {
      for (const child of node.children) {
        const res = calculateSelection(child);
        count += res.count;
        bytes += res.bytes;
      }
    }
    return { count, bytes };
  };

  const { count: selectedCount, bytes: selectedBytes } = calculateSelection(treeData);
  const formattedSelectedSize = (selectedBytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';

  // Transfer simulation loop
  useEffect(() => {
    if (isTransferring && !isPaused) {
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds(s => s + 1);

        setFileProgress(fp => {
          if (fp >= 100) {
            // Next file simulation
            addLog('VERIFIED', `File integrity verified [OK] for ${currentFileName}`, 'text-emerald-400');
            addLog('FINALIZED', `Saved ${currentFileName}`, 'text-blue-300');
            return 0;
          }
          return fp + 12;
        });

        setOverallProgress(op => {
          if (op >= 100) {
            setIsTransferring(false);
            addLog('COMPLETE', 'All selected files downloaded and verified intact!', 'text-emerald-400');
            return 100;
          }
          return op + 3;
        });

        const randomSpeed = (32 + Math.random() * 8).toFixed(1);
        setCurrentSpeed(`${randomSpeed} MB/s`);
      }, 500);
    } else {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isTransferring, isPaused, currentFileName]);

  const handleStartDownload = () => {
    setIsTransferring(true);
    setIsPaused(false);
    setOverallProgress(5);
    setFileProgress(15);
    addLog('START', `Beginning selective download to ${destPath}`, 'text-blue-400');
    addLog('READY', `Direct streaming enabled with safe resume support`, 'text-sky-300');
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    if (!isPaused) {
      addLog('PAUSE', 'Transfer paused. Progress preserved safely', 'text-amber-400');
    } else {
      addLog('RESUME', 'Resuming transfer seamlessly from saved progress', 'text-sky-400');
    }
  };

  const handleStop = () => {
    setIsTransferring(false);
    setIsPaused(false);
    setOverallProgress(0);
    setFileProgress(0);
    addLog('STOP', 'Download worker canceled gracefully', 'text-rose-400');
  };

  const handleVerifyOnly = () => {
    setActiveStep(2);
    addLog('VERIFY', 'Starting local file integrity check...', 'text-indigo-400');
    setTimeout(() => {
      addLog('AUDIT', 'Checked 18 local files — all 18 match cloud checksums 100%', 'text-emerald-400');
    }, 1200);
  };

  // Render tree item recursively
  const renderTreeItem = (node: FileNode, depth = 0) => {
    const isFolder = node.type === 'folder';
    const isVisible = searchQuery === '' || node.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (!isVisible && !isFolder) return null;

    const getFileIcon = (ext?: string) => {
      if (!ext) return <File className="w-4 h-4 text-slate-400" />;
      const e = ext.toLowerCase();
      if (['r3d', 'mov', 'mp4', 'mkv'].includes(e)) return <FileVideo className="w-4 h-4 text-purple-400" />;
      if (['arw', 'png', 'jpg', 'exr', 'svg'].includes(e)) return <FileImage className="w-4 h-4 text-emerald-400" />;
      if (['wav', 'mp3', 'aac'].includes(e)) return <FileAudio className="w-4 h-4 text-amber-400" />;
      if (['pdf', 'txt', 'xml'].includes(e)) return <FileText className="w-4 h-4 text-sky-400" />;
      return <FileCode className="w-4 h-4 text-blue-400" />;
    };

    return (
      <div key={node.id} className="select-none">
        <div 
          className={`flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-slate-800/60 transition group text-xs sm:text-sm ${
            node.selected ? 'bg-blue-900/10' : ''
          }`}
          style={{ paddingLeft: `${depth * 18 + 8}px` }}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* Expand arrow for folders */}
            {isFolder ? (
              <button 
                onClick={() => toggleExpand(node.id)}
                className="p-0.5 text-slate-400 hover:text-white rounded cursor-pointer"
              >
                {node.expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            ) : (
              <span className="w-4" />
            )}

            {/* Checkbox */}
            <button 
              onClick={() => toggleSelect(node.id)}
              className="text-slate-400 hover:text-blue-400 transition cursor-pointer"
            >
              {node.selected ? (
                <CheckSquare className="w-4 h-4 text-blue-500 fill-blue-500/20" />
              ) : (
                <Square className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Icon */}
            {isFolder ? (
              node.expanded ? (
                <FolderOpen className="w-4 h-4 text-blue-400 flex-shrink-0" />
              ) : (
                <Folder className="w-4 h-4 text-blue-400 flex-shrink-0" />
              )
            ) : (
              getFileIcon(node.extension)
            )}

            {/* Name */}
            <span className={`truncate font-medium ${node.selected ? 'text-white' : 'text-slate-400'}`}>
              {node.name}
            </span>
          </div>

          {/* Size Tag */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            {node.type === 'file' && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                {node.sizeFormatted}
              </span>
            )}
            {isFolder && (
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                {node.sizeFormatted}
              </span>
            )}
          </div>
        </div>

        {/* Children */}
        {isFolder && node.expanded && node.children && (
          <div className="border-l border-slate-800/80 ml-4 my-0.5">
            {node.children.map(child => renderTreeItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div id="simulator" className="scroll-mt-24 w-full">
      {/* Outer Window Container */}
      <div className="relative rounded-3xl border border-slate-700/90 bg-slate-900/95 desktop-window-shadow backdrop-blur-xl overflow-hidden ring-1 ring-white/10">
        {/* Top Window Bar (Native OS styling) */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-950/90 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-semibold text-slate-400 hidden sm:inline">
              Outbox — Dropbox Recursive Downloader Pro [PySide6 Engine]
            </span>
          </div>

          {/* Center 3-Step Guided Wizard Bar */}
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
            <button
              onClick={() => setActiveStep(0)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeStep === 0 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>1. Link & Recent</span>
            </button>
            <button
              onClick={() => setActiveStep(1)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeStep === 1 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>2. Select Files</span>
              {selectedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-blue-700 text-[10px] text-white">
                  {selectedCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveStep(2)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeStep === 2 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>3. Transfers</span>
              {isTransferring && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}
            </button>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Settings Drawer"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Subheader: Account Status & Presets Bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-900/60 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Account status */}
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-slate-400">Connected Account:</span>
            <span className="font-semibold text-slate-200">Alex Mercer</span>
            <span className="text-slate-500 hidden sm:inline">(alex@cinema-studio.io)</span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20 font-mono">
              Connected & Secure
            </span>
          </div>

          {/* Preset switchers */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <span className="text-slate-500 font-medium">Try Presets:</span>
            {PRESET_PROJECTS.map(preset => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                  selectedPreset.id === preset.id
                    ? 'bg-blue-600/30 text-blue-300 border border-blue-500/50'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 border border-slate-700/50'
                }`}
              >
                {preset.badge} ({preset.totalSize})
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area: Step 1 / 2 / 3 */}
        <div className="p-4 sm:p-6 min-h-[460px] flex flex-col justify-between">
          {/* STEP 1: LINK & DESTINATION INPUT */}
          {activeStep === 0 && (
            <div className="space-y-6 max-w-3xl mx-auto w-full py-4">
              <div className="text-center space-y-1">
                <h3 className="text-xl font-bold text-white">Step 1: Paste Dropbox Shared Link</h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Enter any public or team shared folder link. Outbox will automatically inspect the directory tree.
                </p>
              </div>

              {/* Link Input Card */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4 shadow-xl">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Dropbox Shared Link
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={linkInput}
                      onChange={e => setLinkInput(e.target.value)}
                      placeholder="https://www.dropbox.com/scl/fo/..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm font-mono focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                        {selectedPreset.badge}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Local Destination Directory
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={destPath}
                      onChange={e => setDestPath(e.target.value)}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs sm:text-sm font-mono focus:outline-none focus:border-blue-500 transition"
                    />
                    <button 
                      onClick={() => alert('Folder picker dialog: Selected ' + destPath)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Folder className="w-3.5 h-3.5 text-blue-400" />
                      Browse
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                    <FolderSync className="w-3 h-3 text-emerald-400" />
                    Single-folder matching enabled: files download directly without creating duplicate nested folders.
                  </p>
                </div>

                {/* Password-protected simulation checkbox */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={isPasswordProtected}
                      onChange={e => setIsPasswordProtected(e.target.checked)}
                      className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0 cursor-pointer"
                    />
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Link requires password to unlock</span>
                  </label>

                  <div className="text-[11px] text-slate-500">
                    Detected: <span className="font-mono text-slate-400">{selectedPreset.totalFiles} files</span> ({selectedPreset.totalSize})
                  </div>
                </div>
              </div>

              {/* Load Button */}
              <div className="flex justify-center pt-2">
                <button
                  onClick={handleLoadFolders}
                  disabled={isLoadingTree}
                  className="px-8 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-600/30 transition transform active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>🔍 Load Folders & Inspect Tree</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: INTERACTIVE SELECTION TREE */}
          {activeStep === 1 && (
            <div className="space-y-4">
              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2 flex-1 max-w-sm">
                  <div className="relative w-full">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Filter files by name or extension..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <button
                    onClick={() => setAllSelected(true)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition cursor-pointer"
                  >
                    Select All
                  </button>
                  <button
                    onClick={() => setAllSelected(false)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition cursor-pointer"
                  >
                    Deselect All
                  </button>
                  <button
                    onClick={handleVerifyOnly}
                    className="px-2.5 py-1.5 rounded-lg bg-indigo-950/60 hover:bg-indigo-900/60 text-indigo-300 border border-indigo-800/60 transition cursor-pointer flex items-center gap-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verify Local Files
                  </button>
                </div>
              </div>

              {/* Tree Container */}
              <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-3 max-h-[340px] overflow-y-auto font-sans">
                {renderTreeItem(treeData)}
              </div>

              {/* Bottom Tally Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 px-2 text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">
                    Selected:{' '}
                    <strong className="text-white font-mono">{selectedCount}</strong> items (
                    <strong className="text-blue-400 font-mono">{formattedSelectedSize}</strong> of {selectedPreset.totalSize})
                  </span>
                  <span className="text-slate-600">|</span>
                  <span className="text-emerald-400 text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Bypasses 20 GB full-archive download
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveStep(0)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition cursor-pointer"
                  >
                    ← Back to Link
                  </button>
                  <button
                    onClick={() => setActiveStep(2)}
                    disabled={selectedCount === 0}
                    className="px-5 py-2 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition flex items-center gap-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <span>Proceed to Transfers</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: TRANSFERS & ACTIVITY LOG */}
          {activeStep === 2 && (
            <div className="space-y-4">
              {/* Telemetry Dashboard */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400">Transfer Speed</span>
                  <div className="text-xl font-bold font-mono text-blue-400 mt-0.5">
                    {isTransferring && !isPaused ? currentSpeed : '0.0 MB/s'}
                  </div>
                  <span className="text-[10px] text-slate-500">Chunk streaming (4MB)</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400">Overall Batch</span>
                  <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">
                    {overallProgress}%
                  </div>
                  <span className="text-[10px] text-slate-500">{selectedCount} files queued</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400">Elapsed Time</span>
                  <div className="text-xl font-bold font-mono text-slate-200 mt-0.5">
                    {String(Math.floor(elapsedSeconds / 60)).padStart(2, '0')}:
                    {String(elapsedSeconds % 60).padStart(2, '0')}
                  </div>
                  <span className="text-[10px] text-slate-500">Compensates pauses</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <span className="text-[11px] text-slate-400">Integrity Check</span>
                  <div className="text-sm font-bold font-mono text-emerald-400 mt-1 flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Verified OK</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Cloud match 100%</span>
                </div>
              </div>

              {/* Progress Bars Card */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                {/* Active File Progress */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-medium truncate max-w-md">
                      Current File: <span className="font-mono text-white">{currentFileName}</span>
                    </span>
                    <span className="font-mono text-blue-400 font-semibold">{fileProgress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-sky-400 transition-all duration-300 rounded-full"
                      style={{ width: `${fileProgress}%` }}
                    />
                  </div>
                </div>

                {/* Batch Progress */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Total Batch Progress</span>
                    <span className="font-mono text-emerald-400 font-semibold">{overallProgress}%</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 transition-all duration-300 rounded-full"
                      style={{ width: `${overallProgress}%` }}
                    />
                  </div>
                </div>

                {/* Control Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    {!isTransferring ? (
                      <button
                        onClick={handleStartDownload}
                        className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 transition flex items-center gap-2 cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>▶ Start Download</span>
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={handlePause}
                          className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-200 bg-amber-600/80 hover:bg-amber-500 transition flex items-center gap-1.5 cursor-pointer"
                        >
                          {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5" />}
                          <span>{isPaused ? 'Resume' : 'Pause'}</span>
                        </button>
                        <button
                          onClick={handleStop}
                          className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-rose-300 bg-rose-950/60 hover:bg-rose-900 border border-rose-800 transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <StopIcon className="w-3.5 h-3.5" />
                          <span>Stop</span>
                        </button>
                      </>
                    )}

                    <button
                      onClick={handleVerifyOnly}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-indigo-300 bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-800/60 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Verify Checksums</span>
                    </button>
                  </div>

                  <span className="text-[11px] text-slate-500">
                    HTTP Range Resumable Buffer: 4096 bytes rewind safety
                  </span>
                </div>
              </div>

              {/* Real-time Activity Log Terminal */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800/90 overflow-hidden font-mono text-[11px]">
                <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/80 border-b border-slate-800 text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-blue-400" />
                    <span className="font-semibold text-slate-300">Live Activity & Verification Console</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Auto-scrolling</span>
                </div>
                <div className="p-3 h-32 overflow-y-auto space-y-1 text-slate-300">
                  {logs.map(log => (
                    <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-slate-600 flex-shrink-0">{log.time}</span>
                      <span className={`font-bold px-1 rounded text-[10px] bg-slate-900 ${log.color}`}>
                        [{log.tag}]
                      </span>
                      <span className="text-slate-300 break-all">{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Password Dialog Modal Simulation */}
        {showPasswordDialog && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-40">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Password Protected Link</h4>
                  <p className="text-xs text-slate-400">This Dropbox shared link requires a password to view.</p>
                </div>
              </div>

              <div>
                <input
                  type="password"
                  placeholder="Enter link password..."
                  value={passwordInput}
                  onChange={e => setPasswordInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowPasswordDialog(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowPasswordDialog(false);
                    handleLoadFolders();
                  }}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition cursor-pointer"
                >
                  Unlock & Inspect
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Animated Loading Dialog Simulation */}
        {isLoadingTree && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 z-40">
            <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4">
              <div className="relative w-14 h-14 mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-blue-400 animate-spin" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Inspecting Dropbox Hierarchy</h4>
                <p className="text-xs text-blue-400 font-mono mt-1">{loadingStatus}</p>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-2/3 animate-pulse rounded-full" />
              </div>
              <p className="text-[11px] text-slate-500">
                Fetching cloud metadata without downloading files
              </p>
            </div>
          </div>
        )}

        {/* Settings Drawer Simulation */}
        {isSettingsOpen && (
          <div className="absolute top-0 right-0 bottom-0 w-80 bg-slate-950/95 border-l border-slate-800 p-5 shadow-2xl z-30 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Settings className="w-4 h-4 text-blue-400" />
                  Engine Settings
                </h4>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Concurrent Download Streams: {concurrency}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={concurrency}
                    onChange={e => setConcurrency(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                    <span>1 (Conservative)</span>
                    <span>3 (Balanced)</span>
                    <span>6 (High Bandwidth)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={autoRepair}
                      onChange={e => setAutoRepair(e.target.checked)}
                      className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0"
                    />
                    <span>Auto-Repair Corrupted Files</span>
                  </label>
                  <p className="text-[10px] text-slate-500 mt-1 pl-5">
                    Automatically re-downloads any file that fails integrity verification.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                  <p className="font-semibold text-slate-300">Resume Protection:</p>
                  <p className="font-mono text-blue-400">Active safety buffer</p>
                  <p className="text-[10px] text-slate-500">Guarantees clean, uncorrupted files when resuming.</p>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 text-center border-t border-slate-800 pt-3">
              Outbox Core v2.4 (PySide6 / Python 3.11+)
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
