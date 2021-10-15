import { NgModule } from '@angular/core';
import { NgWheelRotateDirective } from './ng-wheel-rotate.directive';
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [ NgWheelRotateDirective ],
  imports: [ CommonModule ],
  exports: [ NgWheelRotateDirective ]
})
export class NgWheelRotateModule { }
