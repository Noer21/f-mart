import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistorySupplierPage } from './history-supplier';

@NgModule({
  declarations: [
    HistorySupplierPage,
  ],
  imports: [
    IonicPageModule.forChild(HistorySupplierPage),
  ],
})
export class HistorySupplierPageModule {}
