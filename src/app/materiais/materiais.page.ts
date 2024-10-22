import { Component, OnInit } from '@angular/core';
import {MediaService} from "../data/services/media.service";
import {MediaModel} from "../data/models/media.model";
import {BarcodeScanner} from "@capacitor-community/barcode-scanner";
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-materiais',
  templateUrl: './materiais.page.html',
  styleUrls: ['./materiais.page.scss'],
})
export class MateriaisPage implements OnInit {
  materiais: MediaModel[] = [];
  qrCodeDataUrl: string;

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

  async checkPermission(): Promise<boolean> {
    const status = await BarcodeScanner.checkPermission({ force: true });
    if (status.granted) {
      return true;
    } else if (status.denied) {
      alert('Permissão de câmera negada');
      return false;
    }
    return false; // Certifique-se de retornar false para outras situações
  }

  async scanQRCode() {
    const hasPermission = await this.checkPermission();
    if (!hasPermission) {
      return;
    }

    BarcodeScanner.hideBackground(); // Tornar o fundo transparente
    document.body.classList.add('scanner-active'); // Adicione uma classe para indicar que o scanner está ativo

    const result = await BarcodeScanner.startScan(); // Iniciar o scan

    if (result.hasContent) {
      alert('Scanned QR Code: ' + result.content);
    }
    document.body.classList.remove('scanner-active'); // Remova a classe quando o scanner estiver inativo
    BarcodeScanner.showBackground(); // Voltar o fundo ao normal
  }

/*  async scanQRCode() {
      BarcodeScanner.hideBackground(); // Tornar o fundo transparente
      const result = await BarcodeScanner.startScan(); // Iniciar o scan

      if (result.hasContent) {
        alert('Scanned QR Code: ' + result.content);
      }
  }*/
}
