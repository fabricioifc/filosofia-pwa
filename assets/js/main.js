// Se o navegador suportar SW, então registra nosso arquivo sw.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
  
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  })
  .catch(function(error) {
  	alert(error);
    console.log('Service worker registration failed, error:', error);
  });
}