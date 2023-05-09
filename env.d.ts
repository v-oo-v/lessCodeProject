declare module "*.vue" {
  import type { DefineComponent } from "vue"; 
  const vueComponent: DefineComponent<{}, {}, any>; 
  export default vueComponent;
}

declare module '*.ts' {
  export const type: any
}

declare module '*.js' {
  export const type: any
}

declare module '@kangc/v-md-editor'
declare module 'nprogress'
declare module 'vuex-persistedstate'

declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'