import { Injectable } from '@angular/core';
import { Create_product } from 'src/app/contracts/create_product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private httpClientService:HttpClientService) { }

  create(product:Create_product,succesCallback?:any){
    this.httpClientService.post({controller:"products"},product).subscribe(result=>{
      succesCallback()
    })
  }
}
