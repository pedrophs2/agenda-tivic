import { Component, OnInit } from '@angular/core';
import { MajLibService } from 'src/app/services/maj-lib.service';
import { NavController } from '@ionic/angular';
import { PeopleService } from 'src/app/services/people.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['../../app.component.scss'],
})
export class ContatoPage implements OnInit {

  id: any;
  pessoa: any;
  button: string;
  show: boolean;

  person = {
    nome: '',
    foto: '',
    sobrenome: '',
    nascimento: '',
    email: '',
    telefones: [],
    enderecos: []
  };

  telefone = '';
  endereco = '';

  constructor(private utils: MajLibService, private personCtrl: PeopleService, private navc: NavController) { }

  ngOnInit() {
    if (this.personCtrl.pessoa == null){
      this.pessoa = {
        nome: '',
        foto: '',
        sobrenome: '',
        nascimento: '',
        email: '',
        telefones: [],
        enderecos: []
      };
      this.button = 'Cadastrar';
      this.show = true;
      return;
    }else{
      this.pessoa = this.personCtrl.pessoa;
      this.button = 'Salvar';
      this.show = false;
    }
  }

  async addPhone(){
    if (await this.validatePhone()){
      this.person.telefones.push(this.telefone);
    }
  }

  async addAddress(){
    if (await this.validadeAddress()){
      this.person.enderecos.push(this.endereco);
    }
  }

  async postPerson(){
    if (await this.validatePhone() && await this.validadeAddress()){
      this.person.telefones.push(this.telefone);
      this.person.enderecos.push(this.endereco);
    }
  }

  async validatePhone(){
    if (this.person.telefones.indexOf(this.telefone) === -1 && this.telefone !== ''){
      return true;
    }else if (this.telefone === ''){
      this.utils.toast('Telefone', 'Não é possível inserir um telefone vazio', 2000, ['OK']);
      return false;
    }else{
      this.utils.toast('Telefone', 'Telefone já cadastrado.', 2000, ['OK']);
      return false;
    }
  }

  async validadeAddress(){
    if (this.person.enderecos.indexOf(this.endereco) === -1 && this.endereco !== ''){
      return true;
    }else if (this.endereco === ''){
      this.utils.toast('Endereço', 'Não é possível inserir um endereço vazio', 2000, ['OK']);
      return false;
    }else{
      this.utils.toast('Endereço', 'Endereço já cadastrado.', 2000, ['OK']);
      return false;
    }
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
