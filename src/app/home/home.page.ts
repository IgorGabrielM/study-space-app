import { Component, OnInit } from '@angular/core';
import {PostService} from "../data/services/post.service";
import {PostModel} from "../data/models/post.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  posts: PostModel[] = [];
  currentRoute: string

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
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

}
