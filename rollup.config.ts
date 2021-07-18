import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default {
  external: ['@queelag/core', 'mobx', 'mobx-react', 'react', 'react-dom', 'react-router5', 'react-window', 'rfc4648', 'router5', 'squircleyjs', 'superstruct'],
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs'
    },
    {
      dir: 'dist',
      preserveModules: true,
      format: 'esm'
    }
  ],
  plugins: [terser(), typescript()]
}
