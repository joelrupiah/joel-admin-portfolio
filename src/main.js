import { createApp } from 'vue'
import router from './router'
// import axios from 'axios'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import AdminMaster from './components/AdminMaster.vue'

const app = createApp(AdminMaster)

app.component('admin-master', AdminMaster)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// app.use(axios)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
