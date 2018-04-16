import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController   } from 'ionic-angular';
import { Data } from '../../providers/data';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { InventarisPage } from '../inventaris/inventaris';
import { EditInventarisPage } from '../edit-inventaris/edit-inventaris';

/**
 * Generated class for the DetailInventarisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-inventaris',
  templateUrl: 'detail-inventaris.html',
})
export class DetailInventarisPage {
  id_barang: any;
  nama_barang: any;
  nama_supplier: any;
  harga_barang: any;
  harga_jual: any;
  stok_barang: any;
  datas: any;
  restock_barang: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public loadCtrl: LoadingController,
    public alertCtrl: AlertController,
    private data : Data,
    public http: Http
  ) {

    let temp = this.navParams.data;

    this.id_barang = temp.item_id;
    this.nama_barang = temp.item_name;
    this.nama_supplier = temp.supplier_name;
    this.harga_barang = temp.supplier_price;
    this.harga_jual = temp.costumer_price;
    this.stok_barang = temp.item_stock

    this.datas = temp;
  
  }

  ionViewDidLoad() {
    
    console.log("data", this.datas);
  }

  negatif(){
    let alert = this.alertCtrl.create({
      title: 'Negataive!',
      subTitle: 'Jumlah Barang tidak mungkin negatif!',
      buttons: ['OK']
    });
    alert.present();
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  return() {
    let prompt = this.alertCtrl.create({
      title: 'Return Barang',
      message: "Masukan Jumlah Barang",
      inputs: [
        {
          name: 'jumlahBarang',
          placeholder: 'Jumlah',
        },
      ],
      buttons: [
        {
          text: 'Return',
          handler: data => {
            console.log(JSON.stringify(data)); //to see the object
            console.log(data.jumlahBarang);
            this.returnProduct(data.jumlahBarang);
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

  restock() {
    let prompt = this.alertCtrl.create({
      title: 'Restock Barang',
      message: "Masukan Jumlah Barang",
      inputs: [
        {
          name: 'jumlahBarang',
          placeholder: 'Jumlah'
        },
      ],
      buttons: [
        {
          text: 'Restock',
          handler: data => {
            console.log(JSON.stringify(data)); //to see the object
            console.log(data.jumlahBarang);
            this.restokProduct(data.jumlahBarang);
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

  delete() {
    let confirm = this.alertCtrl.create({
      title: 'Delete Inventaris',
      message: 'Apakah anda yakin akan menghapus barang X dari inventaris?',
      buttons: [
        {
          text: 'Batal',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Ya',
          handler: () => {
            this.hapusProduk();
          }
        }
      ]
    });
    confirm.present();
  }

  hapusProduk(){
    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });

    loading.present();

    // api
    this.http.post(this.data.BASE_URL+"/items_delete.php", this.navParams.data).subscribe(data => {
      let response = data.json();

      console.log(response);
      if(response.status==200){

        loading.dismiss();
        this.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Berhasil Menghapus',   
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(InventarisPage)
      }
      else {
        loading.dismiss();
         let alert = this.alertCtrl.create({
            title: 'Gagal Menghapus',
            subTitle: 'Silahkan coba lagi',      
            buttons: ['OK']
          });
          alert.present();
      }      

    });
  }

  restokProduct(total_item){

    if(total_item < 0){
      this.negatif;
      return;
    }

    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    let id = this.navParams.data.item_id;
    this.restock_barang = {item_id:id, total_item:total_item};

    loading.present();

    // api
    this.http.post(this.data.BASE_URL+"/items_restock.php", this.restock_barang).subscribe(data => {
      let response = data.json();
      console.log(this.restock_barang);
      console.log(response);
      if(response.status==200){

        loading.dismiss();
        this.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Berhasil Menambah',   
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(InventarisPage)
      }
      else {
        loading.dismiss();
         let alert = this.alertCtrl.create({
            title: 'Gagal Menambah',
            subTitle: 'Silahkan coba lagi',      
            buttons: ['OK']
          });
          alert.present();
      }      

    });
  }

  returnProduct(total_item){

    if(total_item < 0){
      this.negatif();
      return;
    }

    let loading = this.loadCtrl.create({
      content: 'memuat..'
    });
    let id = this.navParams.data.item_id;
    this.restock_barang = {item_id:id, total_item:total_item};

    loading.present();

    // api
    this.http.post(this.data.BASE_URL+"/items_return.php", this.restock_barang).subscribe(data => {
      let response = data.json();
      console.log(this.restock_barang);
      console.log(response);
      if(response.status==200){

        loading.dismiss();
        this.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Berhasil Mengembalikan',   
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(InventarisPage)
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

  edit(datas){
    this.navCtrl.push(EditInventarisPage,{
      param1: datas
    })
  }

}
