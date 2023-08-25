import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, deleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';


declare var $:any

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
  private element:ElementRef,
  private _renderer:Renderer2,
  private httpClientService:HttpClientService,
  public dialog: MatDialog,
  private aletifyService:AlertifyService,
  private spinner:NgxSpinnerService
  ) {
    const img=_renderer.createElement("img")
    img.setAttribute("src","../../../assets/Delete.png")
    img.setAttribute("style","cursor:pointer")
    img.width=25
    img.height=25
    _renderer.appendChild(element.nativeElement,img)
   }

   @Input() id:string
   @Input() controller:string
   @Output() callback:EventEmitter<any>=new EventEmitter()

   @HostListener("click")
    async onClick(){
      this.openDialog(async ()=>{
        const td :HTMLTableCellElement=this.element.nativeElement
    // await this.productService.delete(this.id)
        this.httpClientService.delete({controller :this.controller },this.id).subscribe(data=>{
          $(td.parentElement).fadeOut(731,()=>{
            this.callback.emit()
            this.aletifyService.message("Silme işlemi gerçekleşti",{dismissOthers:true,messageType:MessageType.Success,position:Position.TopRight})
        })
      },(errorResponse:HttpErrorResponse)=>{
        this.spinner.hide(SpinnerType.ballScaleMultiple)
        this.aletifyService.message("Silme işlemi gerçekleşmedi",{dismissOthers:true,messageType:MessageType.Error,position:Position.TopLeft})
      })
    })

   }
   openDialog(afterClosed:any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: deleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
   if(result==deleteState.Yes){
      afterClosed()
   }
    });
  }
}



