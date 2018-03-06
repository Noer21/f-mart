import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TambahSupplierPage } from './tambah-supplier';

@NgModule({
  declarations: [
    TambahSupplierPage,
  ],
  imports: [
    IonicPageModule.forChild(TambahSupplierPage),
  ],
})
export class TambahSupplierPageModule {}
