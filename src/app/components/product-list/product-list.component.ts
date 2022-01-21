import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'app/common/product';
import { ProductService } from 'app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  categoryId: number;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    // Check for "ID" param exists:
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      // Convert it to NUMBER:
      this.categoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      // No ID:
      this.categoryId = 1;
    }
    this.productService.getProductsList(this.categoryId).subscribe((data) => {
      this.products = data;
    });
  }
}
