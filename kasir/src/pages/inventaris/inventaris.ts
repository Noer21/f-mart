import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,LoadingController,AlertController } from 'ionic-angular';
import { Data } from '../../providers/data';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { DetailInventarisPage } from '../detail-inventaris/detail-inventaris';
import { TambahInventarisPage } from '../tambah-inventaris/tambah-inventaris';
import 'rxjs/add/operator/timeout';

/**
 * Generated class for the InventarisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventaris',
  templateUrl: 'inventaris.html',
})
export class InventarisPage {

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
  }

  rto(){
    let alert = this.alertCtrl.create({
      title: 'Gagal',
      subTitle: 'Periksa Jaringan Anda,',      
      buttons: [
        {
          text: 'Refresh',
          handler: data => {
            this.navCtrl.setRoot(InventarisPage);
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventarisPage');
  }

  addInventaris(){
    this.navCtrl.push(TambahInventarisPage)
  }

  detail(data){
    this.navCtrl.push(DetailInventarisPage, data)
  }

  getInventaris(){
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    
    loading.present();
    //api
      this.http.get(this.data.BASE_URL+"/items_show.php").timeout(7000).subscribe(data => {
      let response = data.json();
      console.log(response); 
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
    },(err) => { loading.dismiss(); this.rto() });
    //api
  }

  //search
  //search
  getItems(ev) {
    this.search=true;

    // Reset items back to all of the items
    this.list_search = this.inventarises;

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
        return ((data.item_name.toLowerCase().indexOf(val.toLowerCase()) > -1));
      })
    }
    else {
      this.search=false;
      this.getInventaris();
    }

    console.log(this.list_search);
    console.log("search="+this.search);
  }

}
