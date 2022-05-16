import Vue from 'vue'
import VueRouter from 'vue-router'
import VascreenPage from '@/views/VascreenPage'
import VatestPage from '@/views/VatestPage'
import EptestPage from '@/views/EptestPage'
import EpscreenPage from '@/views/EpscreenPage'

Vue.use(VueRouter)
// 配置路由
const routes = [
  {
    path: '/',
    redirect: '/vascreen'
  },
  {
    path: '/vatest',
    component: VatestPage
  },
  {
    path: '/vascreen',
    component: VascreenPage
  },
  {
    path: '/eptest',
    component: EptestPage
  },
  {
    path: '/epscreen',
    component: EpscreenPage
  }
]

const router = new VueRouter({
  routes
})

export default router
