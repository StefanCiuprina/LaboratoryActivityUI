import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Student } from './student.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  readonly baseURL = 'http://localhost:2697/api/ApplicationUser'
  formData: Student = new Student();
  list: Student[];

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Token: ['', Validators.required],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

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

  registerStudent() {
    var body = {
      UserName: this.formModel.value.UserName,
      Token: this.formModel.value.Token,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.put(this.baseURL + '/SetUserRegistered', body);
  }

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.list = res as Student[]);
  }

  async getStudentById(id: number): Promise<Student> {
    let student: Student;
    await this.http.get(`${this.baseURL}/Student${id}`)
      .toPromise()
      .then(res => student = res as Student);
    
    return student;
  }

  async getStudentByUsername(username: string): Promise<Student> {
    let student: Student;
    await this.http.get(`${this.baseURL}/StudentName/${username}`)
      .toPromise()
      .then(res => student = res as Student);
    
    return student;
  }
}
