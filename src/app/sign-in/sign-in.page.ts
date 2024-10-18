import {Component, HostListener, OnInit} from '@angular/core';
import {UserModel} from "../data/models/user.model";
import {AuthModel, AuthService} from "../data/services/auth.service";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  user: AuthModel

  particles: any[] = [];
  particleCount = 100;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.user = new AuthModel()

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

   onSubmit() {
    this.authService.auth(this.user)
      .then((res) => {
        localStorage.setItem('userToken', res.token.access_token);
        localStorage.setItem('userId', res.user.idUser);
        this.router.navigate(['/home']);
      })
      .catch(async () => {
        const toast = await this.toastController.create({
          message: 'Acesso negado, verifique os dados.',
          duration: 1500,
          position: 'bottom',
          color: 'danger'
        });

        await toast.present();
      });
  }

}
