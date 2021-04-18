import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../../../shared/state.service'
import { ToastrService } from 'ngx-toastr';
import { Attendance } from 'src/app/shared/attendance.model';
import { SubmissionService } from 'src/app/shared/submission.service';
import { Submission } from 'src/app/shared/submission.model';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})
export class SubmissionsComponent implements OnInit {

  constructor(private router: Router, public service: SubmissionService,
    public stateService: StateService, private toastr: ToastrService) { }

  grades: number[];

  ngOnInit(): void {
    let assignmentId = localStorage.getItem('assignmentId');
    this.service.refreshList(+assignmentId);
    this.setDefaultGrades();
  }

  setDefaultGrades() {
    this.grades = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  setGrade(submission: Submission, grade: number) {
    this.service.formData.submissionId = submission.submissionId;
    this.service.formData.grade = grade;
    this.service.setGrade().subscribe();
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  navigateBackToAssignment(){
    localStorage.removeItem('assignmentId');
    this.router.navigate(['/teacherpanel/labs/assignment']);
  }

}
