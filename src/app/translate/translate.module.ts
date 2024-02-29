import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranslatePageRoutingModule } from './translate-routing.module';

import { TranslatePage } from './translate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslatePageRoutingModule
  ],
  declarations: [TranslatePage]
})
export class TranslatePageModule {}
