// Se o navegador suportar SW, então registra nosso arquivo sw.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}