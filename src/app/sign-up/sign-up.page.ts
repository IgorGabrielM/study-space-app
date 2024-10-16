import {Component, HostListener, OnInit} from '@angular/core';
import {AuthModel, AuthService} from "../data/services/auth.service";
import {UserModel} from "../data/models/user.model";
import {Router} from "@angular/router";
import {AlertController, LoadingController, ToastController} from "@ionic/angular";
import {InterestModel} from "../data/models/interest.model";
import {InterestService} from "../data/services/insterest.service";
import {FileSystemImageService} from "../data/services/file-system-image.service";
import {ImageService} from "../data/services/image.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  user: UserModel

  particles: any[] = [];
  particleCount = 100;
  interests: InterestModel[] = [];

  constructor(
    private authService: AuthService,
    private interestService: InterestService,
    private alertController: AlertController,
    private fileSystemImageService: FileSystemImageService,
    private imageService: ImageService,
    private loadingCtrl: LoadingController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user = new UserModel()
    //this.loadInterests();

    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        dx: (Math.random() - 0.5) * 2,
        dy: (Math.random() - 0.5) * 2
      });
    }
    this.animateParticles();
  }

/*
  loadInterests() {
    this.interestService.list().then((res) => {
      this.interests = res
    });
  }
*/


  animateParticles() {
    this.particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > window.innerWidth) p.dx *= -1;
      if (p.y < 0 || p.y > window.innerHeight) p.dy *= -1;
    });
    requestAnimationFrame(() => this.animateParticles());
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.particles.forEach(p => {
      const dx = p.x - event.clientX;
      const dy = p.y - event.clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        p.dx += dx * 0.01;
        p.dy += dy * 0.01;
      }
    });
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
                    this.user.imageUrl = res
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
                    this.user.imageUrl = res
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

  onSubmit() {
    this.authService.createUser({
      ...this.user,
      idRole: 0,
      createdAt: new Date(),
      interests: [
        0
      ],
      posts: []
    }).then((res) => {
      this.router.navigate(['../'])
    })
  }
}
