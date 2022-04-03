import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSwiperComponent } from './app-swiper.component';

describe('AppSwiperComponent', () => {
  let component: AppSwiperComponent;
  let fixture: ComponentFixture<AppSwiperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSwiperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
