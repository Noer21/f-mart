import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InventarisPage } from '../pages/inventaris/inventaris';
import { DetailInventarisPage } from '../pages/detail-inventaris/detail-inventaris';
import { PembelianPage } from '../pages/pembelian/pembelian';
import { CheckOutPage } from '../pages/check-out/check-out';
import { TambahInventarisPage } from '../pages/tambah-inventaris/tambah-inventaris';
import { Data } from '../providers/data';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { EditInventarisPage } from '../pages/edit-inventaris/edit-inventaris';
import { PembelianPageModule } from '../pages/pembelian/pembelian.module';
import { InventarisPageModule } from '../pages/inventaris/inventaris.module';
import { DetailInventarisPageModule } from '../pages/detail-inventaris/detail-inventaris.module';
import { CheckOutPageModule } from '../pages/check-out/check-out.module';
import { TambahInventarisPageModule } from '../pages/tambah-inventaris/tambah-inventaris.module';
import { EditInventarisPageModule } from '../pages/edit-inventaris/edit-inventaris.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    // PembelianPage,
    // InventarisPage,
    // DetailInventarisPage,
    // CheckOutPage,
    // TambahInventarisPage,
    // EditInventarisPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    PembelianPageModule,
    InventarisPageModule,
    DetailInventarisPageModule,
    CheckOutPageModule,
    TambahInventarisPageModule,
    EditInventarisPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    PembelianPage,
    InventarisPage,
    DetailInventarisPage,
    CheckOutPage,
    TambahInventarisPage,
    EditInventarisPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Data,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
