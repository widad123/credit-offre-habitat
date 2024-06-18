import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {WelcomePageComponent} from "./components/welcome-page/welcome-page.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomePageComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'createUser',
    loadChildren: () => import('./components/create-user/create-user.module').then(m => m.CreateUserPageModule) },
  {
    path: 'nouveaute-detail/:id',
    loadChildren: () => import('./components/nouveaute-detail/nouveaute-detail.module').then(m => m.NouveauteDetailPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./components/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'information/:id',
    loadChildren: () => import('./components/information/information.module').then( m => m.InformationPageModule)
  },
  {
    path: 'offre-detail-component/:id',
    loadChildren: () => import('./components/offre-detail-component/offre-detail-component.module').then(m => m.OffreDetailComponentPageModule)
  },
  {
    path: 'recommendations',
    loadChildren: () => import('./components/recommendations/recommendations.module').then( m => m.RecommendationsPageModule)
  },
  {
    path: 'favoris',
    loadChildren: () => import('./components/favoris/favoris.module').then( m => m.FavorisPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
