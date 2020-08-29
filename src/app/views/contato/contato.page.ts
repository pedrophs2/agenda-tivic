import { Component, OnInit } from '@angular/core';
import { MajLibService } from 'src/app/services/maj-lib.service';
import { NavController } from '@ionic/angular';
import { PeopleService } from 'src/app/services/people.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['../../app.component.scss'],
})
export class ContatoPage implements OnInit {

  id: any;
  button: string;
  show: boolean;

  person = {
    id: '',
    nome: '',
    sobrenome: '',
    nascimento: '',
    email: ''
  };

  telefone = '';
  endereco = '';

  constructor(private utils: MajLibService, private personCtrl: PeopleService, private navc: NavController, private date: DatePipe) { }

  ngOnInit() {
    if (this.personCtrl.pessoa == null){
      this.person = {
        id: '',
        nome: '',
        sobrenome: '',
        nascimento: '',
        email: ''
      };
      this.button = 'Cadastrar';
      this.show = true;
      return;
    }else{
      this.person = this.personCtrl.pessoa;
      this.person.nascimento = this.utils.dateConvert(this.person.nascimento, 'dd/MM/yyyy');
      this.button = 'Salvar';
      this.show = false;
    }
  }

  async postPerson(){
    // if (await this.validatePhone() && await this.validadeAddress()){
    //   this.person.telefones.push(this.telefone);
    //   this.person.enderecos.push(this.endereco);
    // }
    // if (this.button === 'Cadastrar'){
    //   this.personCtrl.createPerson(this);
    // }

    this.person.nascimento = this.utils.hardDate(this.person.nascimento);
    console.log(this.person);
  }

  async confirmDel(id){
    await this.utils.alertDecision('Apagar', 'Deseja mesmo apagar esse contato ?').then((res) => {if (res){
      this.deletePessoa(id);
    }});
  }

  async deletePessoa(id){
    this.personCtrl.deletePerson(id).subscribe(res => {
      this.navc.navigateRoot('Home');
    });
  }

  goHome(){
    this.navc.navigateBack('Home');
  }

  createPhone(){
    this.navc.navigateForward('phone');
  }

  createAddress(){
    this.navc.navigateForward('address');
  }
}
