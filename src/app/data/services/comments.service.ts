import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentModel } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(
    private http: HttpClient
  ) { }

  async create(payload: CommentModel): Promise<void> {
    try {
      const response = await this.http.post<CommentModel>('https://study-space-1beb84dc5047.herokuapp.com/post-comments', payload).toPromise();
    } catch (error) {
    }
  }

  async list(): Promise<void> {
    try {
      const response = await this.http.get<CommentModel>('https://study-space-1beb84dc5047.herokuapp.com/posts').toPromise();
    } catch (error) {
    }
  }

}
