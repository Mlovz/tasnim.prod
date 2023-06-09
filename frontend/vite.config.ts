/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'
// import eslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
function getApiUrl(mode: any, apiUrl?: string) {
  if (apiUrl) {
    return apiUrl;
  }

  if (mode === 'production') {
    return '/api';
  }

  return 'http://localhost:8800/api';
}
export default ({mode, base, port}) => {

  const isDev:boolean = mode === 'development';
  const apiUrl:string =  getApiUrl(mode, base)

  return defineConfig({
    plugins: [react(), tsconfigPaths(), svgr({})],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
    },
    server: {
      port: port || 3000,
      open: true,
      host: isDev ? '0.0.0.0' : '',
    },
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    define: {
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiUrl)
    }
  })
}
