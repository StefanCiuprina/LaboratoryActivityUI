import { UserService } from './../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/shared/student.service';

@Component({
  selector: 'app-registration-student',
  templateUrl: './registration-student.component.html',
  styleUrls: ['./registration-student.component.css']
})
export class RegistrationStudentComponent implements OnInit {

  constructor(public service: StudentService, private toastr: ToastrService) { }

  registerType: string = "teacher";

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit() {
    this.service.registerStudent().subscribe(
      (data) => {
        this.service.formModel.reset();
          this.toastr.success('Student registered.', 'Registration successful.');
      },
      (error) => {
        this.toastr.error('Username or token invalid.','Registration failed.');
      }
    );
  }

}
