import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(Chartkick.use(Chart))
Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')