import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'roadmap',
    loadChildren: () => import('./roadmap/roadmap.module').then( m => m.RoadmapPageModule)
  },
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then( m => m.CursosPageModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then( m => m.UserPageModule)
  },
  {
    path: 'materiais',
    loadChildren: () => import('./materiais/materiais.module').then( m => m.MateriaisPageModule)
  },
  {
    path: 'sign-up-simpilify',
    loadChildren: () => import('./sign-up-simpilify/sign-up-simpilify.module').then( m => m.SignUpSimpilifyPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
