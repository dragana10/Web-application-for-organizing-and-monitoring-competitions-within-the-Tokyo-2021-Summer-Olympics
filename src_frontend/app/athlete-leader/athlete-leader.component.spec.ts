import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteLeaderComponent } from './athlete-leader.component';

describe('AthleteLeaderComponent', () => {
  let component: AthleteLeaderComponent;
  let fixture: ComponentFixture<AthleteLeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AthleteLeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
