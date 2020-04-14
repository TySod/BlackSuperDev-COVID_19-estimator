if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('serviceWorker.js')
      .then((res) => `service worker registered ${res}`)
      .catch((err) => err);
  });
}