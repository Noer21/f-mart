import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TambahInventarisPage } from './tambah-inventaris';

@NgModule({
  declarations: [
    TambahInventarisPage,
  ],
  imports: [
    IonicPageModule.forChild(TambahInventarisPage),
  ],
})
export class TambahInventarisPageModule {}
