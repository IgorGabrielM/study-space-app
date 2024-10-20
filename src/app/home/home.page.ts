import { Component, OnInit } from '@angular/core';
import {PostService} from "../data/services/post.service";
import {PostModel} from "../data/models/post.model";
import {Router} from "@angular/router";
import {AlertController, LoadingController} from "@ionic/angular";
import {FileSystemImageService} from "../data/services/file-system-image.service";
import {ImageService} from "../data/services/image.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  posts: PostModel[] = [];
  post: PostModel = new PostModel();
  currentRoute: string;
  modalIsOpen = false;

  constructor(
    private postService: PostService,
    private router: Router,
    private alertController: AlertController,
    private fileSystemImageService: FileSystemImageService,
    private imageService: ImageService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.loadPosts();
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  loadPosts(){
    this.postService.list().then(posts => {
      this.posts = posts
    });
  }

  changeModal(isOpen: boolean){
    this.modalIsOpen = isOpen;
  }

  async selectImage(){
    const loading = await this.loadingCtrl.create({
      message: 'Fazendo upload da imagem. Por favor aguarde...',
    });

    const alert = await this.alertController.create({
      header: 'Escolha de foto de usuário',
      message: 'Selecione uma opção:',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.fileSystemImageService.getPhoto('camera').then((image) => {
              loading.present()
              fetch(`data:image/png;base64,${image.base64Image}`)
                .then((res) => res.blob())
                .then((blob) => {
                  this.imageService.uploadImageBlob(blob, 'tickets').then((res) => {
                    this.post.imageUrl = res
                    setTimeout(() => {
                      loading.dismiss()
                    }, 500)
                  })
                })
            })
          }
        },
        {
          text: 'Galeria',
          handler: () => {
            this.fileSystemImageService.getPhoto('gallery').then((image) => {
              loading.present()
              fetch(`data:image/png;base64,${image.base64Image}`)
                .then((res) => res.blob())
                .then((blob) => {
                  this.imageService.uploadImageBlob(blob, 'tickets').then((res) => {
                    this.post.imageUrl = res
                    setTimeout(() => {
                      loading.dismiss()
                    }, 500)
                  })
                })
            })
          }
        },
        {
          text: 'Cancelar',
          role: "cancel"
        },
      ],
    });

    await alert.present();
  }

  onSubmit(){
    const userId = Number(localStorage.getItem('userId'));
    const payload = {
      ...this.post,
      idUser: userId,
      likesCount: 0,
      commentsCount: 0,
    }

    this.postService.createPost(payload).then(() => {
      this.modalIsOpen = false;
    })
  }

}
