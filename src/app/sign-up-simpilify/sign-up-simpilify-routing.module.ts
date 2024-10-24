import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpSimpilifyPage } from './sign-up-simpilify.page';

const routes: Routes = [
  {
    path: '',
    component: SignUpSimpilifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpSimpilifyPageRoutingModule {}
