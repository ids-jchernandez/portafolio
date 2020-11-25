import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interface/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos:Producto[] = [];
  productoFiltrado:Producto[] = [];

  constructor(private http:HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos(){

    return new Promise((resolve, reject)=>{
      this.http.get('https://angular-portafolio-d8ceb.firebaseio.com/productos_idx.json')
      .subscribe((resp: Producto[]) =>{
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });
  }

  getProducto(id: string){
    return this.http.get(`https://angular-portafolio-d8ceb.firebaseio.com/productos/${id}.json`);
  }

  buscarProductos(termino: string){
    //Cargar productos
    if(this.productos.length===0){
      this.cargarProductos().then(()=>{
        //ejecutar despues de cargar los productos
        //Aplicar filtro
        this.filtrarProductos(termino);
      });
    }else{
      //Aplicar filtro
      this.filtrarProductos(termino);
    }

    
  }

  private filtrarProductos(termino:string){

    
    this.productoFiltrado = [];
    termino = termino.toLocaleLowerCase();
    

    this.productos.forEach(prod => {
      const tituloLowerCase = prod.titulo.toLocaleLowerCase();
      if(prod.categoria.indexOf(termino) >= 0 || 
          tituloLowerCase.indexOf(termino) >= 0 ){
        this.productoFiltrado.push(prod);
      }
    });
  }
}
