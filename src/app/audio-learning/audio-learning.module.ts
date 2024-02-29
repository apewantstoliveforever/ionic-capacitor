import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AudioLearningPageRoutingModule } from './audio-learning-routing.module';

import { AudioLearningPage } from './audio-learning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AudioLearningPageRoutingModule
  ],
  declarations: [AudioLearningPage]
})
export class AudioLearningPageModule {}
