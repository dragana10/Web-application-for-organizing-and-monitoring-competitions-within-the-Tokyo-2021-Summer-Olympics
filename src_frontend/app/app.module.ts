import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { StartComponent } from './start/start.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { CountryComponent } from './country/country.component';
import { MedalsComponent } from './medals/medals.component';
import{NgxPaginationModule} from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms';
import { SearchAthletesComponent } from './search-athletes/search-athletes.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { OrganizationComponent } from './organization/organization.component';
import { DelegateComponent } from './delegate/delegate.component';
import { LeaderComponent } from './leader/leader.component';
import { RequestsComponent } from './requests/requests.component';
import { SportsInputComponent } from './sports-input/sports-input.component';
import { FormACompetitionComponent } from './form-a-competition/form-a-competition.component';
import { SpecifiedSportComponent } from './specified-sport/specified-sport.component';
import { CompetitionComponent } from './competition/competition.component';
import { DelegateTennisComponent } from './delegate-tennis/delegate-tennis.component';
import { DelegateRunnComponent } from './delegate-runn/delegate-runn.component';
import { DelegateJumpComponent } from './delegate-jump/delegate-jump.component';
import { DelegateShootComponent } from './delegate-shoot/delegate-shoot.component';
import { RegisterACompetitorComponent } from './register-a-competitor/register-a-competitor.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { InfCompComponent } from './inf-comp/inf-comp.component';
import { AthleteLeaderComponent } from './athlete-leader/athlete-leader.component';
import { AthleteDiscLeaderComponent } from './athlete-disc-leader/athlete-disc-leader.component';
import { LeaderSpecDiscComponent } from './leader-spec-disc/leader-spec-disc.component';
import { RecordsComponent } from './records/records.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    RegistrationComponent,
    LoginComponent,
    CountryComponent,
    MedalsComponent,
    SearchAthletesComponent,
    OrganizerComponent,
    OrganizationComponent,
    DelegateComponent,
    LeaderComponent,
    RequestsComponent,
    SportsInputComponent,
    FormACompetitionComponent,
    SpecifiedSportComponent,
    CompetitionComponent,
    DelegateTennisComponent,
    DelegateRunnComponent,
    DelegateJumpComponent,
    DelegateShootComponent,
    RegisterACompetitorComponent,
    ChangePasswordComponent,
    InfCompComponent,
    AthleteLeaderComponent,
    AthleteDiscLeaderComponent,
    LeaderSpecDiscComponent,
    RecordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
