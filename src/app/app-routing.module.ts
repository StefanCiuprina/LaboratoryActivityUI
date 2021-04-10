import { TeacherPanelComponent } from './teacher-panel/teacher-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { StudentPanelComponent } from './student-panel/student-panel.component';
import { StudentsInfoComponent } from './teacher-panel/students-info/students-info.component';

const routes: Routes = [
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'forbidden',component:ForbiddenComponent},
  {path:'teacherpanel',component:TeacherPanelComponent,canActivate:[AuthGuard],data :{permittedRoles:['Teacher']},
  children: [
    {path: 'studentsinfo', component:StudentsInfoComponent}
  ]},
  {path:'studentpanel',component:StudentPanelComponent,canActivate:[AuthGuard],data :{permittedRoles:['Student']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }