import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EditInventarisPage } from '../edit-inventaris/edit-inventaris';

/**
 * Generated class for the DetailInventarisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-inventaris',
  templateUrl: 'detail-inventaris.html',
})
export class DetailInventarisPage {
  nama_barang: any;
  nama_supplier: any;
  harga_barang: any;
  harga_jual: any;
  stok_barang: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
  ) {

    let temp = this.navParams.data;

    this.nama_barang = temp.item_name;
    this.nama_supplier = temp.supplier_name;
    this.harga_barang = temp.supplier_price;
    this.harga_jual = temp.customer_price;
    this.stok_barang = temp.item_stock
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailInventarisPage');
  }

  return() {
    let prompt = this.alertCtrl.create({
      title: 'Return Barang',
      message: "Masukan Jumlah Barang",
      inputs: [
        {
          name: 'Jumlah Barang',
          placeholder: 'Jumlah'
        },
      ],
      buttons: [
        {
          text: 'Return',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Batal',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  restock() {
    let prompt = this.alertCtrl.create({
      title: 'Restock Barang',
      message: "Masukan Jumlah Barang",
      inputs: [
        {
          name: 'Jumlah Barang',
          placeholder: 'Jumlah'
        },
      ],
      buttons: [
        {
          text: 'Restock',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Batal',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  delete() {
    let confirm = this.alertCtrl.create({
      title: 'Delete Inventaris',
      message: 'Apakah anda yakin akan menghapus barang X dari inventaris?',
      buttons: [
        {
          text: 'Batal',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ya',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  edit(){
    this.navCtrl.push(EditInventarisPage)
  }

}
