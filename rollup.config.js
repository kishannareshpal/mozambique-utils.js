/* eslint-disable no-undef */
import typescript from "rollup-plugin-typescript2";
import { babel } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import license from "rollup-plugin-license";
import pkg from "./package.json";

export default [
    // browser-friendly UMD build
    {
        input: "src/index.ts",
        output: [
            {
                name: "mozambiqueUtils",
                file: pkg.browser,
                format: "umd"
            },
            {
                // Minified pkg.browser
                name: "mozambiqueUtils",
                file: "dist/mozambique-utils.min.js",
                format: "umd",
                plugins: [terser()]
            }
        ],
        plugins: [
            typescript(),
            json(),
            resolve(),
            commonjs(),
            babel({
                babelHelpers: "bundled",
                exclude: "node_modules/**"
            }),
            license({
                sourcemap: true,
                banner: {
                    commentStyle: "regular",
                    content: {
                        file: "./LICENSE",
                    },
                }
            })
        ]
    },

    // CommonJS (for Node) and ES module (for bundlers) build.
    // (We could have three entries in the configuration array
    // instead of two, but it's quicker to generate multiple
    // builds from a single configuration where possible, using
    // an array for the `output` option, where we can specify
    // `file` and `format` for each target)
    {
        input: "src/index.ts",
        output: [
            {
                file: pkg.main,
                format: "cjs"
            },
            {
                // Minified pkg.main
                file: "dist/mozambique-utils.cjs.min.js",
                format: "cjs",
                plugins: [terser()]
            },
            {
                file: pkg.module,
                format: "es",
            },
            {
                // Minified pkg.module
                file: "dist/mozambique-utils.esm.min.js",
                format: "es",
                plugins: [terser()]
            },
        ],
        external: [
            // ...Object.keys(pkg.dependencies || {}),
            // ...Object.keys(pkg.peerDependencies || {}),
            "lodash/isString",
            "lodash/isEmpty",
            "lodash/get"
        ],
        plugins: [
            typescript(),
            json(),
            babel({
                babelHelpers: "bundled",
                exclude: "node_modules/**"
            }),
            license({
                sourcemap: true,
                banner: {
                    commentStyle: "regular",
                    content: {
                        file: "./LICENSE",
                    },
                }
            })
        ]
    },
];