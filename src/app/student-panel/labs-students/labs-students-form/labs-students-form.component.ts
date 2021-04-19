import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { LabService } from 'src/app/shared/lab.service';
import { Lab } from 'src/app/shared/lab.model';
import { Group } from 'src/app/shared/group.model';
import { GroupService } from 'src/app/shared/group.service';
import { AttendanceService } from 'src/app/shared/attendance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-labs-students-form',
  templateUrl: './labs-students-form.component.html',
  styleUrls: ['./labs-students-form.component.css']
})
export class LabsStudentsFormComponent implements OnInit {

  labNames: string[];
  groups: Group[];

  constructor(private router: Router, public service: LabService, public groupService: GroupService,
    public attendanceService: AttendanceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.retreiveLabNames();
    this.retreiveGroups();
  }

  async retreiveLabNames() {
    this.labNames = await this.service.getLabNames();
  }

  async retreiveGroups() {
    this.groups = await this.groupService.getGroups();
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Lab();
  }

  labAssignment(labId: number) {
    localStorage.setItem('labId', labId.toString());
    this.router.navigateByUrl('/studentpanel/labs/assignment');
  }

}
