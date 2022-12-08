import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateRunnComponent } from './delegate-runn.component';

describe('DelegateRunnComponent', () => {
  let component: DelegateRunnComponent;
  let fixture: ComponentFixture<DelegateRunnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateRunnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegateRunnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
