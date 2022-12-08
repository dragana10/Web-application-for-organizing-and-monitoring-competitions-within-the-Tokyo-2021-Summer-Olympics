import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { CompetitionComponent } from './competition/competition.component';
import { CountryComponent } from './country/country.component';
import { DelegateComponent } from './delegate/delegate.component';
import { FormACompetitionComponent } from './form-a-competition/form-a-competition.component';
import { LeaderComponent } from './leader/leader.component';
import { LoginComponent } from './login/login.component';
import { MedalsComponent } from './medals/medals.component';
import { OrganizationComponent } from './organization/organization.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { RegistrationComponent } from './registration/registration.component';
import { RequestsComponent } from './requests/requests.component';
import { SearchAthletesComponent } from './search-athletes/search-athletes.component';
import { SpecifiedSportComponent } from './specified-sport/specified-sport.component';
import { SportsInputComponent } from './sports-input/sports-input.component';
import { StartComponent } from './start/start.component';
import {BreadcrumbModule} from "angular-crumbs"
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

const routes: Routes = [
  {path: '', component: StartComponent, data:{breadcrumb:'Home'}},
  {path: 'login', component: LoginComponent,data:{breadcrumb:'Home>Login'}},
  {path: 'login/registration', component: RegistrationComponent},
  {path: 'delegate/change-password', component: ChangePasswordComponent, data:{breadcrumb:'Home>Login>Delegate>Change Password'}},
  {path: 'country', component: CountryComponent, data:{breadcrumb:'Home>Country'}},
  {path: 'medals', component: MedalsComponent, data:{breadcrumb:'Home>Medals'}},
  {path: 'search-athletes', component: SearchAthletesComponent, data:{breadcrumb:'Home>Search-Athletes'}},
  {path: 'login/organizer', component: OrganizerComponent,data:{breadcrumb:'Home>Login-Organizer'}},
  {path: 'organization', component: OrganizationComponent, data:{breadcrumb:'Home>Login-Organizer>Organizer-Page'}},
  {path: 'delegate', component: DelegateComponent, data:{breadcrumb:'Home>Login>Delegate'}},
  {path: 'delegate/delegate-tennis/:disc_name', component: DelegateTennisComponent},
  {path: 'delegate/delegate-runn/:disc_name', component: DelegateRunnComponent},
  {path: 'delegate/delegate-jump/:disc_name', component: DelegateJumpComponent},
  {path: 'delegate/delegate-shoot/:disc_name', component: DelegateShootComponent},
  {path: 'leader', component: LeaderComponent, data:{breadcrumb:'Home>Login>Leader'}},
  {path: 'leader/reg-a-comp', component: RegisterACompetitorComponent, data:{breadcrumb:'Home>Login>Leader>Register a competitors'}},
  {path: 'leader/athletes', component: AthleteLeaderComponent, data:{breadcrumb:'Home>Login>Leader>Review athletes(all sports)'}},
  {path: 'leader/athletes/:name', component: AthleteDiscLeaderComponent, data:{breadcrumb:'Home>Login>Leader>Review athletes>Disciplines'}},
  {path: 'leader/athletes/:name/:disc_name', component: LeaderSpecDiscComponent, data:{breadcrumb:'Home>Login>Leader>Review athletes>Disciplines>Specified discipline'}},
  {path:'organization/requests',component:RequestsComponent, data:{breadcrumb:'Home>Login-Organizer>Organizer-Page>Requests'}},
  {path:'organization/records',component:RecordsComponent, data:{breadcrumb:'Home>Login-Organizer>Organizer-Page>Records'}},
  {path:'organization/change-password',component:ChangePasswordComponent, data:{breadcrumb:'Home>Login-Organizer>Organizer-Page>Change Password'}},
  {path:'organization/sports_input',component:SportsInputComponent, data:{breadcrumb:'Home>Login-Organizer>Organizer-Page>Sports-Input'}},
  {path:'organization/form_a_competition',component:FormACompetitionComponent, data:{breadcrumb:'Home>Login-Organizer>Organizer-Page>Form a competitions'}},
  {path:'organization/form_a_competition/competition/:name',component:CompetitionComponent, data:{breadcrumb:'Home>Login-Organizer>Organizer-Page>Form a competitions>Specified Sport'}},
  {path:'organization/form_a_competition/competition/:name/:name1',component:InfCompComponent, data:{breadcrumb:'Home>Login-Organizer>Organizer-Page>Form a competitions>Specified Sport>Information about competition'}}


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BreadcrumbModule,
    NgxChartsModule
  ],
  exports: [RouterModule,BreadcrumbModule]
})
export class AppRoutingModule { }
