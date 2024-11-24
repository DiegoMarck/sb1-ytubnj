import { TNSPlayer } from '@nativescript/audio';

export class SoundManager {
    private static player: TNSPlayer;

    static async initialize() {
        this.player = new TNSPlayer();
        await this.player.initFromFile({
            audioFile: '~/sounds/default_alarm.mp3',
            loop: true
        });
    }

    static async playAlarm(soundFile: string = 'default_alarm.mp3') {
        try {
            await this.player.initFromFile({
                audioFile: `~/sounds/${soundFile}`,
                loop: true
            });
            await this.player.play();
        } catch (error) {
            console.error('Erreur lors de la lecture du son:', error);
        }
    }

    static async stopAlarm() {
        try {
            await this.player.pause();
            await this.player.dispose();
        } catch (error) {
            console.error('Erreur lors de l\'arrêt du son:', error);
        }
    }
}