import vue from '@vitejs/plugin-vue'
import type { UserConfig, ConfigEnv } from 'vite';
import { resolve } from 'node:path';
import { viteMockServe } from 'vite-plugin-mock'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import UnoCSS from 'unocss/vite'
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
      UnoCSS(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
          /*
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
      */
    ],
    server: {
      host: '0.0.0.0',
      port: 8088,
    },
  }
}