import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.page.html',
  styleUrls: ['../../app.component.scss'],
})
export class PhonePage implements OnInit {

  constructor(private navc: NavController) { }

  ngOnInit() {
  }

  goHome(){
    this.navc.navigateRoot('Home');
  }

}
