import {Component, Input, OnInit} from '@angular/core';
import {RecursoModel} from "../../data/models/recurso.model";
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-recurso-item',
  templateUrl: './recurso-item.component.html',
  styleUrls: ['./recurso-item.component.scss'],
})
export class RecursoItemComponent  implements OnInit {
  @Input() recurso: RecursoModel
  qrCodeRecursoItem: string

  constructor() { }

  ngOnInit() {
    this.generateQRCode();
  }

  async generateQRCode() {
    if (this.recurso.link){
      QRCode.toDataURL(this.recurso.link, { errorCorrectionLevel: 'H' })
        .then(url => {
          this.qrCodeRecursoItem = url;
        })
        .catch(err => {
          console.error(err);
      });
    }
  }

}
