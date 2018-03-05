import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LaporanPenjualanPage } from './laporan-penjualan';

@NgModule({
  declarations: [
    LaporanPenjualanPage,
  ],
  imports: [
    IonicPageModule.forChild(LaporanPenjualanPage),
  ],
})
export class LaporanPenjualanPageModule {}
