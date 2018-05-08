import Vue from 'vue'
import VueRouter from 'vue-router'
import auth from 'auth'
import { LocalStorage } from 'quasar'

Vue.use(VueRouter)

function load (component) {
  return () => import(`@/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    { path: '/', component: load('welcome/welcome'), beforeEnter: checkAuth }, // Default
    { path: '/login', component: load('auth/login') },
    { path: '/register', component: load('auth/register') },
    {
      path: '/',
      component: load('layouts/menu'),
      beforeEnter: checkAuth,
      children: [
        { path: 'timeline', component: load('post/timeline'), meta: { title: 'Timeline' } },
        { path: 'create', component: load('post/create'), meta: { title: 'Crear Post' } },
        { path: 'profile', component: load('profile/edit'), meta: { title: 'Profile' } },
        { path: 'friends', component: load('friends/friends'), meta: { title: 'Amigos' } },
        { path: 'friends/requests', component: load('friends/requests'), meta: { title: 'Solicitudes de amistad' } },
        { path: 'messages/:id', component: load('messages/messages'), meta: { title: 'Chat' } },
        { path: 'search', component: load('search/search'), meta: { title: 'Buscar' } }
      ]
    },
    { path: '*', component: load('error404') } // Not found
  ]
})

function checkAuth (to, from, next) {
  if (to.path === '/' && auth.user.authenticated) {
    next('/profile')
  }
  else if (!LocalStorage.get.item('id_token') && to.path !== '/') {
    console.log('not logged')
    next('/login')
  }
  else {
    next()
  }
}
