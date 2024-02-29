import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AudioLearningPage } from './audio-learning.page';

const routes: Routes = [
  {
    path: '',
    component: AudioLearningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudioLearningPageRoutingModule {}
