import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lab } from 'src/app/shared/lab.model';
import { LabService } from '../../shared/lab.service'
import { StudentService } from '../../shared/student.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-labs-students',
  templateUrl: './labs-students.component.html',
  styleUrls: ['./labs-students.component.css']
})
export class LabsStudentsComponent implements OnInit {

  constructor(private router: Router, public service: LabService, public studentService: StudentService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.setStudentAndGroupIds();
    this.service.refreshListForGroup(this.getGroupId());
  }

  async setStudentAndGroupIds() {
    let username = localStorage.getItem('username');
    let student = await this.studentService.getStudentByUsername(username);
    localStorage.setItem('studentId', student.id);
    localStorage.setItem('groupId', student.groupId.toString());
  }

  getGroupId(): number {
    return +localStorage.getItem('groupId');
  }


  populateForm(selectedRecord: Lab) {
    this.service.formData = Object.assign({}, selectedRecord);
    this.service.formData.dateTime = new Date(selectedRecord.dateTime.toString().replace(" ", "T"));
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}
