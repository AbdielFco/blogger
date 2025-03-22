import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TendenciesComponent } from './tendencies.component';

describe('TendenciesComponent', () => {
  let component: TendenciesComponent;
  let fixture: ComponentFixture<TendenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TendenciesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TendenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
