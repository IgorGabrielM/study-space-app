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
/*      this.mediaService.create({
        "interestIds":[
          1,
        ],
        "title":"Gamification, Inc",
        "institution":"IDV",
        "description":"A obra mostra que os apontamentos feitos pelo Gartner Group já estão se tornando realidade. Hoje, as técnicas de Gamificação têm sido aplicadas por empresas como ferramentas alternativas às abordagens tradicionais.",
        "imageUrl":"https://m.media-amazon.com/images/I/71BmW6XqVWL._SL1332_.jpg",
        "idUser":7,
        "type":"Materiais",
        "link": "https://encurtador.com.br/Fij3w",
      }).then()*/
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

/*  async scanQRCode() {
      BarcodeScanner.hideBackground(); // Tornar o fundo transparente
      const result = await BarcodeScanner.startScan(); // Iniciar o scan

      if (result.hasContent) {
        alert('Scanned QR Code: ' + result.content);
      }
  }*/

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
