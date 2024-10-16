import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {TabsComponent} from "./tabs/tabs.component";
import {CardPostComponent} from "./card-post/card-post.component";
import {ModalCommentComponent} from "./card-post/modal-comment/modal-comment.component";
import {RouterLink} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterLink,
  ],
  exports: [
    TabsComponent,
    CardPostComponent,
    ModalCommentComponent
  ],
  declarations: [
    TabsComponent,
    CardPostComponent,
    ModalCommentComponent
  ]
})
export class ComponentsModule {}
