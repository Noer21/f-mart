import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController  } from 'ionic-angular';
import { Data } from '../../providers/data';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { BarangSupplierPage } from '../barang-supplier/barang-supplier';
import { RiwayatTabunganPage } from '../riwayat-tabungan/riwayat-tabungan';
import { RiwayatRestockPage } from '../riwayat-restock/riwayat-restock';

/**
 * Generated class for the RiwayatReturnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-riwayat-return',
  templateUrl: 'riwayat-return.html',
})
export class RiwayatReturnPage {

  temp:any;
  restocks:any;
  returns:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    private data : Data,
    public http: Http) {
    this.temp = navParams.get('param1');
    this.getHistory()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RiwayatRestockPage', this.temp);
  }

  getHistory(){
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    
    loading.present();
    //api
      this.http.get(this.data.BASE_URL+"/supplier_history.php?supplier_id="+this.temp.supplier_id).subscribe(data => {
      let response = data.json();

      console.log(response); 
      if(response.status==200){    
        this.returns = response.data_return;
        console.log(this.returns)
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
  }

  home(data){
    this.navCtrl.setRoot(BarangSupplierPage, data);
  }

  return(datas){
    this.navCtrl.setRoot(RiwayatReturnPage,{
      param1: datas
    })
  }

  restock(datas){
    this.navCtrl.setRoot(RiwayatRestockPage,{
      param1: datas
    })
  }

  tabungan(datas){
    this.navCtrl.setRoot(RiwayatTabunganPage,{
      param1: datas
    })
  }

}
