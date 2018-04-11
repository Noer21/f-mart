import { Data } from '../../providers/data';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController,AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Http, RequestOptions, Headers, RequestMethod } from '@angular/http';
import { DaftarSupplierPage } from '../daftar-supplier/daftar-supplier';

/**
 * Generated class for the TambahSupplierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tambah-supplier',
  templateUrl: 'tambah-supplier.html',
})
export class TambahSupplierPage {
  namaSupplier: string;
  asalSupplier: string;
  kontakSupplier: number;
  detailSupplier: string;

  submitted = false;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    public http: Http,
    public viewCtrl: ViewController,
    public data : Data              
  ) {
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TambahSupplierPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  addSupplier(form: NgForm) {
    
    this.submitted = true;

    let loading = this.loadCtrl.create({
        content: 'memuat..'
    });

    if(form.valid){
      
      loading.present();

      // api
      let input = {
        supplier_name: this.namaSupplier, 
        supplier_address: this.asalSupplier,
        supplier_contact: this.kontakSupplier,
        supplier_detail: this.detailSupplier
      };
        this.http.post(this.data.BASE_URL+"/suppliers_add.php",input).subscribe(data => {
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
          this.navCtrl.setRoot(DaftarSupplierPage)
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
