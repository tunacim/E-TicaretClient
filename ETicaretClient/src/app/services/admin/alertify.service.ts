import { Injectable } from '@angular/core';
declare var alertify:any

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  dismiss(){
alertify.dismissAll()
  }

  //message(message:string,messageType:MessageType,position:Position,delay:number=3,dismissOthers:Boolean=false)
  message(message:string,options:Partial<alertifyOptions>)
  {
    alertify.set('notifier','position', options.position);
    alertify.set('notifier','delay', options.delay);
    const msj= alertify[options.messageType](message)

    if(options.dismissOthers)
      msj.dismissOthers();

  }
}
export enum MessageType{
  Error="error",
  Message="message",
  Notify="notify",
  Success="success",
  Warning="warning"
}
export enum Position{
  TopRight="top-right",
  TopCenter="top-center",
  TopLeft="top-left",
  BottomRight="bottom-right",
  BottomCenter="bottom-center",
  BottomLeft="bottom-left"
}
export class alertifyOptions{
  messageType:MessageType=MessageType.Success;
  position:Position=Position.TopLeft;
  delay:number=3
  dismissOthers:Boolean=false


}
