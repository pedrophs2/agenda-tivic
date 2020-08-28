import { Component, OnInit } from '@angular/core';
import { MajLibService } from 'src/app/services/maj-lib.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['../../app.component.scss'],
})
export class ContatoPage implements OnInit {

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

  constructor(private utils: MajLibService) { }

  ngOnInit() {
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
    console.log(this.person);
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

}
