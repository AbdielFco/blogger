import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BubbleBackComponent } from './bubble-back.component';

describe('BubbleBackComponent', () => {
  let component: BubbleBackComponent;
  let fixture: ComponentFixture<BubbleBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BubbleBackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BubbleBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
