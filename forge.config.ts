import type { ForgeConfig } from '@electron-forge/shared-types'
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives'
import { WebpackPlugin } from '@electron-forge/plugin-webpack'
import PortableMaker from '@rabbitholesyndrome/electron-forge-maker-portable'
import { rendererConfig } from './webpack.renderer.config'
import { mainConfig } from './webpack.config'

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    icon: './src/images/icon.ico',
  },
  rebuildConfig: {},
  makers: [ new PortableMaker({}), ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/windows/main/index.main.html',
            js: './src/windows/main/renderer.main.tsx',
            name: 'main_window',
            preload: {
              js: './src/windows/main/preload.main.ts',
            },
          },
          {
            html: './src/windows/log/index.log.html',
            js: './src/windows/log/renderer.log.tsx',
            name: 'log_window',
            preload: {
              js: './src/windows/log/preload.log.ts',
            },
          },
        ],
      },
    }),
  ],
}

export default config
