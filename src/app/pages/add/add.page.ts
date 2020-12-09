import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeseosService } from '../../services/deseos.service';
import { List } from '../../models/lista.model';
import { ListItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  list:List;
  nameItem:string = '';

  constructor( private deseosService:DeseosService, private route:ActivatedRoute ) { 
    const listId = this.route.snapshot.paramMap.get('listId');

    this.list = this.deseosService.getList(listId);
    
  }

  ngOnInit() {
  }

  addItem(){
    if (this.nameItem.length === 0){
      return;
    }

    const newItem = new ListItem(this.nameItem);
    this.list.items.push(newItem);
    this.nameItem = '';

    this.deseosService.saveStorage();
  }

  changeCheck(item : ListItem){

    const pending = this.list.items.filter(itemData => !itemData.completado).length;
    if (pending === 0){
      this.list.terminadaEn = new Date();
      this.list.finalizada = true;
    } else {
      this.list.terminadaEn = null;
      this.list.finalizada = false; 
    } 
    this.deseosService.saveStorage();

  }

  deleteItem(index: number){
    this.list.items.splice( index, 1); 
    this.deseosService.saveStorage();
  }
}
