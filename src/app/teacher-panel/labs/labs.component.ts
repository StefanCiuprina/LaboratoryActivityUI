import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lab } from 'src/app/shared/lab.model';
import { LabService } from '../../shared/lab.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrls: ['./labs.component.css']
})
export class LabsComponent implements OnInit {

  constructor(private router: Router, public service: LabService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: Lab) {
    this.service.formData = Object.assign({}, selectedRecord);
    this.service.formData.dateTime = new Date(selectedRecord.dateTime.toString().replace(" ", "T"));
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this lab?')) {
      this.service.deleteLab(id)
        .subscribe(
          res => {
            this.service.refreshList();
            this.toastr.error("Deleted successfully", 'Lab');
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
