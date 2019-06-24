import { Injectable } from '@nestjs/common';

@Injectable() //simple class with our getter
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
