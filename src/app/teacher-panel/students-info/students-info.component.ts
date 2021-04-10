import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from 'src/app/shared/student.model';
import { StudentService } from '../../shared/student.service'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-students-info',
  templateUrl: './students-info.component.html',
  styleUrls: ['./students-info.component.css']
})
export class StudentsInfoComponent implements OnInit {

  constructor(private router: Router, public service: StudentService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: Student) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete this student account?')) {
      this.service.deleteStudent(id)
        .subscribe(
          res => {
            this.service.refreshList();
            this.toastr.error("Deleted successfully", 'Student');
          },
          err => { console.log(err) }
        )
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}
