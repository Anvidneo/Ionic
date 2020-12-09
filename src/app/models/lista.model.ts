import { ListItem } from './lista-item.model';
export class List {

    id: number;
    titulo: string;
    creadaEn: Date;
    terminadaEn: Date;
    finalizada: boolean;
    items: ListItem[];

    constructor( titulo: string){

        this.titulo = titulo;
        this.creadaEn = new Date();
        this.finalizada = false;
        this.items = [];
        this.id = new Date().getTime();

    }

}