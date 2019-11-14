import pkg from './package.json';

import builtins from 'rollup-plugin-node-builtins';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default [
	{
		input: 'index.js',
		output: [
			{
				file: pkg.module,
				format: 'es'
			},
			{
				file: pkg.main,
				format: 'cjs'
			},
			{
				file: pkg.browser,
				format: 'iife',
				name: 'AwaitCatched'
			}
		],
		external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
		plugins: [
			resolve({
				browser: true,
				preferBuiltins: false
			}),
			commonjs(),
			builtins(),
			babel({
				exclude: 'node_modules/**',
				runtimeHelpers: true
			}),
			terser({
				output: {
					comments: () => false
				}
			})
		]
	}
];
