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
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

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

  async onSubmit(form: NgForm) {
    this.service.formData.labId = +localStorage.getItem('labId');
    this.service.formData.deadline.setHours(this.service.formData.deadline.getHours() + 3); //GMT + 3

    if (!(await this.assignmentExists())) {
      this.insertRecord(form);
    }
    else
      this.updateRecord(form);
  }

  async assignmentExists(): Promise<boolean> {
    let assignment: Assignment = await this.service.getForLab(this.service.formData.labId);
    return assignment.assignmentId != 0;
  }

  insertRecord(form: NgForm) {
    this.service.postAssignment().subscribe(
      res => {
        this.refresh();
        this.toastr.success('Submitted successfully.', 'Assignment')
      },
      err => { 
        this.toastr.error('An error occured creating the assignment. Please check your data.', 'Assignment')
       }
    );
  }

  async refresh() {
    this.service.formData = await this.service.getForLab(this.service.formData.labId);
  }

  updateRecord(form: NgForm) {

    this.service.putAssignment().subscribe(
      res => {
        this.toastr.info('Updated successfully', 'Assignment')
      },
      err => { 
        this.toastr.error('An error occured updating the assignment. Please check your data.', 'Assignment')
       }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Assignment();
  }

  assignmentSubmissions() {
    localStorage.setItem('assignmentId', this.service.formData.assignmentId.toString());
    this.router.navigate(['/teacherpanel/labs/assignment/submissions']);
  }

  deleteAssignment(form: NgForm) {
    this.service.deleteAssignment(this.service.formData.assignmentId).subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Deleted successfully', 'Assignment')
      },
      err => { 
        this.toastr.error('An error occured deleting the assignment. Please check your data.', 'Assignment')
       }
    )
  }

  navigateBackToLabs(){
    localStorage.removeItem('labId');
    this.router.navigate(['/teacherpanel/labs']);
  }

}
