import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PeopleService } from 'src/app/services/people.service';
import { MajLibService } from 'src/app/services/maj-lib.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['../../app.component.scss'],
})
export class HomePage implements OnInit {

  people: any;

  constructor(private navc: NavController, private personCtrl: PeopleService, private utils: MajLibService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.personCtrl.getPeople().subscribe(res => {
      this.people = res;
      this.people.forEach(person => {
        person.nascimento = this.utils.dateConvert(person.nascimento, 'dd/MM/yyyy');
      });

      this.people = res;
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
