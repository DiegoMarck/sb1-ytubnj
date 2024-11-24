import { EventData, Page, NavigationEntry, Frame } from '@nativescript/core';
import { AlarmsViewModel } from './view-models/alarms-view-model';

let viewModel: AlarmsViewModel;

export function navigatingTo(args: EventData) {
    const page = <Page>args.object;
    if (!viewModel) {
        viewModel = new AlarmsViewModel();
    }
    page.bindingContext = viewModel;
}

export function onAddAlarm() {
    const navigationEntry: NavigationEntry = {
        moduleName: 'pages/alarm-config-page',
        clearHistory: false
    };
    Frame.topmost().navigate(navigationEntry);
}

export function onAlarmTap(args: any) {
    const alarm = args.view.bindingContext;
    const navigationEntry: NavigationEntry = {
        moduleName: 'pages/alarm-config-page',
        context: alarm,
        clearHistory: false
    };
    Frame.topmost().navigate(navigationEntry);
}