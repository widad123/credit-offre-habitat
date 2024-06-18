import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OffreDetailComponentPage } from './offre-detail-component.page';

const routes: Routes = [
  {
    path: '',
    component: OffreDetailComponentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OffreDetailComponentPageRoutingModule {}
