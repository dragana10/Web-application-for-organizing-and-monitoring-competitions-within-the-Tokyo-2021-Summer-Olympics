import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormACompetitionComponent } from './form-a-competition.component';

describe('FormACompetitionComponent', () => {
  let component: FormACompetitionComponent;
  let fixture: ComponentFixture<FormACompetitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormACompetitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormACompetitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
