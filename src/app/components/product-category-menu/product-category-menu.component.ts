import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'app/common/product-category';
import { ProductService } from 'app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css'],
})
export class ProductCategoryMenuComponent implements OnInit {
  categories: ProductCategory[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.listCategories();
  }

  listCategories() {
    this.productService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
