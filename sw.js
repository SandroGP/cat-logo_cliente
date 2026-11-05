const V='v3',core=['./','index.html','manifest.json','logo.png','icon-192.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(core)));self.skipWaiting()});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
const save=(r,res)=>{if(res.status==200){const c=res.clone();caches.open(V).then(x=>x.put(r,c))}return res};
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!='GET')return;
if(new URL(r.url).origin==location.origin)e.respondWith(fetch(r).then(res=>save(r,res)).catch(()=>caches.match(r)));
else if(/jsdelivr|imgly/.test(new URL(r.url).host))e.respondWith(caches.match(r).then(h=>h||fetch(r).then(res=>save(r,res))))});
