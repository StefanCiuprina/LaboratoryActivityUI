import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Lab } from './lab.model';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LabService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  readonly baseURL = 'http://localhost:2697/api/Lab'
  formData: Lab = new Lab();
  list: Lab[];


  postLab() {
    return this.http.post(this.baseURL, this.formData);
  }

  putLab() {
    return this.http.put(this.baseURL, this.formData);
  }

  deleteLab(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  async getLabs(): Promise<Lab[]> {
    let groups: Lab[];
    await this.http.get(this.baseURL)
      .toPromise()
      .then(res => groups = res as Lab[]);
    
    return groups;
  }

  async getLabNames(): Promise<string[]> {
    let labNames: string[];
    await this.http.get(this.baseURL + '/LabNames')
      .toPromise()
      .then(res => labNames = res as string[])
    return labNames;
  }

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.list = res as Lab[]);
  }

  refreshListForGroup(groupId: number) {
    this.http.get(`${this.baseURL}/Group${groupId}`)
      .toPromise()
      .then(res =>this.list = res as Lab[]);
  }
}
