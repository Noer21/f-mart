import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,LoadingController,AlertController, ViewController } from 'ionic-angular';
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
  barang_fix:{ id: number, quantity: number }[] = []; //id barang jumlah
  inventarises: any;

  filter_barang_beli:any[] = [];
  confirm_barang:any[] = []; //nama barang jumlah

  pesan:string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private data : Data,
    public alertCtrl: AlertController,
    public viewCtrl: ViewController,
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

  dismiss(){
    this.viewCtrl.dismiss();
  }

  barangBeli(value){
    return value > 0;
  }

  private increment (x) {
    this.barang[x]++;
  }
  
  private decrement (x) {
    if(this.barang[x] > 0)
      this.barang[x]--;
  }

  checkout_3(){
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });

    let input = {
      item_buy: this.barang_fix
    };
    
    this.http.post(this.data.BASE_URL+"/cahsier_home.php", input).subscribe(data => {
      let response = data.json();

      console.log(response);
      if(response.status==200){
        loading.dismiss();
        this.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Berhasil Check out',      
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(PembelianPage)
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
    

    
  }

  checkout_2() {
    this.pesan = "Anda telah memesan:\n";
    for(let l =0; l <=5000; l+=2){
      if(this.confirm_barang[l] == undefined){
      }
      else{
        this.pesan = this.pesan.concat(this.confirm_barang[l]);
        this.pesan = this.pesan.concat(" sejumlah ");
        this.pesan = this.pesan.concat(this.confirm_barang[l+1]);
        this.pesan = this.pesan.concat(" buah.\n");
      }
      
    }

    console.log(this.pesan)


    let prompt = this.alertCtrl.create({
      title: 'Check Out Barang',
      message: this.pesan,
      buttons: [
        {
          text: 'Konfirmasi',
          handler: data => {
            console.log(this.barang_fix)
            this.navCtrl.setRoot(PembelianPage)
            //this.checkout_3()
          }
        },
        {
          text: 'Batal',
          handler: data => {
            this.barang_fix = [];
            this.confirm_barang = [];
          }
        }
      ]
    });
    prompt.present();
  }

  checkOut_1(form: NgForm){
  while(this.barang_fix.length > 0) {
    this.barang_fix.pop();
  }
    let i = 0;
    for(this.n=0; this.n<=5000; this.n++){
      if(this.barang[this.n]>0){
        let newObj = {
          id: this.n,
          quantity: this.barang[this.n]
      }; 
      this.barang_fix.push(newObj);
      this.filter_barang_beli[i] = this.n;
      i++;
      }
    }

    
    for(let inv of this.inventarises){
      for (let j = 0; j <= this.filter_barang_beli.length; j++){
        if(inv.item_id == this.filter_barang_beli[j]){
          this.confirm_barang.push(inv.item_name, this.barang[inv.item_id]);
        }
      }
    }

    console.log(this.barang_fix, this.filter_barang_beli, this.confirm_barang)

    this.checkout_2()
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
