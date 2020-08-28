import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['../../app.component.scss'],
})
export class HomePage implements OnInit {

  constructor(private navc: NavController) { }

  ngOnInit() {
  }

  create(){
    this.navc.navigateForward('Contato');
  }

  open(id){
    this.navc.navigateForward('Contato/' + id);
  }

}
