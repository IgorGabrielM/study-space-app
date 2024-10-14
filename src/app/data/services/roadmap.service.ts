import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RoadmapModel} from "../models/roadmap.model";

@Injectable({
  providedIn: 'root',
})
export class RoadmapService {
  private apiUrl = 'https://study-space-1beb84dc5047.herokuapp.com/roadmaps'; // URL da sua API

  constructor(private http: HttpClient) {}

  listRoadmapOptions(): Observable<{ id: number, name: string, imageUrl: string }[]> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  findRoadmap(id: number): Observable<RoadmapModel> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
