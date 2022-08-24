import { createApp } from 'vue'
import router from './router/index.js'
// import axios from 'axios'

import Auth from './api/auth.js'

import filter from './common/filter'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import Notifications from '@kyvg/vue3-notification'

import AdminMaster from './components/AdminMaster.vue'

const app = createApp(AdminMaster)

app.component('admin-master', AdminMaster)

app.config.globalProperties.$filter = filter
// app.config.globalProperties.$subString = subString
// app.config.globalProperties.$capitalize = capitalize

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// app.use(axios)
app.use(Notifications)
app.use(router)
app.use(ElementPlus)

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)){
        if(Auth.check()){
            next()
            return
        }else{
            router.push('/login')
        }
    }else if(to.matched.some(record => record.meta.requiresAuth)){
        if(!Auth.check()){
            router.push('/')
        }else{
            next()
            return
        }
    }else{
        next()
        return
    }
})

app.mount('#app')
