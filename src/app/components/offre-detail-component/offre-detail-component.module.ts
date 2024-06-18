import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffreDetailComponentPageRoutingModule } from './offre-detail-component-routing.module';

import { OffreDetailComponentPage } from './offre-detail-component.page';
import {SharedModuleModule} from "../module/shared-module/shared-module.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModuleModule,
    OffreDetailComponentPageRoutingModule
  ],
  declarations: [OffreDetailComponentPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OffreDetailComponentPageModule {}
