import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController  } from 'ionic-angular';
import { Data } from '../../providers/data';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';

/**
 * Generated class for the HistorySupplierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history-supplier',
  templateUrl: 'history-supplier.html',
})
export class HistorySupplierPage {

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
    console.log('ionViewDidLoad HistorySupplierPage', this.temp.supplier_id);
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
        this.restocks = response.data_restock;
        this.returns = response.data_return;
        console.log(this.restocks)
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
