import {Route, Routes, RouterModule} from '@angular/router';
import {MainContentComponent} from "./main-content/main-content.component";


const appRoutes:Routes = [
    <Route>{
        path: '',
        component: MainContentComponent
    }
];

export const routing = RouterModule.forRoot(appRoutes);
