import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InterestModel } from '../models/interest.model';

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  constructor(
    private http: HttpClient
  ) { }

  async createInterests(payload: InterestModel): Promise<void> {
    try {
      const response = await this.http.post<InterestModel>('https://study-space-1beb84dc5047.herokuapp.com/interests', payload).toPromise();
    } catch (error) {
    }
  }

  async list(): Promise<InterestModel[]> {
    try {
      return await this.http.get<InterestModel[]>('https://study-space-1beb84dc5047.herokuapp.com/interests').toPromise();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async find(id: number): Promise<InterestModel> {
    try {
      return await this.http.get<InterestModel>(`https://study-space-1beb84dc5047.herokuapp.com/interests/${id}`).toPromise();
    } catch (error) {
      return Promise.reject(error);
    }
  }

}
