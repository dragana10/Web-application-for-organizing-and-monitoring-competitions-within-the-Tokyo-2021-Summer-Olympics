import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterACompetitorComponent } from './register-a-competitor.component';

describe('RegisterACompetitorComponent', () => {
  let component: RegisterACompetitorComponent;
  let fixture: ComponentFixture<RegisterACompetitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterACompetitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterACompetitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
