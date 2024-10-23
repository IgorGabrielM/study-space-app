import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MediaService} from "../data/services/media.service";
import {MediaModel} from "../data/models/media.model";
import {FileSystemImageService} from "../data/services/file-system-image.service";
import {ImageService} from "../data/services/image.service";
import {AlertController, LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {
  cursos: MediaModel[] = [];
  modalIsOpen: boolean = false;
  curso: MediaModel = new MediaModel();

  constructor(
    private router: Router,
    private mediaService: MediaService,
    private alertController: AlertController,
    private fileSystemImageService: FileSystemImageService,
    private imageService: ImageService,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.loadMedia();
  }

  loadMedia(){
    this.mediaService.list().then((res) => {
      this.cursos = res.reverse().filter((r) => r.type === 'Curso');
    })
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
                    this.curso.imageUrl = res
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
                    this.curso.imageUrl = res
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

  async onSubmit(){
    const loading = await this.loadingCtrl.create({
      message: 'Fazendo upload do curso. Por favor aguarde...',
    });
    loading.present()
    const userId = Number(localStorage.getItem('userId'));
    const payload: MediaModel = {
      ...this.curso,
      idUser: userId,
      type: 'Curso',
      interestIds: []
    }

    this.mediaService.create(payload).then(() => {
      this.loadMedia();
      this.modalIsOpen = false;
      loading.dismiss()
    })
  }
}
