import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Submission } from 'src/app/shared/submission.model';
import { Group } from 'src/app/shared/group.model';
import { GroupService } from 'src/app/shared/group.service';
import { AttendanceService } from 'src/app/shared/attendance.service';
import { Router } from '@angular/router';
import { SubmissionService } from 'src/app/shared/submission.service';

@Component({
  selector: 'app-submission-student',
  templateUrl: './submission-student.component.html',
  styleUrls: ['./submission-student.component.css']
})
export class SubmissionStudentComponent implements OnInit {

  labNames: string[];
  groups: Group[];

  constructor(private router: Router, public service: SubmissionService, public groupService: GroupService,
    public attendanceService: AttendanceService, private toastr: ToastrService) { }
  
  assignmentId: number;
  studentId: string;

  ngOnInit(): void {
    this.getAssignmentAndStudentId();
    let assignmentId = localStorage.getItem('assignmentId');
    let studentId = localStorage.getItem('studentId');
    this.retreiveSubmission(+assignmentId, studentId);
  }

  async retreiveSubmission(assignmentId: number, studentId: string) {
    this.service.formData = await this.service.getByStudentAndAssignment(assignmentId, studentId);
    this.service.formData.assignmentId = assignmentId;
  }

  getAssignmentAndStudentId() {
    this.assignmentId = +localStorage.getItem('assignmentId');
    this.studentId = localStorage.getItem('studentId');
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.submissionId == 0) {
      this.insertRecord(form);
    }
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.formData.assignmentId = this.assignmentId;
    this.service.formData.studentId = this.studentId;
    this.service.postSubmission().subscribe(
      res => {
        this.service.fillFormData((res as Submission).assignmentId);
        this.toastr.success('Submitted successfully.', 'Submission')
      },
      err => { 
        this.toastr.error('An error occured submitting the assignment. Please check your data.', 'Submission')
       }
    );
  }

  updateRecord(form: NgForm) {

    this.service.putSubmission().subscribe(
      res => {
        this.service.refreshList(this.assignmentId);
        this.toastr.info('Updated successfully', 'Submission')
      },
      err => { 
        this.toastr.error('An error occured. Please check your data.', 'Submission')
       }
    );
  }

  navigateBackToAssignment() {
    localStorage.removeItem('assignmentId');
    this.router.navigate(['/studentpanel/labs/assignment']);
  }


}
