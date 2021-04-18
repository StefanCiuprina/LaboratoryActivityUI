import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { State } from './state.model';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  readonly baseURL = 'http://localhost:2697/api/State'
  list: State[];

  async getStates(): Promise<State[]> {
    let states: State[];
    await this.http.get(this.baseURL)
      .toPromise()
      .then(res => states = res as State[]);
    
    return states;
  }

  refreshList() {
    this.http.get(this.baseURL)
      .toPromise()
      .then(res =>this.list = res as State[]);
  }
}
