import { ApplicationSettings } from '@nativescript/core';

export class Storage {
    static saveObject(key: string, value: any): void {
        ApplicationSettings.setString(key, JSON.stringify(value));
    }

    static getObject(key: string): any {
        const data = ApplicationSettings.getString(key);
        return data ? JSON.parse(data) : null;
    }

    static remove(key: string): void {
        ApplicationSettings.remove(key);
    }
}