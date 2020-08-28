import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiHerokuService } from 'src/app/services/api-heroku.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['../../app.component.scss'],
})
export class HomePage implements OnInit {

  pessoas: any;

  constructor(private navc: NavController, private api: ApiHerokuService) { }

  ngOnInit() {
    this.api.getPessoas().subscribe(res => {
      console.log(res);
      this.pessoas = res;
    });
  }

  create(){
    this.navc.navigateForward('Contato');
  }

  open(id){
    this.api.pessoa = id;
    this.navc.navigateForward('Contato/' + id);
  }

}
