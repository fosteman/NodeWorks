import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsService {
  getProducts() {
    return [
      {'id': 1, name: 'test1'},{'id': 1, name: 'test1'}
      ]
  }
}
