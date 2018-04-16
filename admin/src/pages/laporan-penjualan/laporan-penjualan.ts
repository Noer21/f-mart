import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,LoadingController,AlertController } from 'ionic-angular';
import { Data } from '../../providers/data';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';

/**
 * Generated class for the LaporanPenjualanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-laporan-penjualan',
  templateUrl: 'laporan-penjualan.html',
})
export class LaporanPenjualanPage {

  list_search: any;
  search = false;
  reports: any;
  suppliers: any;

  idSupplier: number;
  reportTanggal: any;

  defaultDate: any;
  defaultSupplier: any;

  totalBarang: number;
  uangMasuk: number;
  totalUntung: number;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private data : Data,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public http: Http) {
    this.getReport();
    this.getSupplier();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LaporanPenjualanPage');
  }

  addFilter(form: NgForm){
    if(this.idSupplier==undefined){
      this.idSupplier = -1
    }
    if(this.reportTanggal==undefined){
      this.reportTanggal = "1111-11-11"
    }
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    
    loading.present();
    //api
      this.http.get(this.data.BASE_URL+"/report_home.php?date="+this.reportTanggal+"&supplier_id"+this.reportTanggal).subscribe(data => {
      let response = data.json();
      console.log(response); 
      if(response.status==200){    
        this.reports = response.data;
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

  getReport(){
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    
    loading.present();
    //api
      this.http.get(this.data.BASE_URL+"/reporting_home.php").subscribe(data => {
      let response = data.json();
      console.log(response); 
      if(response.status==200){    
        this.reports = response.data;
        this.totalBarang = response.total_barang;
        this.uangMasuk = response.uang_masuk;
        this.totalUntung = response.keuntungan
        console.log(this.reports)
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

  getItems(ev) {
    this.search=true;

    // Reset items back to all of the items
    this.list_search = this.reports;

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
      this.getReport();
    }

    console.log(this.list_search);
    console.log("search="+this.search);
  }

}
