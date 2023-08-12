import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import {  NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { list_product } from 'src/app/contracts/list_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(private productService:ProductService, spinner:NgxSpinnerService,private alertify:AlertifyService) {super(spinner)}
  displayedColumns: string[] = [ 'Name', 'Stock', 'Price','CreatedDate','UpdatedDate'];
  dataSource:MatTableDataSource<list_product> =null;
  @ViewChild(MatPaginator) paginator: MatPaginator;



  async getProducts(){
    this.showSpinner(SpinnerType.ballScaleMultiple)
    const allProducts:{totalCount:number;products:list_product[]}= await this.productService.list(this.paginator ? this.paginator.pageIndex :0 ,this.paginator ? this.paginator.pageSize : 5 ,()=>this.hideSpinner(SpinnerType.ballScaleMultiple),errorMessage=>this.alertify.message(errorMessage,{dismissOthers:true,messageType:MessageType.Error,position:Position.TopLeft}))
    this.dataSource=new _MatTableDataSource<list_product>(allProducts.products)
    this.paginator.length=allProducts.totalCount

  }
  async ngOnInit() {
    await this.getProducts()
  }
  async pageChanged(){
    await this.getProducts()
  }
}
