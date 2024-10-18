import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MediaService} from "../data/services/media.service";
import {MediaModel} from "../data/models/media.model";

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {
  cursos: MediaModel[] = []

  constructor(
    private router: Router,
    private mediaService: MediaService,
  ) { }

  ngOnInit() {
    this.loadMedia();
  }

  openDialogMedia(){}

  loadMedia(){
    this.mediaService.list().then((res) => {
      this.cursos = res.reverse().filter((r) => r.type === 'Curso');
    })
  }
}
