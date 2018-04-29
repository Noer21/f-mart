import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { File } from '@ionic-native/file';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InventarisPage } from '../pages/inventaris/inventaris';
import { LaporanPenjualanPage } from '../pages/laporan-penjualan/laporan-penjualan';
import { DaftarSupplierPage } from '../pages/daftar-supplier/daftar-supplier';
import { BarangSupplierPage } from '../pages/barang-supplier/barang-supplier';
import { TambahSupplierPage } from '../pages/tambah-supplier/tambah-supplier';
import { TambahInventarisPage } from '../pages/tambah-inventaris/tambah-inventaris';
import { DetailInventarisPage } from '../pages/detail-inventaris/detail-inventaris';
import { EditInventarisPage } from '../pages/edit-inventaris/edit-inventaris';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { Data } from '../providers/data';
import { HistorySupplierPage } from '../pages/history-supplier/history-supplier';
import { DaftarSupplierPageModule } from '../pages/daftar-supplier/daftar-supplier.module';
import { BarangSupplierPageModule } from '../pages/barang-supplier/barang-supplier.module';
import { DetailInventarisPageModule } from '../pages/detail-inventaris/detail-inventaris.module';
import { EditInventarisPageModule } from '../pages/edit-inventaris/edit-inventaris.module';
import { HistorySupplierPageModule } from '../pages/history-supplier/history-supplier.module';
import { InventarisPageModule } from '../pages/inventaris/inventaris.module';
import { LaporanPenjualanPageModule } from '../pages/laporan-penjualan/laporan-penjualan.module';
import { TambahInventarisPageModule } from '../pages/tambah-inventaris/tambah-inventaris.module';
import { TambahSupplierPageModule } from '../pages/tambah-supplier/tambah-supplier.module';
import { FileTransfer } from '@ionic-native/file-transfer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { RiwayatRestockPage } from '../pages/riwayat-restock/riwayat-restock';
import { RiwayatRestockPageModule } from '../pages/riwayat-restock/riwayat-restock.module';
import { RiwayatReturnPageModule } from '../pages/riwayat-return/riwayat-return.module';
import { RiwayatTabunganPageModule } from '../pages/riwayat-tabungan/riwayat-tabungan.module';
import { RiwayatReturnPage } from '../pages/riwayat-return/riwayat-return';
import { RiwayatTabunganPage } from '../pages/riwayat-tabungan/riwayat-tabungan';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    //InventarisPage,
    //LaporanPenjualanPage,
    //DaftarSupplierPage,
    //BarangSupplierPage,
    //TambahSupplierPage,
    //TambahInventarisPage,
    //DetailInventarisPage,
    //EditInventarisPage,
    //HistorySupplierPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    DaftarSupplierPageModule,
    BarangSupplierPageModule,
    DetailInventarisPageModule,
    EditInventarisPageModule,
    HistorySupplierPageModule,
    InventarisPageModule,
    LaporanPenjualanPageModule,
    TambahInventarisPageModule,
    TambahSupplierPageModule,
    RiwayatRestockPageModule,
    RiwayatReturnPageModule,
    RiwayatTabunganPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    InventarisPage,
    LaporanPenjualanPage,
    DaftarSupplierPage,
    BarangSupplierPage,
    TambahSupplierPage,
    TambahInventarisPage,
    DetailInventarisPage,
    EditInventarisPage,
    HistorySupplierPage,
    RiwayatRestockPage,
    RiwayatReturnPage,
    RiwayatTabunganPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Data,
    File,
    FileTransfer,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
