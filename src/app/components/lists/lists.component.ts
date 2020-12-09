import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { List } from '../../models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {

  @ViewChild( IonList) list: IonList;
  @Input() finished = true; 

  constructor( public deseosService:DeseosService, private router:Router, private alertController:AlertController) { }

  ngOnInit() {}

  listSelected( id: number){
    if (this.finished){
      this.router.navigateByUrl(`tabs/tab2/add/${id}`);
    } else {
      this.router.navigateByUrl(`tabs/tab1/add/${id}`);
    }
  }

  deleteList( list: List){
    this.deseosService.deleteList( list );
  }

  async updateList(list){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: list.titulo,
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
            this.list.closeSlidingItems();
          }
        }, {
          text: 'Actualizar',
          handler: (data) => {
            if( data.titulo === ''){
              console.log('Confirm Empty');
              return;
            }
            list.titulo = data.titulo;
            this.deseosService.saveStorage();
            console.log('Confirm Edit Item');
            this.list.closeSlidingItems();
          }
        }
      ]
    });
    await alert.present();
  }

}
