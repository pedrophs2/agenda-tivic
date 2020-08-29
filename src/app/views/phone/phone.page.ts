import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PeopleService } from 'src/app/services/people.service';
import { PhonesService } from 'src/app/services/phones.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.page.html',
  styleUrls: ['../../app.component.scss'],
})
export class PhonePage implements OnInit {

  phone = {
    id_pessoa: null,
    numero: '',
    tipo: null
  };

  constructor(private navc: NavController, private peopleCtrl: PeopleService, private phoneCtrl: PhonesService) { }

  ngOnInit() {

  }

  goHome(){
    this.navc.navigateRoot('Home');
  }

  createPhone(){
    this.phone.id_pessoa = this.peopleCtrl.pessoa.id;
    console.log(this.phone);
  }

}
