import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TimerModule } from '@devrec/ng-timer';

import { AllMaterialImportsModule } from './all-material-imports.module';
import { SelectOnFocusDirective } from './select-on-focus.directive';

@NgModule({
  imports: [
    CommonModule,
    AllMaterialImportsModule,
    FlexLayoutModule
  ],
  exports: [
    CommonModule,
    AllMaterialImportsModule,
    FlexLayoutModule,
    TimerModule,
    SelectOnFocusDirective
  ],
  declarations: [
    SelectOnFocusDirective
  ],
  providers: [
  ]
})
export class SharedModule { }
