import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController  } from 'ionic-angular';
import { Data } from '../../providers/data';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { BarangSupplierPage } from '../barang-supplier/barang-supplier';
import { RiwayatReturnPage } from '../riwayat-return/riwayat-return';
import { RiwayatRestockPage } from '../riwayat-restock/riwayat-restock';


/**
 * Generated class for the RiwayatTabunganPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-riwayat-tabungan',
  templateUrl: 'riwayat-tabungan.html',
})
export class RiwayatTabunganPage {

  temp:any;
  tabungs:any;

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
    console.log('ionViewDidLoad RiwayatRestockPage');
  }

  getHistory(){
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    
    loading.present();
    //api
      this.http.get(this.data.BASE_URL+"/savings_history.php?supplier_id="+this.temp.supplier_id).subscribe(data => {
      let response = data.json();
      this.tabungs = response.data_history
      console.log(response); 
      if(response.status==200){    
        
        console.log(response)
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
