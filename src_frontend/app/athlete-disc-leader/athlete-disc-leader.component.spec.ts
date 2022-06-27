import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AthleteDiscLeaderComponent } from './athlete-disc-leader.component';

describe('AthleteDiscLeaderComponent', () => {
  let component: AthleteDiscLeaderComponent;
  let fixture: ComponentFixture<AthleteDiscLeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AthleteDiscLeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AthleteDiscLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
