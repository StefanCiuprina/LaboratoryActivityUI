import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { State } from 'src/app/shared/state.model';
import { AttendanceService } from '../../../shared/attendance.service'
import { StateService } from '../../../shared/state.service'
import { ToastrService } from 'ngx-toastr';
import { Attendance } from 'src/app/shared/attendance.model';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  constructor(private router: Router, public service: AttendanceService,
    public stateService: StateService, private toastr: ToastrService) { }

  states: State[];

  ngOnInit(): void {
    let labId = localStorage.getItem('labId');
    this.service.refreshList(+labId);
    this.retreiveStates();
  }

  async retreiveStates() {
    this.states = await this.stateService.getStates();
  }

  setState(attendance: Attendance, stateId: number) {
    this.service.setState(attendance, stateId).subscribe();
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}
