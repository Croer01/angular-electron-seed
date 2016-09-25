import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {routing} from './app.routing';

import {AppRootComponent} from "./app.component";
import {MainContentComponent} from "./main-content/main-content.component";


@NgModule({
    imports: [
        BrowserModule,
        routing
    ],
    declarations: [
        AppRootComponent,
        MainContentComponent
    ],
    bootstrap: [AppRootComponent]
})
export class AppModule {
}
