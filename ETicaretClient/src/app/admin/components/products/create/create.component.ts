import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_product} from 'src/app/contracts/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent {

  constructor( private productService:ProductService,spinner:NgxSpinnerService,private alertify:AlertifyService) {
    super(spinner)
  }

  create(name:HTMLInputElement,stock:HTMLInputElement,price:HTMLInputElement){
    this.showSpinner(SpinnerType.BallAtom)
    const create_product:Create_product=new Create_product()
    create_product.name=name.value
    create_product.price=parseFloat(price.value)
    create_product.stock=parseInt(stock.value)
    if(!name.value){
    this.alertify.message("Ürün adını giriniz",{dismissOthers:true,messageType:MessageType.Error,position:Position.TopRight})
      return
  }


    this.productService.create(create_product,()=>{
      this.hideSpinner(SpinnerType.BallAtom);
      this.alertify.message("Ürün Başarıyla Eklendi",{dismissOthers:true,messageType:MessageType.Success,position:Position.TopRight})


    },errorMessage=>this.alertify.message(errorMessage,{dismissOthers:true,messageType:MessageType.Error,position:Position.TopLeft}))

  }
}
