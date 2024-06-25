import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {WelcomePageComponent} from "./components/welcome-page/welcome-page.component";
import {AuthGuard} from "./interceptor/authGuard/auth-guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
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
    loadChildren: () => import('./components/nouveaute-detail/nouveaute-detail.module').then(m => m.NouveauteDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./components/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'information/:id',
    loadChildren: () => import('./components/information/information.module').then( m => m.InformationPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'offre-detail-component/:id',
    loadChildren: () => import('./components/offre-detail-component/offre-detail-component.module').then(m => m.OffreDetailComponentPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'recommendations',
    loadChildren: () => import('./components/offresImmobiliers/recommendations.module').then(m => m.RecommendationsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'favoris',
    loadChildren: () => import('./components/favoris/favoris.module').then( m => m.FavorisPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    loadChildren: () => import('./components/search/search.module').then( m => m.SearchPageModule),
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
