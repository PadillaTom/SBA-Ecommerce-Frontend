import { Component, OnInit } from '@angular/core';
import { Product } from 'app/common/product';
import { ProductService } from 'app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.listProducts();
  }

  listProducts(){
    this.productService.getProductsList().subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
