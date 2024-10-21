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
    })
  }

  async scanQRCode() {
    BarcodeScanner.hideBackground(); // Tornar o fundo transparente
    const result = await BarcodeScanner.startScan(); // Iniciar o scan

    if (result.hasContent) {
      alert('Scanned QR Code: ' + result.content);
    }
  }

  generateQRCode(text: any) {
    QRCode.toDataURL(text, { errorCorrectionLevel: 'H' })
      .then(url => {
        this.qrCodeDataUrl = url;
      })
      .catch(err => {
        console.error(err);
      });
  }
}
