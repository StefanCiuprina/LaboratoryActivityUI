import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  readonly baseURL = 'http://localhost:2697/api/ApplicationUser'
  formData: Student = new Student();
  list: Student[];

  postStudent() {
    return this.http.post(this.baseURL + '/RegisterStudent', this.formData);
  }

  putStudent() {
    return this.http.put(this.baseURL, this.formData);
  }

  deleteStudent(id: string) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  setStudentRegistered() {
    return this.http.post(this.baseURL + '/SetUserRegistered', this.formData);
  }

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.list = res as Student[]);
  }
}
