import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,LoadingController,AlertController } from 'ionic-angular';
import { Data } from '../../providers/data';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
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
  
  n:number;
  barang:any[] = [];
  barang_fix:any[] = [];
  currentNumber:any[];
  list_search: any;
  search = false;
  inventarises: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private data : Data,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public http: Http) {
      this.getInventaris();
      this.initiateArray();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PembelianPage', this.inventarises);
  }

  initiateArray(){
    for (this.n=0; this.n<=5000; this.n++){
     this.barang[this.n]=0; 
    }
  }

  private increment (index) {
    this.currentNumber[index]++;
  }
  
  private decrement (index) {
    this.currentNumber[index]--;
  }

  barangBeli(value){
    return value > 0;
  }

  checkOut(form: NgForm){
    
    for(this.n=0; this.n<=5000; this.n++){
      if(this.barang[this.n]>0){
        this.barang_fix.push(this.n, this.barang[this.n])
      }
    }

    let input = {
      item_buy: this.barang
    };

    console.log(this.barang_fix)
  }

  

  getInventaris(){
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    
    loading.present();
    //api
      this.http.get(this.data.BASE_URL+"/items_show.php").subscribe(data => {
      let response = data.json();
      console.log(response);
      console.log("array", response[1]); 
      if(response.status==200){    
        this.inventarises = response.data;
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

}
