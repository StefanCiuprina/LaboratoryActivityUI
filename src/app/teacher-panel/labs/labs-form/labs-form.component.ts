import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { LabService } from 'src/app/shared/lab.service';
import { Lab } from 'src/app/shared/lab.model';
import { Group } from 'src/app/shared/group.model';
import { GroupService } from 'src/app/shared/group.service';
@Component({
  selector: 'app-labs-form',
  templateUrl: './labs-form.component.html',
  styleUrls: ['./labs-form.component.css']
})
export class LabsFormComponent implements OnInit {

  labNames: string[];
  groups: Group[];

  constructor(public service: LabService, public groupService: GroupService, private toastr: ToastrService) { }

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

  onSubmit(form: NgForm) {
    this.service.formData.dateTime.setHours(this.service.formData.dateTime.getHours() + 3); //GMT + 3
    this.retreiveLabNames();
    if (this.service.formData.labId == 0) {
      this.insertRecord(form);
    }
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postLab().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted successfully.', 'Lab')
      },
      err => { 
        this.toastr.error('An error occured. Please check your data.', 'Lab')
       }
    );
  }

  updateRecord(form: NgForm) {

    this.service.putLab().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated successfully', 'Lab')
      },
      err => { 
        this.toastr.error('An error occured. Please check your data.', 'Lab')
       }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Lab();
  }

}
