import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default {
  external: ['@queelag/core', 'buffer', 'mobx', 'mobx-react', 'react', 'react-dom', 'react-window', 'squircleyjs'],
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs'
    },
    {
      file: 'dist/index.mjs',
      format: 'esm'
    }
  ],
  plugins: [terser(), typescript()]
}
