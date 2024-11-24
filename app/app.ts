import { Application } from '@nativescript/core';
import { LocalNotifications } from '@nativescript/local-notifications';

// Initialiser les notifications locales
LocalNotifications.requestPermission().then((granted) => {
    if (granted) {
        console.log('Permission de notification accordée');
    }
});

Application.run({ moduleName: 'app-root' });