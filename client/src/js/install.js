const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.removeAttribute('hidden');
});

butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();
    const result = await promptEvent.userChoice;
    if (result.outcome === 'accepted') {
        console.log('PWA setup accepted');
    } else {
        console.log('PWA setup rejected');
    }
    window.deferredPrompt = null;
    butInstall.setAttribute('hidden', true);
});

window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
    console.log('PWA setup installed');
});
