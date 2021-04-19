import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { TeacherPanelComponent } from './teacher-panel/teacher-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { StudentPanelComponent } from './student-panel/student-panel.component';
import { StudentsInfoComponent } from './teacher-panel/students-info/students-info.component';
import { StudentsInfoFormComponent } from './teacher-panel/students-info/students-info-form/students-info-form.component';
import { RegistrationStudentComponent } from './user/registration-student/registration-student.component';
import { GroupsComponent } from './teacher-panel/groups/groups.component';
import { GroupsFormComponent } from './teacher-panel/groups/groups-form/groups-form.component';
import { LabsComponent } from './teacher-panel/labs/labs.component';
import { LabsFormComponent } from './teacher-panel/labs/labs-form/labs-form.component';


import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AttendanceComponent } from './teacher-panel/labs/attendance/attendance.component';
import { AssignmentComponent } from './teacher-panel/labs/assignment/assignment.component';
import { SubmissionsComponent } from './teacher-panel/labs/submissions/submissions.component';
import { LabsStudentsComponent } from './student-panel/labs-students/labs-students.component';
import { LabsStudentsFormComponent } from './student-panel/labs-students/labs-students-form/labs-students-form.component';
import { AssignmentStudentsComponent } from './student-panel/labs-students/assignment-students/assignment-students.component';
import { SubmissionStudentComponent } from './student-panel/labs-students/assignment-students/submission-student/submission-student.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    TeacherPanelComponent,
    ForbiddenComponent,
    StudentPanelComponent,
    StudentsInfoComponent,
    StudentsInfoFormComponent,
    RegistrationStudentComponent,
    GroupsComponent,
    GroupsFormComponent,
    LabsComponent,
    LabsFormComponent,
    AttendanceComponent,
    AssignmentComponent,
    SubmissionsComponent,
    LabsStudentsComponent,
    LabsStudentsFormComponent,
    AssignmentStudentsComponent,
    SubmissionStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    FormsModule,
    MatButtonModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    NgxMatNativeDateModule,
    MatTooltipModule
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }