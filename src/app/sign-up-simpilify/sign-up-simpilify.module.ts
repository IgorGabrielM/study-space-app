import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignUpSimpilifyPageRoutingModule } from './sign-up-simpilify-routing.module';

import { SignUpSimpilifyPage } from './sign-up-simpilify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpSimpilifyPageRoutingModule
  ],
  declarations: [SignUpSimpilifyPage]
})
export class SignUpSimpilifyPageModule {}
