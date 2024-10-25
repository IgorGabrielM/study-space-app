import { Component, OnInit } from '@angular/core';
import {MediaService} from "../data/services/media.service";
import {MediaModel} from "../data/models/media.model";
import * as QRCode from 'qrcode';
import {RecursoService} from "../data/services/recurso.service";
import {RecursoModel} from "../data/models/recurso.model";

@Component({
  selector: 'app-materiais',
  templateUrl: './materiais.page.html',
  styleUrls: ['./materiais.page.scss'],
})
export class MateriaisPage implements OnInit {
  materiais: MediaModel[] = [];
  qrCodeDataUrl: string;
  valueSegment: 'Materiais' | 'Conteudos' = 'Materiais'
  recursos: RecursoModel[] = []

  constructor(
    private mediaService: MediaService,
    private recursoService: RecursoService
  ) { }

  ngOnInit() {
    this.loadMedia();
    this.loadRecursos();
  }

  loadMedia(){
    this.mediaService.list().then((res) => {
      this.materiais = res.reverse().filter((r) => r.type === 'Materiais');
    })
  }

  closeModal(){
    this.qrCodeDataUrl = undefined;
  }

  async generateQRCode(text: any) {
    QRCode.toDataURL(text, { errorCorrectionLevel: 'H' })
      .then(url => {
        this.qrCodeDataUrl = url;
      })
      .catch(err => {
        console.error(err);
      });
  }

  loadRecursos(){
    this.recursoService.list().then((res) => {
      console.log(res);
      this.recursos = res;
    })
  }

  setValueDoSegment(value: 'Materiais' | 'Conteudos'){
    this.valueSegment = value;
  }

}
