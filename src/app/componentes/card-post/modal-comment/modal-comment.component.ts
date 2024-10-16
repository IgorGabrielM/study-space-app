import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {PostModel} from "../../../data/models/post.model";
import {CommentsService} from "../../../data/services/comments.service";
import {PostService} from "../../../data/services/post.service";
import {IonInput, ModalController} from "@ionic/angular";

@Component({
  selector: 'app-modal-comment',
  templateUrl: './modal-comment.component.html',
  styleUrls: ['./modal-comment.component.scss'],
})
export class ModalCommentComponent  implements OnInit {
  @ViewChild('inputElement', { static: false }) inputElement: IonInput

  @Input() post: PostModel;

  commentText: string

  constructor(
    private modalCtrl: ModalController,
    private commentsService: CommentsService,
    private postService: PostService
  ) { }

  ngOnInit() {
    console.log(this.post);
  }

  ionViewDidEnter() {
    this.inputElement.setFocus();
  }

  closeDialog(): void {
    this.modalCtrl.dismiss();
  }

  sendComment() {
    const userId = localStorage.getItem('userId');
    this.commentsService.create({
      postId: this.post.idPost,
      text: this.commentText,
      userId: Number(userId)
    }).then(() => {
      this.postService.find(this.post.idPost).then((postFinded) => this.post = postFinded);
      this.commentText = '';
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const commentInput = document.getElementById('comment');
    if (window.innerHeight < 500) {
      commentInput!.style.bottom = '50px';
    } else {
      commentInput!.style.bottom = '0';
    }
  }

  selectInput(event: Event) {
    event.stopPropagation();
  }

  deselectInput(event: Event) {
/*    const commentInput = this.commentInput.nativeElement;
    if (event.target !== commentInput) {
      commentInput.blur();
    }*/
  }

}
