import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MajLibService {

  constructor(private toastCtrl: ToastController, private alertCtrl: AlertController) { }

  async toast(Title: string, Message: string, Duration: number, Buttons: [string]){
    const Toast = await this.toastCtrl.create({
      header: Title,
      message: Message,
      duration: Duration,
      buttons: Buttons
    });

    Toast.present();
  }

  async alert(Title: string, Message: string, Buttons: []){
    const Alert = await this.alertCtrl.create({
      header: Title,
      message: Message,
      buttons: Buttons
    });

    Alert.present();
  }
}
