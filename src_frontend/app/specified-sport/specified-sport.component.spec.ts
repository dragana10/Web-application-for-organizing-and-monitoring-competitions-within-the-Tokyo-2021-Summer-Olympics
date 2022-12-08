import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecifiedSportComponent } from './specified-sport.component';

describe('SpecifiedSportComponent', () => {
  let component: SpecifiedSportComponent;
  let fixture: ComponentFixture<SpecifiedSportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecifiedSportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecifiedSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
