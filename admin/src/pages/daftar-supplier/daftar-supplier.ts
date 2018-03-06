import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarangSupplierPage } from '../barang-supplier/barang-supplier';
import { TambahSupplierPage } from '../tambah-supplier/tambah-supplier';

/**
 * Generated class for the DaftarSupplierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-daftar-supplier',
  templateUrl: 'daftar-supplier.html',
})
export class DaftarSupplierPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DaftarSupplierPage');
  }

  detail(){
    this.navCtrl.push(BarangSupplierPage);
  }

  addSupplier(){
    this.navCtrl.push(TambahSupplierPage)
  }

}
