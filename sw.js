const CACHE_NAME = 'meu-cache-v3'
const CACHE_FILES = [
    // Informar os arquivos que estáticos que ficarão disponíveis offline
    '/',
    '/index.html',
    '/historia.html',
    '/obras.html',

    '/manifest.json',
    'https://fonts.googleapis.com/css2?family=Piedra&display=swap',
    'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
    'https://fonts.gstatic.com/s/piedra/v9/ke8kOg8aN0Bn7hTem0aG.woff2',
    'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2',
    '/assets/css/estilo.css',
    '/assets/imagens/tales.jpg',
    '/assets/imagens/fundo.png',
    '/assets/imagens/pensadores.jpg',
    '/assets/js/main.js',
]

// Coloca seus arquivos no CACHE do navegador web
self.addEventListener("install", (evento) => {
    evento.waitUntil(
      caches
        .open(CACHE_NAME)
        .then((cache) => cache.addAll(CACHE_FILES))
        .then(() => self.skipWaiting())
    );
  });
  
  // Remove cache antigo, caso exista
  self.addEventListener("activate", function (evento) {
    evento.waitUntil(
      caches.keys().then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (thisCacheName) {
            if (thisCacheName !== CACHE_NAME) {
              return caches.delete(thisCacheName);
            }
          })
        );
      })
    );
  });
  
  // Intercepta a requisição web.
  // Se tiver em cache, não precisa buscar na internet
  self.addEventListener("fetch", function (evento) {
    console.log('Requisição na URL \n', evento.request.url);
    evento.respondWith(
      caches
        .match(evento.request)
        .then(function (response) {
          return response || fetch(evento.request);
        })
        .catch(function (error) {
          console.log("[ServiceWorker] fetch error", error);
        })
    );
  });