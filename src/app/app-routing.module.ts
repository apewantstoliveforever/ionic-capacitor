import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'audio-book',
    loadChildren: () => import('./audio-book/audio-book.module').then( m => m.AudioBookPageModule)
  },
  {
    path: 'music-player',
    loadChildren: () => import('./music-player/music-player.module').then( m => m.MusicPlayerPageModule)
  },
  {
    path: 'concat-audio',
    loadChildren: () => import('./concat-audio/concat-audio.module').then( m => m.ConcatAudioPageModule)
  },
  {
    path: 'text-to-speech',
    loadChildren: () => import('./text-to-speech/text-to-speech.module').then( m => m.TextToSpeechPageModule)
  },
  {
    path: 'create-book',
    loadChildren: () => import('./create-book/create-book.module').then( m => m.CreateBookPageModule)
  },
  {
    path: 'translate',
    loadChildren: () => import('./translate/translate.module').then( m => m.TranslatePageModule)
  },  {
    path: 'audio-learning',
    loadChildren: () => import('./audio-learning/audio-learning.module').then( m => m.AudioLearningPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
