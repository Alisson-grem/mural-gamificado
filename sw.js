self.addEventListener('install', (e) => {
    self.skipWaiting(); // Força o fantasma a acordar na hora!
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request).catch(() => {
            return new Response("O pergaminho não pode ser lido. O aventureiro está sem internet!");
        })
    );
});