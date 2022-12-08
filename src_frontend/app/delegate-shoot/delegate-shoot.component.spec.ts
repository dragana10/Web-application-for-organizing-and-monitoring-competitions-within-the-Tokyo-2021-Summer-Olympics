import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateShootComponent } from './delegate-shoot.component';

describe('DelegateShootComponent', () => {
  let component: DelegateShootComponent;
  let fixture: ComponentFixture<DelegateShootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelegateShootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegateShootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
