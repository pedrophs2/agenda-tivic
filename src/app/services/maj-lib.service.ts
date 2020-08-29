import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MajLibService {

  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController, private date: DatePipe) { }

  async toast(Title: string, Message: string, Duration: number, Buttons: [string]){
    const Toast = await this.toastCtrl.create({
      header: Title,
      message: Message,
      duration: Duration,
      buttons: Buttons
    });

    Toast.present();
  }

  async alert(Title: string, Message: string, Buttons: [string]){
    const Alert = await this.alertCtrl.create({
      header: Title,
      message: Message,
      buttons: Buttons
    });

    Alert.present();
  }

  async alertDecision(Title: string, Message: string){
    const Alert = await this.alertCtrl.create({
      header: Title,
      message: Message,
      buttons: [{
        text: 'Não',
        handler: res =>
        {
          Alert.dismiss(false);
          return false;
        }
      },
      {
        text: 'Sim',
        handler: res => {
          Alert.dismiss(true);
          return false;
        }
      }]
    });

    Alert.present();

    const resultado = Alert.onDidDismiss().then((data) => {
      return data.data;
    });

    return resultado;
  }

  dateConvert(date: any, format: string){
    if (date.substr(2, 1) == '/'){
      return date;
    }else{
      const conv = this.date.transform(date, format);
      return conv;
    }
  }

  hardDate(date: string){
    const year = date.substr(6, 4);
    const month = date.substr(3, 2);
    const day = date.substr(0, 2);
    const res = year + '-' + month + '-' + day;
    return res;
  }

  validateEmail(email: string){
    if (!email.includes('@tivic.com.br')){
      this.toast('Email inválido', 'Email inválido, utilize emails @tivic.com.br', 2000, ['OK']);
      return true;
    }else{
      return false;
    }
  }

  validateNome(name: string, surname: string){
    if (name.toLowerCase() === surname.toLowerCase()){
      this.toast('Erro', 'Nome e sobrenome não podem ser iguais.', 2000, ['OK']);
      return true;
    }else{
      return false;
    }
  }
}
