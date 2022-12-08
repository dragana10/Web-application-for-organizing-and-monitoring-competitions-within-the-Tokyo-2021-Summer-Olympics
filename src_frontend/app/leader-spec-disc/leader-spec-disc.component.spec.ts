import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderSpecDiscComponent } from './leader-spec-disc.component';

describe('LeaderSpecDiscComponent', () => {
  let component: LeaderSpecDiscComponent;
  let fixture: ComponentFixture<LeaderSpecDiscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaderSpecDiscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderSpecDiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
