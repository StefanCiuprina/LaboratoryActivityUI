import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Assignment } from './assignment.model';
import { switchMap } from 'rxjs/operators';
import {Observable,of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'http://localhost:2697/api/Assignment'
  formData: Assignment = new Assignment();

  async getForLab(labId: number): Promise<Assignment> {
    let assignment: Assignment;
    await this.http.get(`${this.baseURL}/${labId}`)
      .toPromise()
      .then(res => assignment = res as Assignment);
    
    if(assignment == null) {
      return new Assignment();
    }
    return assignment;
  }

  async getAllForGroup(groupId: number): Promise<Assignment[]> {
    let assignments: Assignment[];
    await this.http.get(`${this.baseURL}/Group${groupId}`)
      .toPromise()
      .then(res => assignments = res as Assignment[]);
    
    return assignments;
  }

  postAssignment() {
    return this.http.post(this.baseURL, this.formData);
  }

  putAssignment() {
    return this.http.put(this.baseURL, this.formData);
  }

  deleteAssignment(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  deleteAssignmentByLab(id: number) {
    return this.http.delete(`${this.baseURL}/Lab${id}`);
  }
}
