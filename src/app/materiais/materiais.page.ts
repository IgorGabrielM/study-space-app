import { Component, OnInit } from '@angular/core';
import {MediaService} from "../data/services/media.service";
import {MediaModel} from "../data/models/media.model";

@Component({
  selector: 'app-materiais',
  templateUrl: './materiais.page.html',
  styleUrls: ['./materiais.page.scss'],
})
export class MateriaisPage implements OnInit {
  materiais: MediaModel[] = [];

  constructor(
    private mediaService: MediaService,
  ) { }

  ngOnInit() {
    this.loadMedia();
  }

  loadMedia(){
    this.mediaService.list().then((res) => {
      this.materiais = res.reverse().filter((r) => r.type === 'Materiais');
      console.log(this.materiais);
    })
  }

}
