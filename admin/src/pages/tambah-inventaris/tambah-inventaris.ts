import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,LoadingController,AlertController, ViewController } from 'ionic-angular';
import { Data } from '../../providers/data';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { InventarisPage } from '../inventaris/inventaris';
/**
 * Generated class for the TambahInventarisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tambah-inventaris',
  templateUrl: 'tambah-inventaris.html',
})
export class TambahInventarisPage {

  suppliers: any;
  submitted = false;

  namaBarang: string;
  idSupplier: number;
  hargaBarang: number;
  hargaJual: number;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private data : Data,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public viewCtrl: ViewController,
    public http: Http) {
    this.getSupplier();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TambahInventarisPage');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  negatif(){
    let alert = this.alertCtrl.create({
      title: 'Negataive!',
      subTitle: 'Harga tidak mungkin negatif!',
      buttons: ['OK']
    });
    alert.present();
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

  addInventaris(form: NgForm) {
    
    this.submitted = true;
    if(this.hargaBarang < 0 || this.hargaJual < 0){
      this.negatif();
      return;      
    }


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
        this.http.post(this.data.BASE_URL+"/items_add.php",input).subscribe(data => {
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
        else if(response.status==202) {
          loading.dismiss();
          let alert = this.alertCtrl.create({
              title: 'Duplikasi Item',
              subTitle: 'Item dengan nama '+this.namaBarang+' Sudah ada. Pastikan anda tidak memasukannya dua kali.' ,      
              buttons: ['OK']
            });
            alert.present();
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
