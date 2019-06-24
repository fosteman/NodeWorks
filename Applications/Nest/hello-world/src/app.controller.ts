import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {} //injection of AppService. If decorator @Injectable is applied to a class, it can be injected as an artifact (service, component, controller)
  //Hence this artifact needs be registered in `providers` array for a module

  @Get() //ensures mapping GET request to a method on class. Default route `/` will respond to this `getHello()` method, which in turn invokes appService.getHello().
  getHello(): string {
    return this.appService.getHello();
  }
}
