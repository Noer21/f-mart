import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    InventarisPage,
    LaporanPenjualanPage,
    DaftarSupplierPage,
    BarangSupplierPage,
    TambahSupplierPage,
    TambahInventarisPage,
    DetailInventarisPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    DetailInventarisPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
