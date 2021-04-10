import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/shared/student.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Student } from 'src/app/shared/student.model';

@Component({
  selector: 'app-students-info-form',
  templateUrl: './students-info-form.component.html',
  styleUrls: ['./students-info-form.component.css']
})
export class StudentsInfoFormComponent implements OnInit {

  constructor(public service: StudentService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (this.service.formData.id == '')
      this.insertRecord(form);
    else
      this.updateRecord(form);
  }

  insertRecord(form: NgForm) {
    this.service.postStudent().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Submitted successfully', 'Student')
      },
      err => { console.log(err); }
    );
  }

  updateRecord(form: NgForm) {

    this.service.putStudent().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated successfully', 'Student')
      },
      err => { console.log(err); }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.formData = new Student();
  }

  onExport() {
    var result = [];
    var length = 128;
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
      charactersLength)));
    }
    this.service.formData.token = result.join('');
  }

}
