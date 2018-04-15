import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController  } from 'ionic-angular';
import { Data } from '../../providers/data';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { InventarisPage } from '../inventaris/inventaris';

/**
 * Generated class for the EditInventarisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-inventaris',
  templateUrl: 'edit-inventaris.html',
})
export class EditInventarisPage {

  id_barang: any;
  id_supplier: any;
  nama_barang: any;
  nama_supplier: any;
  harga_barang: any;
  harga_jual: any;
  stok_barang: any;
  temp: any;
  suppliers: any;
  submitted = false;

  namaBarang: string;
  idSupplier: number;
  hargaJual: number;
  hargaBarang: number;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    private data : Data,
    public http: Http) {
    this.temp = navParams.get('param1');
    this.getSupplier();

    this.id_barang = this.temp.item_id;
    this.id_supplier = this.temp.supplier_id;
    this.nama_barang = this.temp.item_name;
    this.nama_supplier = this.temp.supplier_name;
    this.harga_barang = this.temp.supplier_price;
    this.harga_jual = this.temp.costumer_price;
    this.stok_barang = this.temp.item_stock;
    
    this.namaBarang = this.nama_barang
    this.idSupplier= this.id_supplier;
    this.hargaJual= this.harga_jual;
    this.hargaBarang= this.harga_barang;
  }

  ionViewDidLoad() {
    console.log(this.temp);
  }

  dismiss(){
    this.viewCtrl.dismiss();
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

  editInventaris(form: NgForm) {
    
    this.submitted = true;

    let loading = this.loadCtrl.create({
        content: 'memuat..'
    });

    if(form.valid){
      
      loading.present();
      // api
      let input = {
        item_name: this.namaBarang, 
        id_supplier: this.idSupplier,
        supplier_price: this.hargaBarang,
        costumer_price: this.hargaJual
      };
        console.log(input, this.id_barang)
        this.http.post(this.data.BASE_URL+"/items_edit.php?item_id="+this.id_barang, input).subscribe(data => {
        let response = data.json();

        console.log(response);
        if(response.status==200){
          loading.dismiss();
          this.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Berhasil Menambahkan',      
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.setRoot(InventarisPage)
        }
        else {
          loading.dismiss();
          let alert = this.alertCtrl.create({
              title: 'Gagal Menambahkan',
              subTitle: 'Silahkan coba lagi',      
              buttons: ['OK']
            });
            alert.present();
        }      
      });
      // api
    } 
  }

}
