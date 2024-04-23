import { defineConfig } from "vite";

module.exports = defineConfig({

    build: {
        assetsDir: "client",
        emptyOutDir: false,
        rollupOptions: {
            input: {
                index: "./client/index.html",
            },
            output: {
                dir: "./dist",
                format: "esm",
                sourcemap: true,
            },
        }
    }

})