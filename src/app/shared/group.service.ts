import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Group } from './group.model';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  readonly baseURL = 'http://localhost:2697/api/Group'
  formData: Group = new Group();
  list: Group[];


  postGroup() {
    return this.http.post(this.baseURL, this.formData);
  }

  putGroup() {
    return this.http.put(this.baseURL, this.formData);
  }

  deleteGroup(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  async getGroups(): Promise<Group[]> {
    let groups: Group[];
    await this.http.get(this.baseURL)
      .toPromise()
      .then(res => groups = res as Group[]);
    
    return groups;
  }

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.list = res as Group[]);
  }
}
