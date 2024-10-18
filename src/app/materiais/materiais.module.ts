import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MateriaisPageRoutingModule } from './materiais-routing.module';

import { MateriaisPage } from './materiais.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MateriaisPageRoutingModule
  ],
  declarations: [MateriaisPage]
})
export class MateriaisPageModule {}
