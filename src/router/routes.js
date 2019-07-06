
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', name: 'Home' ,component: () => import('pages/Index.vue') },
      { path: '/lodi', name: 'Lodi' ,component: () => import('pages/malufet.vue') },
      { path: '/lodi/:lodiID', name: 'Lodi' ,component: () => import('pages/malufet.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
