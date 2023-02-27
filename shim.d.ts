declare module '*.vue' {
  import { defineComponent, FunctionalComponent } from 'vue'
  const component: ReturnType<typeof defineComponent> | FunctionalComponent
  export default component
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
