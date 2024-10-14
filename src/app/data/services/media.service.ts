import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MediaModel} from "../models/media.model";

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(
    private http: HttpClient
  ) { }

  async create(payload: MediaModel): Promise<void> {
    try {
      const response = await this.http.post<MediaModel>('https://study-space-1beb84dc5047.herokuapp.com/medias', payload).toPromise();
    } catch (error) {
    }
  }

  async list(): Promise<MediaModel[]> {
    try {
      return await this.http.get<MediaModel[]>('https://study-space-1beb84dc5047.herokuapp.com/medias').toPromise();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
