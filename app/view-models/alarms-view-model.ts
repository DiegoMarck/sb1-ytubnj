import { Observable, NavigationEntry, Frame } from '@nativescript/core';
import { Alarm } from '../models/alarm';
import { LocalNotifications } from '@nativescript/local-notifications';
import { Storage } from '../utils/storage';
import { SoundManager } from '../utils/sound-manager';

export class AlarmsViewModel extends Observable {
    private _alarms: Alarm[] = [];
    private readonly STORAGE_KEY = 'alarms';

    constructor() {
        super();
        this.loadAlarms();
        SoundManager.initialize();
    }

    get alarms(): Alarm[] {
        return this._alarms;
    }

    get weekOneAlarms(): Alarm[] {
        return this._alarms.filter(a => a.weekNumber === 1);
    }

    get weekTwoAlarms(): Alarm[] {
        return this._alarms.filter(a => a.weekNumber === 2);
    }

    addAlarm(alarm: Alarm) {
        alarm.id = Date.now().toString();
        alarm.currentSnoozeCount = 0;
        this._alarms.push(alarm);
        this.scheduleNotification(alarm);
        this.notifyPropertyChange('alarms', this._alarms);
        this.saveAlarms();
    }

    toggleAlarm(alarmId: string) {
        const alarm = this._alarms.find(a => a.id === alarmId);
        if (alarm) {
            alarm.isEnabled = !alarm.isEnabled;
            if (alarm.isEnabled) {
                this.scheduleNotification(alarm);
            } else {
                this.cancelNotification(alarm);
            }
            this.notifyPropertyChange('alarms', this._alarms);
            this.saveAlarms();
        }
    }

    snoozeAlarm(alarmId: string) {
        const alarm = this._alarms.find(a => a.id === alarmId);
        if (alarm && alarm.currentSnoozeCount < alarm.snoozeCount) {
            alarm.currentSnoozeCount++;
            const snoozeTime = new Date();
            snoozeTime.setMinutes(snoozeTime.getMinutes() + alarm.snoozeInterval);
            
            LocalNotifications.schedule([{
                id: parseInt(alarm.id + alarm.currentSnoozeCount),
                title: 'Réveil (Snooze)',
                body: alarm.label || 'Il est temps de se réveiller !',
                scheduled: true,
                at: snoozeTime
            }]);

            SoundManager.stopAlarm();
            this.saveAlarms();
        }
    }

    private scheduleNotification(alarm: Alarm) {
        LocalNotifications.schedule([{
            id: parseInt(alarm.id),
            title: 'Réveil',
            body: alarm.label || 'Il est temps de se réveiller !',
            scheduled: true,
            interval: 'week',
            at: alarm.time,
            sound: alarm.sound || 'default_alarm.mp3'
        }]);
    }

    private cancelNotification(alarm: Alarm) {
        LocalNotifications.cancel(parseInt(alarm.id));
    }

    private saveAlarms() {
        Storage.saveObject(this.STORAGE_KEY, this._alarms);
    }

    private loadAlarms() {
        const savedAlarms = Storage.getObject(this.STORAGE_KEY);
        if (savedAlarms) {
            this._alarms = savedAlarms.map(alarm => ({
                ...alarm,
                time: new Date(alarm.time)
            }));
            this.notifyPropertyChange('alarms', this._alarms);
        }
    }
}