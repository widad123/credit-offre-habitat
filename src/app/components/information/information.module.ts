import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InformationPageRoutingModule } from './information-routing.module';

import { InformationPage } from './information.page';
import {SharedModuleModule} from "../module/shared-module/shared-module.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InformationPageRoutingModule,
        SharedModuleModule
    ],
  declarations: [InformationPage]
})
export class InformationPageModule {}
