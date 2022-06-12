import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';
import { AuthService } from './services/auth.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskComponent } from './components/task/task.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchtasksComponent } from './components/searchtasks/searchtasks.component';
import { NewtaskComponent } from './components/newtask/newtask.component';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    TasksComponent,
    TaskComponent,
    LoginComponent,
    RegisterComponent,
    SearchtasksComponent,
    NewtaskComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  public readonly VAPID_PUBLIC_KEY = 'BGCDWCnFMwEehzBkdT8EtglUpp8OryFtpJdAywWzModH58QZWn-FJ0Quh5_KzuuuWYzl6AReuFtE4BBlr-63aXI'
  constructor(private push: SwPush, private auth: AuthService) {
    if(this.auth.isAuthenticated()) {
      this.suscribeToNotifications();
    }
  }
  suscribeToNotifications(): any {
    this.push.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => {
      const token = JSON.parse(JSON.stringify(sub));
      console.log("********** OJO **********", token);
      this.auth.saveToken(token).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      })
    }
    )
  }
 }
