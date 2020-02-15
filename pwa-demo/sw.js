/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'cache-v1'

self.addEventListener('install', event => { 
  console.log('install', event)
  // event.waitUntil(new Promise(resolve => setTimeout(resolve, 5000)))
  // event.waitUntil(self.skipWaiting() )
  event.waitUntil(caches.open(CACHE_NAME).then(cache => { 
    cache.addAll([ // 这里应该在构建的时候加进来，不应该手动维护
      '/',
      './index.css'
    ])
  }))
})

self.addEventListener('activate', event => { 
  console.log('activate', event)
  // event.waitUntil(self.clients.claim())
  event.waitUntil(caches.keys().then(cacheNames => { 
    return Promise.all(cacheNames.map(cacheName => {  // 应该按需更新缓存，而不是这么粗暴的解决
      if (cacheName !== CACHE_NAME) { 
        return caches.delete(cacheName) // 删除老的缓存， 返回的是Promise
      }
      return null
    }))
  }))
})

self.addEventListener('fetch', event => { 
  console.log('fetch', event)
  event.respondWith(caches.open(CACHE_NAME).then(cache => { 
    return cache.match(event.request).then(response => { 
      if (response) {  // 命中缓存
        return response
      }
      return fetch(event.request).then(response => {  // 没有命中缓存，fetch网络请求
        cache.put(event.request, response.clone())
        return response
      })
    })
  }))
})