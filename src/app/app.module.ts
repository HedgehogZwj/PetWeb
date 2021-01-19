import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManagerComponent } from './manager/manager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GpsComponent } from './gps/gps.component';
import { ShowComponent } from './show/show.component';
import { DataComponent } from './data/data.component';
import { PetComponent } from './pet/pet.component';
import { MeComponent } from './me/me.component';
import { LogonComponent } from './logon/logon.component';
import { AuthService } from './auth.service';
import { LoginGuard } from './login.guard';
import { DeviceComponent } from './device/device.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { AddpetComponent } from './addpet/addpet.component';
import { NgxEchartsModule } from 'ngx-echarts'

const ManagerChildRoutes: Routes = [
  { path: 'pet', component: PetComponent },
  { path: '', redirectTo: 'pet', pathMatch: 'full' },
  { path: 'me', component: MeComponent },
  { path: 'addpet', component: AddpetComponent }
]

const ShowChildRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'data', component: DataComponent },
  { path: 'gps', component: GpsComponent },
  { path: 'manager', component: ManagerComponent, children: ManagerChildRoutes },
  { path: 'device', component: DeviceComponent, },
  { path: 'user', component: UserComponent },
  { path: 'admin', component: AdminComponent },
]

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'show', pathMatch: 'full' },
  { path: 'logon', component: LogonComponent },
  {
    path: 'show', component: ShowComponent, children: ShowChildRoutes,
    //canActivate: [LoginGuard]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ManagerComponent,
    GpsComponent,
    ShowComponent,
    DataComponent,
    PetComponent,
    MeComponent,
    LogonComponent,
    DeviceComponent,
    AdminComponent,
    UserComponent,
    AddpetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [AuthService, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
