import React from 'react';
import { Cloud, Shield, HardDrive, Zap, Server } from 'lucide-react';

interface AdIconProps {
  name: 'cloud' | 'shield' | 'hard-drive' | 'zap' | 'server';
  className?: string;
}

export const AdIcon: React.FC<AdIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'cloud':
      return <Cloud className={className} />;
    case 'shield':
      return <Shield className={className} />;
    case 'hard-drive':
      return <HardDrive className={className} />;
    case 'zap':
      return <Zap className={className} />;
    case 'server':
      return <Server className={className} />;
    default:
      return <Zap className={className} />;
  }
};
