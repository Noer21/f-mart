import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventarisPage } from './inventaris';

@NgModule({
  declarations: [
    InventarisPage,
  ],
  imports: [
    IonicPageModule.forChild(InventarisPage),
  ],
})
export class InventarisPageModule {}
