import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MateriaisPageRoutingModule } from './materiais-routing.module';

import { MateriaisPage } from './materiais.page';
import {RecursoItemComponent} from "./recurso-item/recurso-item.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MateriaisPageRoutingModule
  ],
  declarations: [MateriaisPage, RecursoItemComponent]
})
export class MateriaisPageModule {}
