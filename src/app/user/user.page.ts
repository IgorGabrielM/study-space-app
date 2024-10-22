import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserModel} from "../data/models/user.model";
import {PostModel} from "../data/models/post.model";
import {InterestModel} from "../data/models/interest.model";
import {MediaModel} from "../data/models/media.model";
import {MediaService} from "../data/services/media.service";
import {AuthService} from "../data/services/auth.service";
import {InterestService} from "../data/services/insterest.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user: UserModel
  posts: PostModel[] = [];
  interests: InterestModel[] = [];
  cursos: MediaModel[] = []

  constructor(
    private router: Router,
    private interestService: InterestService,
    private authService: AuthService,
    private mediaService: MediaService,
  ) { }

  ngOnInit() {
    this.loadUser();
    this.loadMedia();
  }

  loadUser() {
    const userToken = localStorage.getItem('userId');
    this.authService.find(userToken).then(async (usr) => {
      this.user = usr;
      console.log(usr);

      this.user.posts = this.user.posts.map((post) => {
        return {
          ...post,
          user: usr
        }
      })

      const interestPromises = this.user.interests.map((int) => {
        return this.interestService.find(int);
      });

      this.interests = await Promise.all(interestPromises);
    })
  }

  loadMedia(){
    const userToken = localStorage.getItem('userId');
    this.mediaService.list().then((res) => {
      if(res?.length > 0){
        this.cursos = res.filter((curso) => curso?.users[0]?.user?.idUser.toString() == userToken.toString()).reverse().filter((r) => r.type === 'Curso');
      }
    })
  }

  exit(){
    localStorage.removeItem('userId');
    localStorage.removeItem('userToken');
    this.router.navigate(['../'])
  }

}
