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
import { RegistrationStudentComponent } from './user/registration-student/registration-student.component';
import { GroupsComponent } from './teacher-panel/groups/groups.component';
import { LabsComponent } from './teacher-panel/labs/labs.component';
import { AttendanceComponent } from './teacher-panel/labs/attendance/attendance.component';
import { AssignmentComponent } from './teacher-panel/labs/assignment/assignment.component';
import { SubmissionsComponent } from './teacher-panel/labs/submissions/submissions.component';

const routes: Routes = [
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      { path: 'student-registration', component: RegistrationStudentComponent }
    ]
  },
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'forbidden',component:ForbiddenComponent},
  {path:'teacherpanel',component:TeacherPanelComponent,canActivate:[AuthGuard],data :{permittedRoles:['Teacher']},
  children: [
    {path: 'studentsinfo', component:StudentsInfoComponent},
    {path: 'groups', component:GroupsComponent},
    {path: 'labs', component:LabsComponent},
    {path: 'labs/attendance', component:AttendanceComponent},
    {path: 'labs/assignment', component:AssignmentComponent},
    {path: 'labs/assignment/submissions', component:SubmissionsComponent}
  ]},
  {path:'studentpanel',component:StudentPanelComponent,canActivate:[AuthGuard],data :{permittedRoles:['Student']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }