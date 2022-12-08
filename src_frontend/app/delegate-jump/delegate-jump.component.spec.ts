import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateJumpComponent } from './delegate-jump.component';

describe('DelegateJumpComponent', () => {
  let component: DelegateJumpComponent;
  let fixture: ComponentFixture<DelegateJumpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateJumpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegateJumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
