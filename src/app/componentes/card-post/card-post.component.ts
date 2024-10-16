import {Component, Input, OnInit} from '@angular/core';
import {PostModel} from "../../data/models/post.model";
import {PostService} from "../../data/services/post.service";
import {UserModel} from "../../data/models/user.model";
import {ModalController} from "@ionic/angular";
import {ModalCommentComponent} from "./modal-comment/modal-comment.component";

@Component({
  selector: 'app-card-post',
  templateUrl: './card-post.component.html',
  styleUrls: ['./card-post.component.scss'],
})
export class CardPostComponent  implements OnInit {
  @Input() post: PostModel


  constructor(
    private postService: PostService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  addLike() {
    console.log('like')
    if (this.isLiked()) {
      const userId = Number(localStorage.getItem('userId'));
      const payload = {
        idPost: this.post.idPost,
        idUser: userId
      }
      this.post.likes = this.post.likes.filter((like) => like.idUser !== userId);
      this.postService.removeLike(payload)
    } else {
      const userId = Number(localStorage.getItem('userId'));
      const payload = {
        idPost: this.post.idPost,
        idUser: userId
      }
      const user = new UserModel()
      this.post.likes.push({ ...user, idUser: userId })
      this.postService.addLike(payload).then()
    }
  }

  async openCommentDialog(){
    console.log('test')
    const modal = await this.modalCtrl.create({
      component: ModalCommentComponent,
      componentProps: {
        post: this.post
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();
  }

  isLiked(): boolean {
    const userId = Number(localStorage.getItem('userId'));
    return !!(this.post.likes.find((like) => like.idUser === userId))
  }

}
