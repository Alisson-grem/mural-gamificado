self.addEventListener('install', (e) => {
    // Força o navegador a instalar o PWA na mesma hora
    self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
    // Deixa a internet fluir, mas se cair, avisa que a caverna está sem sinal
    e.respondWith(
        fetch(e.request).catch(() => {
            return new Response("O pergaminho não pode ser lido. Você está sem conexão com a grande rede!");
        })
    );
});