import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { AssignmentService } from 'src/app/shared/assignment.service';
import { Assignment } from 'src/app/shared/assignment.model';
import { Group } from 'src/app/shared/group.model';
import { GroupService } from 'src/app/shared/group.service';
import { AttendanceService } from 'src/app/shared/attendance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignment-students',
  templateUrl: './assignment-students.component.html',
  styleUrls: ['./assignment-students.component.css']
})
export class AssignmentStudentsComponent implements OnInit {

  labNames: string[];
  groups: Group[];

  constructor(private router: Router, public service: AssignmentService, public groupService: GroupService,
    public attendanceService: AttendanceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    let labId = localStorage.getItem('labId');
    this.retreiveAssignment(+labId);
  }

  async retreiveAssignment(labId: number) {
    this.service.formData = await this.service.getForLab(labId);
    this.service.formData.labId = labId;
  }

  async assignmentExists(): Promise<boolean> {
    let assignment: Assignment = await this.service.getForLab(this.service.formData.labId);
    return assignment.assignmentId != 0;
  }


  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Assignment();
  }


  navigateBackToLabs(){
    localStorage.removeItem('labId');
    this.router.navigate(['/studentpanel/labs']);
  }

  navigateToSubmission() {
    localStorage.setItem('assignmentId', this.service.formData.assignmentId.toString());
    this.router.navigate(['/studentpanel/labs/assignment/submission']);
  }

}
