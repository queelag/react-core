import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default {
  external: ['@queelag/core', 'buffer', 'mobx', 'mobx-react', 'react', 'react-dom', 'react-window', 'squircleyjs'],
  input: 'src/index.ts',
  plugins: [terser(), typescript()],
  output: {
    file: 'dist/index.js',
    format: 'esm'
  }
}
