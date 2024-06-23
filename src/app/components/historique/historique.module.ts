import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoriquePageRoutingModule } from './historique-routing.module';

import { HistoriquePage } from './historique.page';
import {SharedModuleModule} from "../module/shared-module/shared-module.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HistoriquePageRoutingModule,
        SharedModuleModule
    ],
  declarations: [HistoriquePage]
})
export class HistoriquePageModule {}
