import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AudioLearningPage } from './audio-learning.page';

describe('AudioLearningPage', () => {
  let component: AudioLearningPage;
  let fixture: ComponentFixture<AudioLearningPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AudioLearningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
