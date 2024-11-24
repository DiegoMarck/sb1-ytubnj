import { Alarm } from './alarm';
import { Storage } from '../utils/storage';
import { LocalNotifications } from '@nativescript/local-notifications';
import { SoundManager } from '../utils/sound-manager';

export class AlarmManager {
    private static readonly STORAGE_KEY = 'alarms';
    private static instance: AlarmManager;
    private alarms: Alarm[] = [];

    private constructor() {
        this.loadAlarms();
        this.setupNotificationHandling();
    }

    static getInstance(): AlarmManager {
        if (!AlarmManager.instance) {
            AlarmManager.instance = new AlarmManager();
        }
        return AlarmManager.instance;
    }

    private setupNotificationHandling() {
        LocalNotifications.addOnMessageReceivedCallback(notification => {
            const alarm = this.alarms.find(a => a.id === notification.id.toString());
            if (alarm) {
                SoundManager.playAlarm(alarm.sound);
            }
        });
    }

    getAlarms(weekNumber: 1 | 2): Alarm[] {
        return this.alarms.filter(alarm => alarm.weekNumber === weekNumber);
    }

    addAlarm(alarm: Alarm): void {
        alarm.id = Date.now().toString();
        this.alarms.push(alarm);
        this.scheduleAlarm(alarm);
        this.saveAlarms();
    }

    private scheduleAlarm(alarm: Alarm): void {
        const now = new Date();
        const alarmTime = new Date(alarm.time);
        
        // Configurer pour la bonne semaine
        const daysToAdd = (alarm.weekNumber - 1) * 7;
        alarmTime.setDate(alarmTime.getDate() + daysToAdd);

        LocalNotifications.schedule([{
            id: parseInt(alarm.id),
            title: 'Réveil',
            body: alarm.label || 'Il est temps de se réveiller !',
            scheduled: true,
            interval: 'week',
            at: alarmTime,
            sound: alarm.sound
        }]);
    }

    private loadAlarms(): void {
        const savedAlarms = Storage.getObject(AlarmManager.STORAGE_KEY);
        if (savedAlarms) {
            this.alarms = savedAlarms.map(alarm => ({
                ...alarm,
                time: new Date(alarm.time)
            }));
        }
    }

    private saveAlarms(): void {
        Storage.saveObject(AlarmManager.STORAGE_KEY, this.alarms);
    }
}