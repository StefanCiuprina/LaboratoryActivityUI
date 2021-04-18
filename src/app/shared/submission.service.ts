import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Submission } from './submission.model';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'http://localhost:2697/api/Submission'
  formData: Submission = new Submission();
  list: Submission[];

  postSubmission() {
    return this.http.post(this.baseURL, this.formData);
  }

  putSubmission() {
    return this.http.put(this.baseURL, this.formData);
  }

  setGrade() {
    return this.http.put(`${this.baseURL}/Grade`, this.formData);
  }

  deleteSubmission(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  deleteSubmissionByAssignment(id: number) {
    return this.http.delete(`${this.baseURL}/Assignment${id}`);
  }

  async getForAssignment(assignmentId: number): Promise<Submission> {
    let submission: Submission;
    await this.http.get(`${this.baseURL}/${assignmentId}`)
      .toPromise()
      .then(res => submission = res as Submission);
    
    if(submission == null) {
      return new Submission();
    }
    return submission;
  }

  async getForStudent(studentId: string): Promise<Submission> {
    let submission: Submission;
    await this.http.get(`${this.baseURL}/Student${studentId}`)
      .toPromise()
      .then(res => submission = res as Submission);
    
    if(submission == null) {
      return new Submission();
    }
    return submission;
  }

  refreshList(assignmentId: number) {
    this.http.get(`${this.baseURL}/${assignmentId}`)
      .toPromise()
      .then(res =>this.list = res as Submission[]);
  }
}
