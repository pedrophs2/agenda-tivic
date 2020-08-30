import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PeopleService } from 'src/app/services/people.service';
import { PhonesService } from 'src/app/services/phones.service';
import { MajLibService } from 'src/app/services/maj-lib.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.page.html',
  styleUrls: ['../../app.component.scss'],
})
export class PhonePage implements OnInit {

  phone = {
    id_pessoa: null,
    id: null,
    numero: '',
    tipo: null
  };

  button = 'Cadastrar';
  show = true;

  // tslint:disable-next-line: max-line-length
  constructor(private navc: NavController, private peopleCtrl: PeopleService, private phoneCtrl: PhonesService, private utils: MajLibService) { }

  ngOnInit() {
    this.populate();
  }

  goHome(){
    this.navc.navigateRoot('Home');
  }

  populate(){
    if (this.phoneCtrl.phone != null){
      this.phone = this.phoneCtrl.phone;
      this.phone.tipo = this.phone.tipo.toString();
      this.button = 'Salvar';
      this.show = false;
    }
  }

  submitPhone(){
    this.phone.id_pessoa = this.peopleCtrl.pessoa.id;
    let lst: any;

    this.phoneCtrl.getPhones().subscribe(res => {
      lst = res;
      let matchs = 0;

      lst.forEach(phone => {
        if (phone.numero === this.phone.numero){
          matchs ++;
        }
      });

      if (matchs === 0){
        if (this.button === 'Cadastrar'){
          this.phoneCtrl.createPhone(this.phone).subscribe(res => {
            this.navc.pop();
          });
        }else{
          this.phoneCtrl.updatePhone(this.phone.id, this.phone).subscribe(res => {
            this.navc.pop();
          });
        }
      }else{
        this.utils.toast('Telefone', 'Número já cadastrado', 2000, ['OK']);
      }
    });
  }

  async confirmDel(id){
    await this.utils.alertDecision('Apagar', 'Deseja mesmo apagar esse telefone ?').then((res) => 
    {if (res){
      this.deletePhone(id);
    }});
  }

  deletePhone(id){
    this.phoneCtrl.deletePhone(this.phone.id).subscribe(res => {
      this.navc.pop();
    });
  }
}
