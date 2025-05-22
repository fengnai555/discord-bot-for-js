import { createApp } from 'vue';
import { createPinia } from 'pinia';

export default () => {
    console.log('vue init');
    console.log(process.env.ApplicationID);
    const vue = createApp({})
    const pinia = createPinia();

    vue.use(pinia);
}
