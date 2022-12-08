import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateTennisComponent } from './delegate-tennis.component';

describe('DelegateTennisComponent', () => {
  let component: DelegateTennisComponent;
  let fixture: ComponentFixture<DelegateTennisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateTennisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegateTennisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
