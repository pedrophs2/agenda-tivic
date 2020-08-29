import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['../../app.component.scss'],
})
export class HomePage implements OnInit {

  pessoas: any;

  constructor(private navc: NavController, private personCtrl: PeopleService) { }

  ngOnInit() {
    this.personCtrl.getPeople().subscribe(res => {
      this.pessoas = res;
    });
  }

  ionViewDidEnter(){
    this.personCtrl.getPeople().subscribe(res => {
      this.pessoas = res;
    });
  }

  create(){
    this.personCtrl.pessoa = null;
    this.navc.navigateForward('Contato');
  }

  open(pessoa){
    this.personCtrl.pessoa = pessoa;
    this.navc.navigateForward('Contato');
  }

}
