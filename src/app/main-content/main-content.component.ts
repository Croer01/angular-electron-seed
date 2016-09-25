/**
 * Created by Adria on 21/08/2016.
 */
import {Component} from '@angular/core';
const slash = require('slash');

@Component({
    moduleId:slash(module.id),
    selector: 'main-content',
    templateUrl: 'main-content.tmpl.html'
})
export class MainContentComponent {
}
