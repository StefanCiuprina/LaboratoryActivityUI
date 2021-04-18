import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Attendance } from './attendance.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'http://localhost:2697/api/Attendance'
  list: Attendance[];

  postAttendances(labId: number) {
    return this.http.post(`${this.baseURL}/${labId}`, null);
  }

  setState(attendance: Attendance, stateId: number) {
    return this.http.put(`${this.baseURL}/${stateId}`, attendance);
  }

  refreshList(labId: number) {
    this.http.get(`${this.baseURL}/Lab${labId}`)
      .toPromise()
      .then(res =>this.list = res as Attendance[]);
  }
}
