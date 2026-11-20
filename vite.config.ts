import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const adsenseClientId = env.VITE_ADSENSE_CLIENT_ID?.trim()

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'html-transform-adsense',
        transformIndexHtml(html) {
          if (!adsenseClientId) return html
          const scriptTag = `    <!-- Google AdSense Auto Ads -->\n    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}" crossorigin="anonymous"></script>`
          return html.replace('</head>', `${scriptTag}\n  </head>`)
        },
      },
    ],
  }
})
