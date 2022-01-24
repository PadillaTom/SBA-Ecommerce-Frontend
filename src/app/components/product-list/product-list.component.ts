import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'app/common/cart-item';
import { Product } from 'app/common/product';
import { CartService } from 'app/services/cart.service';
import { ProductService } from 'app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  // For Pagination:
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  previousSearch: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleListProducts() {
    // Check for "ID" param exists:
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      // Convert it to NUMBER:
      this.categoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      // No ID:
      this.categoryId = 1;
    }

    // Check if we have a Different Category currently
    // To RESET thePageNumber
    if (this.previousCategoryId != this.categoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.categoryId;

    this.productService
      .getProductsListPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        this.categoryId
      )
      .subscribe((data) => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      });
  }

  handleSearchProducts() {
    const mySearch: string = this.route.snapshot.paramMap.get('keyword')!;

    if (this.previousSearch != mySearch) {
      this.thePageNumber = 1;
    }
    this.previousSearch = mySearch;

    this.productService
      .searchProductsPaginate(
        this.thePageNumber - 1,
        this.thePageSize,
        mySearch
      )
      .subscribe((data) => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theTotalElements = data.page.totalElements;
      });
  }

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(myProduct: Product) {
    console.log('Adding' + myProduct.name);
    const theCartItem = new CartItem(myProduct);
    this.cartService.addToCart(theCartItem);
  }
}
