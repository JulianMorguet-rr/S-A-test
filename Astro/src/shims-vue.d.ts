declare module '*.vue' {
    import { DefineComponent } from 'vue';
    const component: DefineComponent & {
      'client:load'?: boolean; // Hier fügen wir das spezielle Attribut hinzu
    };
    export default component;
  }