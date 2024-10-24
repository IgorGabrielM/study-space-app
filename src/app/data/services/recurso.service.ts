import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MediaModel} from "../models/media.model";
import {RecursoModel} from "../models/recurso.model";

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  constructor(
    private http: HttpClient
  ) { }

  async list(): Promise<RecursoModel[]> {
    try {
      return await this.http.get<any[]>('https://study-space-1beb84dc5047.herokuapp.com/resources').toPromise();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
