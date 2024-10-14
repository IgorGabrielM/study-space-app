import {Component, HostListener, OnInit} from '@angular/core';
import {AuthModel, AuthService} from "../data/services/auth.service";
import {UserModel} from "../data/models/user.model";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {InterestModel} from "../data/models/interest.model";
import {InterestService} from "../data/services/insterest.service";

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
    private router: Router,
  ) { }

  ngOnInit() {
    this.user = new UserModel()
    this.loadInterests();

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

  loadInterests() {
    this.interestService.list().then((res) => {
      this.interests = res
    });
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
    this.authService.createUser({
      ...this.user,
      idRole: 0,
      createdAt: new Date(),
      interests: [
        0
      ],
      posts: []
    }).then((res) => {
      this.router.navigate(['../sign-in'])
    })
  }
}
