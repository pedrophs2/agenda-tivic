import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AddressesService } from 'src/app/services/addresses.service';
import { PeopleService } from 'src/app/services/people.service';
import { MajLibService } from 'src/app/services/maj-lib.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['../../app.component.scss'],
})
export class AddressPage implements OnInit {

  address = {
    id: null,
    id_pessoa: null,
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cep: '',
    cidade: '',
    uf: '',
    tipo: null
  };

  button = 'Cadastrar';
  show = true;

  // tslint:disable-next-line: max-line-length
  constructor(private navc: NavController, private addressCtrl: AddressesService, private personCtrl: PeopleService, private utils: MajLibService) { }

  ngOnInit() {
    if (this.addressCtrl.address != null){
      this.address = this.addressCtrl.address;
      this.address.tipo = this.address.tipo.toString();
      this.button = 'Salvar';
      this.show = false;
    }
  }

  goHome(){
    this.navc.navigateRoot('Home');
  }

  addressSubmit(){
    this.address.id_pessoa = this.personCtrl.pessoa.id;

    if (this.button == 'Cadastrar'){
      this.addressCtrl.createAddress(this.address).subscribe(res => {
        this.navc.pop();
      });
    }else{
      this.addressCtrl.updateAddress(this.address.id, this.address).subscribe(res => {
        this.navc.pop();
      });
    }
  }

  async confirmDel(id){
    await this.utils.alertDecision('Apagar', 'Deseja mesmo apagar esse endereço ?').then((res) =>
    {if (res){
      this.deleteAddress(id);
    }});
  }

  deleteAddress(id){
    this.addressCtrl.deleteAddress(this.address.id).subscribe(res => {
      this.navc.pop();
    });
  }

}
