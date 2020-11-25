import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoCompleto } from '../../interface/producto-completo.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: ProductoCompleto;
  idProducto: string;

  constructor(private route: ActivatedRoute,
              public serviceProducto: ProductosService) { }

  ngOnInit(): void {

    this.route.params.subscribe( parametros => {
      this.idProducto = parametros['id'];
      this.serviceProducto.getProducto(parametros['id']).subscribe(
        (producto: ProductoCompleto) =>{
          this.producto = producto;
        });
    });
  }

}
