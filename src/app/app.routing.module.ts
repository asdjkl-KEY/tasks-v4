import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//components
import { MainComponent } from './components/main/main.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskComponent } from './components/task/task.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchtasksComponent } from './components/searchtasks/searchtasks.component';
import { NewtaskComponent } from './components/newtask/newtask.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
    { path: '', component: MainComponent },
    { path: 'tasks', component: TasksComponent },
    { path: 'task', component: TaskComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'searchtasks', component: SearchtasksComponent },
    { path: 'newtask', component: NewtaskComponent },
    { path: 'logout', component: LogoutComponent }
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }