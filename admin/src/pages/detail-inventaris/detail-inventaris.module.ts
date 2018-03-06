import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailInventarisPage } from './detail-inventaris';

@NgModule({
  declarations: [
    DetailInventarisPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailInventarisPage),
  ],
})
export class DetailInventarisPageModule {}
