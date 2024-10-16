import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoadmapPageRoutingModule } from './roadmap-routing.module';

import { RoadmapPage } from './roadmap.page';
import {ComponentsModule} from "../componentes/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RoadmapPageRoutingModule,
        ComponentsModule
    ],
  declarations: [RoadmapPage]
})
export class RoadmapPageModule {}
