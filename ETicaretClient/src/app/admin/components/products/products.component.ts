import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_product } from 'src/app/contracts/create_product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit{
  constructor(spinner:NgxSpinnerService,private httpClientService:HttpClientService) {
    super(spinner);

  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom)
    this.httpClientService.get<Create_product>({controller:"products"}).subscribe(data=>console.log(data))
   // this.httpClientService.post({controller:"products"},{name:"kalem",stock:10,price:12}).subscribe()
  // this.httpClientService.put({controller:"products"},{id:"a3426582-b131-4a95-abce-539ae1bd86c4",name:"tuna",price:31,stock:10}).subscribe()
  // this.httpClientService.delete({controller:"products"},"9517f94c-669c-4fe7-9308-23c632e8ef0b").subscribe()
  }

}
