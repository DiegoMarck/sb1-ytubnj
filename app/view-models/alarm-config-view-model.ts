import { Observable } from '@nativescript/core';
import { Alarm } from '../models/alarm';

export class AlarmConfigViewModel extends Observable {
    private _hour: number = 7;
    private _minute: number = 0;
    private _weekNumber: number = 1;
    private _label: string = '';
    private _snoozeInterval: number = 5;
    private _snoozeCount: number = 3;
    private _selectedSoundIndex: number = 0;

    daysOfWeek = [
        { name: 'Lundi', isSelected: false },
        { name: 'Mardi', isSelected: false },
        { name: 'Mercredi', isSelected: false },
        { name: 'Jeudi', isSelected: false },
        { name: 'Vendredi', isSelected: false },
        { name: 'Samedi', isSelected: false },
        { name: 'Dimanche', isSelected: false }
    ];

    availableSounds = [
        'Défaut',
        'Doux',
        'Énergique',
        'Nature',
        'Urbain'
    ];

    initialize() {
        // Réinitialiser les valeurs par défaut
        this._hour = 7;
        this._minute = 0;
        this._weekNumber = 1;
        this._label = '';
        this._snoozeInterval = 5;
        this._snoozeCount = 3;
        this._selectedSoundIndex = 0;
        this.daysOfWeek.forEach(day => day.isSelected = false);
        this.notifyPropertyChange('hour', this._hour);
        this.notifyPropertyChange('minute', this._minute);
    }

    saveAlarm() {
        const alarm: Alarm = {
            id: '',
            time: new Date(),
            weekNumber: this._weekNumber as 1 | 2,
            dayOfWeek: this.daysOfWeek.findIndex(day => day.isSelected),
            isEnabled: true,
            label: this._label,
            sound: this.availableSounds[this._selectedSoundIndex].toLowerCase(),
            snoozeInterval: this._snoozeInterval,
            snoozeCount: this._snoozeCount,
            currentSnoozeCount: 0
        };

        alarm.time.setHours(this._hour, this._minute, 0, 0);
        return alarm;
    }

    // Getters et setters
    get hour(): number { return this._hour; }
    set hour(value: number) {
        if (this._hour !== value) {
            this._hour = value;
            this.notifyPropertyChange('hour', value);
        }
    }

    get minute(): number { return this._minute; }
    set minute(value: number) {
        if (this._minute !== value) {
            this._minute = value;
            this.notifyPropertyChange('minute', value);
        }
    }

    get weekNumber(): number { return this._weekNumber; }
    set weekNumber(value: number) {
        if (this._weekNumber !== value) {
            this._weekNumber = value;
            this.notifyPropertyChange('weekNumber', value);
        }
    }

    get label(): string { return this._label; }
    set label(value: string) {
        if (this._label !== value) {
            this._label = value;
            this.notifyPropertyChange('label', value);
        }
    }

    get snoozeInterval(): number { return this._snoozeInterval; }
    set snoozeInterval(value: number) {
        if (this._snoozeInterval !== value) {
            this._snoozeInterval = value;
            this.notifyPropertyChange('snoozeInterval', value);
        }
    }

    get snoozeCount(): number { return this._snoozeCount; }
    set snoozeCount(value: number) {
        if (this._snoozeCount !== value) {
            this._snoozeCount = value;
            this.notifyPropertyChange('snoozeCount', value);
        }
    }

    get selectedSoundIndex(): number { return this._selectedSoundIndex; }
    set selectedSoundIndex(value: number) {
        if (this._selectedSoundIndex !== value) {
            this._selectedSoundIndex = value;
            this.notifyPropertyChange('selectedSoundIndex', value);
        }
    }
}