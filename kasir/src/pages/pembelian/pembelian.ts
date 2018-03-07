import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CheckOutPage } from '../check-out/check-out';

/**
 * Generated class for the PembelianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pembelian',
  templateUrl: 'pembelian.html',
})
export class PembelianPage {
  currentNumber=0;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PembelianPage');
  }

  private increment () {
    this.currentNumber++;
  }
  
  private decrement () {
    this.currentNumber--;
  }

  checkOut(){
    this.navCtrl.push(CheckOutPage)
  }

}
