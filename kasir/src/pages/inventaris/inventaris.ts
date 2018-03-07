import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetailInventarisPage } from '../detail-inventaris/detail-inventaris';

/**
 * Generated class for the InventarisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventaris',
  templateUrl: 'inventaris.html',
})
export class InventarisPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventarisPage');
  }

  detail(){
    this.navCtrl.push(DetailInventarisPage)
  }

}