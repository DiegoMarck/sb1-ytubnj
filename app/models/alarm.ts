export interface Alarm {
    id: string;
    time: Date;
    weekNumber: 1 | 2;
    dayOfWeek: number;
    isEnabled: boolean;
    label: string;
    sound: string;
    snoozeInterval: number; // en minutes
    snoozeCount: number; // nombre de répétitions autorisées
    currentSnoozeCount: number; // nombre de répétitions actuelles
}