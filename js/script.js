// REGISTER SERVICE WORKER
if (!("serviceWorker" in navigator)) {
    console.error("ServiceWorker: Dosn't Support your browser.");
} else {
    registerSW();
}

async function registerSW() {
    try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Registration service worker done');
        return registration;
    }
    catch (err) {
        console.log('Registration service worker failed ', err);
    }
}
