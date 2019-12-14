// REGISTER SERVICE WORKER
if (!("serviceWorker" in navigator)) {
    console.error("ServiceWorker: Dosn't Support your browser.");
} else {
    navigator.serviceWorker
    .register('/sw.js')
    .then(registration => {
        console.log('Registration service worker done:', registration.scope);
    }).catch (err => {
        coconsole.log('Registration service worker failed ', err);
    })
}
