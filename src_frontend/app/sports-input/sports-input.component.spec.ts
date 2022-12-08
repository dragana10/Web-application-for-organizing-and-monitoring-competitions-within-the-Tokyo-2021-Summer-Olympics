import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportsInputComponent } from './sports-input.component';

describe('SportsInputComponent', () => {
  let component: SportsInputComponent;
  let fixture: ComponentFixture<SportsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportsInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SportsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
