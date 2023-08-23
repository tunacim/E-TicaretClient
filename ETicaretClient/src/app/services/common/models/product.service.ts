import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_product } from 'src/app/contracts/create_product';
import { list_product } from 'src/app/contracts/list_product';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private httpClientService:HttpClientService) { }

  create(product:Create_product,succesCallback?:()=>void,errorCallback?:(errorMessage:string)=>void){
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
  async list(page:number=0,size:number=5,succesCallback?:()=>void,errorCallback?:(errorMessahe:string)=>void):Promise<{totalCount:number;products:list_product[]}>{
   const promiseData:Promise<{totalCount:number;products:list_product[]}>= this.httpClientService.get<{totalCount:number;products:list_product[]}>({controller:"products",queryString:`page=${page}&size=${size}`}).toPromise()
   promiseData.then(d=>succesCallback()).catch((errorResponse:HttpErrorResponse)=> errorCallback(errorResponse.message))
   return await promiseData
  }
   async delete(id:string){
    const deleteObservable :Observable<any>=this.httpClientService.delete<any>({
      controller:"products"
    },id)
   await firstValueFrom(deleteObservable)
  }
}
