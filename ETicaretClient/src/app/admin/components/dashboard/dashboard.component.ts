import { Component ,OnInit} from '@angular/core';
import { delay } from 'rxjs';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private alertify:AlertifyService){}

  ngOnInit(): void {

  }
  message(){
    this.alertify.message("merhaba",{messageType:MessageType.Error,delay:20,position:Position.BottomCenter})
  }
  dismiss(){
    this.alertify.dismiss()
  }

}
