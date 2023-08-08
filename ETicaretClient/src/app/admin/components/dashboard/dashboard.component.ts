import { Component ,OnInit} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { delay } from 'rxjs';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(private alertify:AlertifyService,spinner:NgxSpinnerService){
    super(spinner)
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.ballScaleMultiple)
  }
  message(){
    this.alertify.message("merhaba",{messageType:MessageType.Error,delay:20,position:Position.BottomCenter})
  }
  dismiss(){
    this.alertify.dismiss()
  }

}
