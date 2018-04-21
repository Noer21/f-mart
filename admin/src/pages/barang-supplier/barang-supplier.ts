import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController   } from 'ionic-angular';
import { Data } from '../../providers/data';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { DaftarSupplierPage } from '../daftar-supplier/daftar-supplier';
import { DaftarSupplierPageModule } from '../daftar-supplier/daftar-supplier.module';
import { HistorySupplierPage } from '../history-supplier/history-supplier';

/**
 * Generated class for the BarangSupplierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-barang-supplier',
  templateUrl: 'barang-supplier.html',
})
export class BarangSupplierPage {

  temp: any;
  items: any;
  datas:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    private data : Data,
    public http: Http){
    this.getBarang()

    this.temp = this.navParams.data;
    this.datas = this.temp;
  
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BarangSupplierPage', this.temp.supplier_id);
  }

  negatif(){
    let alert = this.alertCtrl.create({
      title: 'Negataive!',
      subTitle: 'Jumlah Barang tidak mungkin negatif!',
      buttons: ['OK']
    });
    alert.present();
  }

  take_save_process(uang){
    if(uang < 0){
      this.negatif();
      return;
    }

    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    let id = this.navParams.data.supplier_id;
    let take_save = {
      supplier_id:id,
      total_uang:uang
    };

    loading.present();

    // api
    this.http.post(this.data.BASE_URL+"/items_return.php?supplier_id="+this.navParams.data.supplier_id, this.take_save).subscribe(data => {
      let response = data.json();
      console.log(this.take_save);
      console.log(response);
      if(response.status==200){

        loading.dismiss();
        this.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Berhasil Mengembalikan',   
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(DaftarSupplierPage)
      }
      else {
        loading.dismiss();
         let alert = this.alertCtrl.create({
            title: 'Gagal Mengembalikan',
            subTitle: 'Silahkan coba lagi',      
            buttons: ['OK']
          });
          alert.present();
      }      

    });
  }

  take_save() {
    let prompt = this.alertCtrl.create({
      title: 'Ambil Tabungan',
      message: "Masukan Jumlah Uang",
      inputs: [
        {
          name: 'jumlahUang',
          placeholder: 'Jumlah',
        },
      ],
      buttons: [
        {
          text: 'Return',
          handler: data => {
            console.log(JSON.stringify(data)); //to see the object
            console.log(data.jumlahBarang);
            this.take_save_process(data.jumlahuang);
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

  take_save_one_click(){
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    let id = this.navParams.data.supplier_id;

    loading.present();
    // api
    this.http.get(this.data.BASE_URL+"/take_savings.php?supplier_id="+id,).subscribe(data => {
      let response = data.json();
      console.log(id, response);
      if(response.status==200){

        loading.dismiss();
        this.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Berhasil Mengambil Tabungan',   
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(DaftarSupplierPage)
      }
      else {
        loading.dismiss();
         let alert = this.alertCtrl.create({
            title: 'Gagal Mengembalikan',
            subTitle: 'Silahkan coba lagi',      
            buttons: ['OK']
          });
          alert.present();
      }      

    });
  }

  getBarang(){
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    
    loading.present();
    //api
      this.http.get(this.data.BASE_URL+"/suppliers_detail.php?supplier_id="+this.navParams.data.supplier_id).subscribe(data => {
      let response = data.json();
      console.log(response); 
      if(response.status==200){    
        this.items = response.items;
        console.log(this.items)
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

  history(datas){
    this.navCtrl.push(HistorySupplierPage,{
      param1: datas
    })
  }

  // edit(datas){
  //   this.navCtrl.push(EditInventarisPage,{
  //     param1: datas
  //   })
  // }

}
