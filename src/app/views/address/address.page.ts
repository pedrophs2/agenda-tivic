import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['../../app.component.scss'],
})
export class AddressPage implements OnInit {

  constructor(private navc: NavController) { }

  ngOnInit() {
  }

  goHome(){
    this.navc.navigateRoot('Home');
  }

}
