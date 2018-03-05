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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    InventarisPage,
    LaporanPenjualanPage,
    DaftarSupplierPage
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
    DaftarSupplierPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
