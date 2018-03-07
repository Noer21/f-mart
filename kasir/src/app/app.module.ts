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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    PembelianPage,
    InventarisPage,
    DetailInventarisPage,
    CheckOutPage
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
    PembelianPage,
    InventarisPage,
    DetailInventarisPage,
    CheckOutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
