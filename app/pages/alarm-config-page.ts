import { EventData, Page, NavigatedData } from '@nativescript/core';
import { AlarmConfigViewModel } from '../view-models/alarm-config-view-model';

let viewModel: AlarmConfigViewModel;

export function onNavigatingTo(args: NavigatedData) {
    const page = <Page>args.object;
    if (!viewModel) {
        viewModel = new AlarmConfigViewModel();
    }
    page.bindingContext = viewModel;
}

export function onLoaded(args: EventData) {
    const page = <Page>args.object;
    viewModel.initialize();
}