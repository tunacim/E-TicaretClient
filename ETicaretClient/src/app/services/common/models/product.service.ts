import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Create_product } from 'src/app/contracts/create_product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private httpClientService:HttpClientService) { }

  create(product:Create_product,succesCallback?:any,errorCallback?:(errorMessage:string)=>void){
    this.httpClientService.post({controller:"products"},product).subscribe(result=>{
      succesCallback()
    },(errorResponse:HttpErrorResponse)=>{
      const _error:Array<{key:string ,value:Array<string>}>=errorResponse.error
      let message=""
      _error.forEach((v,index) =>{
        v.value.forEach((_v,_index)=>{
          message+=`${_v} <br>`
        })
      })
      errorCallback(message)
    }

    )
  }
}
