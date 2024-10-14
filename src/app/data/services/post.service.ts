import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PostModel } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  async createPost(payload: PostModel): Promise<void> {
    try {
      const response = await this.http.post<PostModel>('https://study-space-1beb84dc5047.herokuapp.com/posts', payload).toPromise();
    } catch (error) {
    }
  }

  async list(): Promise<PostModel[]> {
    try {
      return await this.http.get<PostModel[]>('https://study-space-1beb84dc5047.herokuapp.com/posts').toPromise();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async find(id): Promise<PostModel> {
    try {
      return await this.http.get<PostModel>(`https://study-space-1beb84dc5047.herokuapp.com/posts/${id}`).toPromise();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async addLike(payload: { idPost: number, idUser: number }): Promise<any> {
    try {
      const response = await this.http.post<PostModel>('https://study-space-1beb84dc5047.herokuapp.com/posts/post/addLike', payload).toPromise();
      return response
    } catch (error) {
    }
  }

  async removeLike(payload: { idPost: number, idUser: number }): Promise<any> {
    try {
      const response = await this.http.post<PostModel>('https://study-space-1beb84dc5047.herokuapp.com/posts/post/removeLike', payload).toPromise();
      return response
    } catch (error) {
    }
  }

}
