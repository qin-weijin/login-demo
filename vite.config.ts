import { resolve } from 'node:path';
import { viteMockServe } from 'vite-plugin-mock'
import vue from '@vitejs/plugin-vue'
import type { UserConfig, ConfigEnv } from 'vite';
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build';
  return {
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, './src'),
        },
      ],
      extensions: ['.js', '.json', '.ts', '.vue'],
    },
    plugins: [
      vue(),
      viteMockServe({
          ignore: /^_/,
          mockPath: 'mock',
          localEnabled: !isBuild,
          prodEnabled: isBuild,
          logger: true,
          injectCode: `
            import { setupProdMockServer } from '../mock/_createProductionServer';
            setupProdMockServer();
          `,
        }
      ),
    ],
    server: {
      host: '0.0.0.0',
      port: 8088,
      /* 
      proxy: {
        '/api': {
          // target: 'https://nest-api.buqiyuan.site/api/',
          // target: 'http://localhost:7001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/ws-api': {
          // target: 'wss://nest-api.buqiyuan.site',
          // target: 'http://localhost:7002',
          changeOrigin: true, //是否允许跨域
          ws: true,
        },        
      }
      */
    },
  }
}


