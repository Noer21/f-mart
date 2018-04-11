import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,LoadingController,AlertController } from 'ionic-angular';
import { Data } from '../../providers/data';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
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

  list_search: any;
  search = false;
  suppliers: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private data : Data,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public http: Http) {
      this.getSupplier();
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

  getSupplier(){
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    
    loading.present();
    //api
      this.http.get(this.data.BASE_URL+"/suppliers_show.php").subscribe(data => {
      let response = data.json();
      console.log(response); 
      if(response.status==200){    
        this.suppliers = response.data;
        loading.dismiss();
      }
      else {
        loading.dismiss();
         let alert = this.alertCtrl.create({
            title: 'Gagal',
            subTitle: response.message,      
            buttons: ['OK']
          });
          alert.present();
      }
    });
    //api
  }

  //search
  getItems(ev) {
    this.search=true;

    // Reset items back to all of the items
    this.list_search = this.suppliers;

    console.log('list:'+this.list_search);

    // set val to the value of the ev target
    var val = ev.target.value;
    console.log(val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      // this.list_search = this.list_search.filter((item) => {
      //   return (item.data.toLowerCase().indexOf(val.toLowerCase()) > -1);
      // })


      this.list_search = this.list_search.filter((data) => {
        return (data.nama_supplier.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else {
      this.search=false;
      this.getSupplier();
    }

    console.log(this.list_search);
    console.log("search="+this.search);
  }
}
