import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController,LoadingController,AlertController } from 'ionic-angular';
import { Data } from '../../providers/data';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { File } from '@ionic-native/file';

import * as papa from 'papaparse';

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

  sort = false;
  
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private data : Data,
    public alertCtrl: AlertController,
    public loadCtrl: LoadingController,
    public http: Http,
    private file: File,
    private transfer: FileTransfer,
    private iab: InAppBrowser) {
    this.getReport();
    this.getSupplier();
    //this.getPrint();
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LaporanPenjualanPage');
  }

  WriteCSV(){
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = this.data.BASE_URL+'report_export.php';
    fileTransfer.download(url, this.file.dataDirectory+'report.csv').then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
    // handle error
    });

    // let csv = papa.unparse(this.print);

    // var blob = new Blob([csv]);
    // var a = window.document.createElement("a");
    // a.href = window.URL.createObjectURL(blob);
    // a.download = "laporan.csv";
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
  }

  addFilter(form: NgForm){
    this.sort=true;

    if (this.idSupplier==-1 && this.reportTanggal==undefined){
      this.getReport()
    }

    else if(this.idSupplier==undefined || this.idSupplier==-1){
      let loading = this.loadCtrl.create({
        content: 'memuat..'
      });
      
      loading.present();
      //api
      console.log("id supplier ", this.idSupplier)
        this.http.get(this.data.BASE_URL+"/report_home.php?date="+this.reportTanggal).subscribe(data => {
        let response = data.json();
        console.log(response, "Report"); 
        if(response.status==200){    
          this.reports = response.data;
          this.totalBarang = response.total_barang;
          this.uangMasuk = response.uang_masuk;
          this.totalUntung = response.keuntungan;
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

    else if(this.reportTanggal==undefined){
      let loading = this.loadCtrl.create({
        content: 'memuat..'
      });
      
      loading.present();
      //api
      console.log("id supplier ", this.idSupplier)
        this.http.get(this.data.BASE_URL+"/report_home.php?date=1111-11-11&supplier_id="+this.idSupplier).subscribe(data => {
        let response = data.json();
        console.log(response, "Report"); 
        if(response.status==200){    
          this.reports = response.data;
          this.totalBarang = response.total_barang;
          this.uangMasuk = response.uang_masuk;
          this.totalUntung = response.keuntungan;
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

    else{
      let loading = this.loadCtrl.create({
        content: 'memuat..'
      });
      
      loading.present();
      //api
      console.log("id supplier ", this.idSupplier)
        this.http.get(this.data.BASE_URL+"/report_home.php?date="+this.reportTanggal+"&supplier_id="+this.idSupplier).subscribe(data => {
        let response = data.json();
        console.log(response, "Report"); 
        if(response.status==200){    
          this.reports = response.data;
          this.totalBarang = response.total_barang;
          this.uangMasuk = response.uang_masuk;
          this.totalUntung = response.keuntungan;
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
      console.log(response, "reporting"); 
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

  download() {
    let url = this.data.BASE_URL+'/report_export.php'
    window.open(url, '_system');
  }

  getPrint(){
  //   let loading = this.loadCtrl.create({
  //     content: 'memuat..'
  //   });
    
  //   loading.present();
  //   //api
  //     this.http.get(this.data.BASE_URL+"/print.php").subscribe(data => {
  //     let response = data.json();
  //     console.log(response); 
  //     if(response.status==200){    
  //       this.print = response.data;
  //       console.log(this.print)
  //       loading.dismiss();
  //     }
  //     else {
  //       loading.dismiss();
  //        let alert = this.alertCtrl.create({
  //           title: 'Gagal',
  //           subTitle: response.message,      
  //           buttons: ['OK']
  //         });
  //         alert.present();
  //     }
  //   });
  //   //api
  }

  getItems(ev) {
  //   this.search=true;

  //   // Reset items back to all of the items
  //   this.list_search = this.reports;

  //   console.log('list:'+this.list_search);

  //   // set val to the value of the ev target
  //   var val = ev.target.value;
  //   console.log(val);

  //   // if the value is an empty string don't filter the items
  //   if (val && val.trim() != '') {
  //     // this.list_search = this.list_search.filter((item) => {
  //     //   return (item.data.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     // })

  //     this.list_search = this.list_search.filter((data) => {
  //       return ((data.item_name.toLowerCase().indexOf(val.toLowerCase()) > -1));
  //     })
  //   }
  //   else {
  //     this.search=false;
  //     this.getReport();
  //   }

  //   console.log(this.list_search);
  //   console.log("search="+this.search);
  }

}
