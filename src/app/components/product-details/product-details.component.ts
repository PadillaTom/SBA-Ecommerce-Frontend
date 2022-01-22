import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'app/common/product';
import { ProductService } from 'app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  detailedProduct: Product = new Product();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  handleProductDetails() {
    // Get ID, cast it to NUMBER:
    const prodId: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProductDetails(prodId).subscribe((data) => {
      this.detailedProduct = data;
    });
  }
}
