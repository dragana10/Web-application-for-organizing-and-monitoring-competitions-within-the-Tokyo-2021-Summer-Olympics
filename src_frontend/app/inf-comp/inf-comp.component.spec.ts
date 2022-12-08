import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfCompComponent } from './inf-comp.component';

describe('InfCompComponent', () => {
  let component: InfCompComponent;
  let fixture: ComponentFixture<InfCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
