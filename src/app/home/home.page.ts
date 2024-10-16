import { Component, OnInit } from '@angular/core';
import {PostService} from "../data/services/post.service";
import {PostModel} from "../data/models/post.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  posts: PostModel[] = [];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts(){
    this.postService.list().then(posts => {
      console.log(posts);
      this.posts = posts
    });
  }

}
