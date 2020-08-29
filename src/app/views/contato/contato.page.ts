import { Component, OnInit } from '@angular/core';
import { MajLibService } from 'src/app/services/maj-lib.service';
import { NavController } from '@ionic/angular';
import { PeopleService } from 'src/app/services/people.service';
import { DatePipe } from '@angular/common';
import { PhonesService } from 'src/app/services/phones.service';
import { AddressesService } from 'src/app/services/addresses.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['../../app.component.scss'],
})
export class ContatoPage implements OnInit {

  id: any;
  button: string;
  show: boolean;
  pessoa: any;

  person = {
    id: null,
    nome: '',
    sobrenome: '',
    nascimento: '',
    email: '',
    foto: '',
    telefones: [],
    enderecos: []
  };

  phones: any;
  addresses: any;

  // tslint:disable-next-line: max-line-length
  constructor(private utils: MajLibService, private personCtrl: PeopleService, private navc: NavController, private date: DatePipe, private phoneCtrl: PhonesService, private addressCtrl: AddressesService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.populate_view();
  }

  populate_view(){
    this.populate_person();
    if (this.personCtrl.pessoa == null){
      this.populate_phones(null);
      this.populate_addresses(0);
    }else{
      this.populate_phones(this.personCtrl.pessoa.id);
      this.populate_addresses(this.personCtrl.pessoa.id);
    }
  }

  populate_person(){
    if (this.personCtrl.pessoa == null){
      this.button = 'Cadastrar';
      this.show = true;
    }else{
      this.person = this.personCtrl.pessoa;
      this.person.nascimento = this.utils.dateConvert(this.person.nascimento, 'dd/MM/yyyy');
      this.button = 'Salvar';
      this.show = false;
    }
  }

  populate_phones(id){
    let list: any;
    let phones = new Array();
    this.phoneCtrl.getPhones().subscribe(res => {
      list = res;
      list.forEach(phone => {
        if (phone.id_pessoa == id){
          phones.push(phone);
        }
      });
      this.phones = phones;
    });
  }

  populate_addresses(id){
    let list: any;
    let addresses = new Array();
    this.addressCtrl.getAddresses().subscribe(res => {
      list = res;
      list.forEach(address => {
        if (address.id_pessoa == id){
          addresses.push(address);
        }
      });
      this.addresses = addresses;
    });
  }

  async postPerson(){
    if (this.button === 'Cadastrar'){
      this.person.nascimento = this.utils.hardDate(this.person.nascimento);
      this.personCtrl.createPerson(this.person).subscribe(res => {
        this.navc.pop();
      });
    }else{
      this.person.nascimento = this.utils.hardDate(this.person.nascimento);
      console.log(this.person);
      this.personCtrl.updatePerson(this.person.id, this.person).subscribe(res => {
        this.navc.pop();
      });
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
