import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DeseosService } from '../../services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( public deseosService:DeseosService, private router:Router, public alertController:AlertController) {  }

  async addList(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: ''
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Crear',
          handler: (data) => {
            if( data.titulo === ''){
              console.log('Confirm Empty');
              return;
            }
            console.log('Confirm New Item');
            const listId = this.deseosService.createList(data.titulo);
            this.router.navigateByUrl(`tabs/tab1/add/${listId}`);
          }
        }
      ]
    });
    await alert.present();
    // this.router.navigateByUrl('tabs/tab1/add');
  }

}
