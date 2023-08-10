import { Component } from '@angular/core';

declare var $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETicaretClient';

}
$.get("https://localhost:7070/api/products",data=>{console.log(data)})
