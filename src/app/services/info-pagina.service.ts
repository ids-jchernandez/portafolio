import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoEquipo } from '../interface/info-equipo.interface';
import { InfoPagina } from '../interface/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: InfoEquipo = {};

  constructor(public http: HttpClient) {
    
      this.cargarInfo();
      this.cargarEquipo();
   }


   private cargarInfo(){
      //Leer el archivo Json
      this.http.get('assets/data/data-pagina.json').subscribe(
        (resp: InfoPagina) => {
          this.cargada = true;
          this.info = resp;
        }
      );
   }

   private cargarEquipo(){
      this.http.get('https://angular-portafolio-d8ceb.firebaseio.com/equipo.json')
        .subscribe((resp: InfoEquipo) => {
          this.equipo = resp;
        });
   }
}
