import { NgModule } from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatCommonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatLineModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatPseudoCheckboxModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { PlatformModule } from '@angular/cdk/platform';
import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { LayoutModule } from '@angular/cdk/layout';

// cd node_modules/\@angular/material &&
//   find -name '*.ts' | while read file ; do cat $file | sed -n 's/.*class \([A-Za-z0-9]*Module\) .*/\1/p'; done | sort | uniq
export const APP_SHARED_MATERIAL_MODULES = [
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatCommonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatLineModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatPseudoCheckboxModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,

  // NativeDateAdapter should never be used, either use one of the SnapDateAdapters, or the @angular/moment-date-adapter
  // MatNativeDateModule,
  // NativeDateModule,
];

// cd node_modules/\@angular/cdk &&
//   find -name '*.ts' | while read file ; do cat $file | sed -n 's/.*class \([A-Za-z0-9]*Module\) .*/\1/p'; done | sort | uniq
export const APP_SHARED_CDK_MODULES = [
  A11yModule,
  BidiModule,
  CdkAccordionModule,
  CdkStepperModule,
  CdkTableModule,
  LayoutModule,
  ObserversModule,
  OverlayModule,
  PlatformModule,
  PortalModule,
  ScrollDispatchModule,
];

/**
 * Includes all Material and CDK modules.  This makes
 * development easier, but does prevent tree shaking.
 *
 * If bundle size is determined to be an issue, and
 * source-map-explorer or similar points to material being
 * a significant factor, remove this module and switch to
 * importing the individual modules you need in the places
 * you need them.
 */
@NgModule({
  imports: [
    ...APP_SHARED_MATERIAL_MODULES,
    ...APP_SHARED_CDK_MODULES
  ],
  exports: [
    ...APP_SHARED_MATERIAL_MODULES,
    ...APP_SHARED_CDK_MODULES
  ],
  declarations: [
  ],
  providers: [
  ]
})
export class AllMaterialImportsModule { }
