import { Component, OnInit } from '@angular/core';
import { MajLibService } from 'src/app/services/maj-lib.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['../../app.component.scss'],
})
export class ContatoPage implements OnInit {

  person = {
    name: '',
    surname: '',
    birth: '',
    email: '',
    phones: [],
    addresses: []
  };

  phone = '';
  address = '';

  constructor(private utils: MajLibService, private validator: ValidatorService) { }

  ngOnInit() {
  }

  async addPhone(){
    if (await this.validatePhone()){
      this.person.phones.push(this.phone);
    }
  }

  async addAddress(){
    if (await this.validadeAddress()){
      this.person.addresses.push(this.address);
    }
  }

  async postPerson(){
    if (await this.validatePhone() && await this.validadeAddress()){
      this.person.phones.push(this.phone);
      this.person.addresses.push(this.address);
      // this.validator.validPerson(this.person);
    }
    console.log(this.person);
  }

  async validatePhone(){
    if (this.person.phones.indexOf(this.phone) === -1 && this.phone !== ''){
      return true;
    }else if (this.phone === ''){
      this.utils.toast('Telefone', 'Não é possível inserir um telefone vazio', 2000, ['OK']);
      return false;
    }else{
      this.utils.toast('Telefone', 'Telefone já cadastrado.', 2000, ['OK']);
      return false;
    }
  }

  async validadeAddress(){
    if (this.person.addresses.indexOf(this.address) === -1 && this.address !== ''){
      return true;
    }else if (this.address === ''){
      this.utils.toast('Endereço', 'Não é possível inserir um endereço vazio', 2000, ['OK']);
      return false;
    }else{
      this.utils.toast('Endereço', 'Endereço já cadastrado.', 2000, ['OK']);
      return false;
    }
  }

}
