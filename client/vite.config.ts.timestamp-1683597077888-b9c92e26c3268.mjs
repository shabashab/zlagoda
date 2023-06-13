// vite.config.ts
import { defineConfig } from "file:///Users/apple/projects/monfi/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/apple/projects/monfi/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Pages from "file:///Users/apple/projects/monfi/node_modules/vite-plugin-pages/dist/index.mjs";
import Components from "file:///Users/apple/projects/monfi/node_modules/unplugin-vue-components/dist/vite.mjs";
import AutoImport from "file:///Users/apple/projects/monfi/node_modules/unplugin-auto-import/dist/vite.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    Components({
      extensions: ["vue"],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: "src/components.d.ts",
      directoryAsNamespace: true
    }),
    AutoImport({
      dts: "src/auto-import.d.ts",
      imports: [
        "vue",
        "@vueuse/head",
        "@vueuse/core",
        "vue-i18n",
        "vue-router",
        "pinia"
      ],
      dirs: [
        "./src/composable/*",
        "./src/store/*",
        "./src/models/**/*",
        "./src/api/*"
      ],
      eslintrc: {
        enabled: true,
        // Default `false`
        filepath: "./.eslintrc-auto-import.json",
        // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true
        // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      }
    }),
    Pages({
      importMode: "async"
    })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYXBwbGUvcHJvamVjdHMvbW9uZmkvY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYXBwbGUvcHJvamVjdHMvbW9uZmkvY2xpZW50L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hcHBsZS9wcm9qZWN0cy9tb25maS9jbGllbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgUGFnZXMgZnJvbSAndml0ZS1wbHVnaW4tcGFnZXMnXG5cbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIENvbXBvbmVudHMoe1xuICAgICAgZXh0ZW5zaW9uczogWyd2dWUnXSxcbiAgICAgIGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvXSxcbiAgICAgIGR0czogJ3NyYy9jb21wb25lbnRzLmQudHMnLFxuICAgICAgZGlyZWN0b3J5QXNOYW1lc3BhY2U6IHRydWUsXG4gICAgfSksXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICBkdHM6ICdzcmMvYXV0by1pbXBvcnQuZC50cycsXG4gICAgICBpbXBvcnRzOiBbXG4gICAgICAgICd2dWUnLFxuICAgICAgICAnQHZ1ZXVzZS9oZWFkJyxcbiAgICAgICAgJ0B2dWV1c2UvY29yZScsXG4gICAgICAgICd2dWUtaTE4bicsXG4gICAgICAgICd2dWUtcm91dGVyJyxcbiAgICAgICAgJ3BpbmlhJyxcbiAgICAgIF0sXG4gICAgICBkaXJzOiBbXG4gICAgICAgICcuL3NyYy9jb21wb3NhYmxlLyonLFxuICAgICAgICAnLi9zcmMvc3RvcmUvKicsXG4gICAgICAgICcuL3NyYy9tb2RlbHMvKiovKicsXG4gICAgICAgICcuL3NyYy9hcGkvKicsXG4gICAgICBdLFxuICAgICAgZXNsaW50cmM6IHtcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSwgLy8gRGVmYXVsdCBgZmFsc2VgXG4gICAgICAgIGZpbGVwYXRoOiAnLi8uZXNsaW50cmMtYXV0by1pbXBvcnQuanNvbicsIC8vIERlZmF1bHQgYC4vLmVzbGludHJjLWF1dG8taW1wb3J0Lmpzb25gXG4gICAgICAgIGdsb2JhbHNQcm9wVmFsdWU6IHRydWUsIC8vIERlZmF1bHQgYHRydWVgLCAodHJ1ZSB8IGZhbHNlIHwgJ3JlYWRvbmx5JyB8ICdyZWFkYWJsZScgfCAnd3JpdGFibGUnIHwgJ3dyaXRlYWJsZScpXG4gICAgICB9LFxuICAgIH0pLFxuICAgIFBhZ2VzKHtcbiAgICAgIGltcG9ydE1vZGU6ICdhc3luYycsXG4gICAgfSksXG4gIF0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3UixTQUFTLG9CQUFvQjtBQUNyVCxPQUFPLFNBQVM7QUFDaEIsT0FBTyxXQUFXO0FBRWxCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBR3ZCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLFdBQVc7QUFBQSxNQUNULFlBQVksQ0FBQyxLQUFLO0FBQUEsTUFDbEIsU0FBUyxDQUFDLFVBQVUsWUFBWTtBQUFBLE1BQ2hDLEtBQUs7QUFBQSxNQUNMLHNCQUFzQjtBQUFBLElBQ3hCLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULEtBQUs7QUFBQSxNQUNMLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxNQUFNO0FBQUEsUUFDSjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFVBQVU7QUFBQSxRQUNSLFNBQVM7QUFBQTtBQUFBLFFBQ1QsVUFBVTtBQUFBO0FBQUEsUUFDVixrQkFBa0I7QUFBQTtBQUFBLE1BQ3BCO0FBQUEsSUFDRixDQUFDO0FBQUEsSUFDRCxNQUFNO0FBQUEsTUFDSixZQUFZO0FBQUEsSUFDZCxDQUFDO0FBQUEsRUFDSDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
