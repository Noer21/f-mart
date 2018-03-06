import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarangSupplierPage } from './barang-supplier';

@NgModule({
  declarations: [
    BarangSupplierPage,
  ],
  imports: [
    IonicPageModule.forChild(BarangSupplierPage),
  ],
})
export class BarangSupplierPageModule {}
