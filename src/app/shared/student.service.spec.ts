import { TestBed } from '@angular/core/testing';

import { StudentsInfoService } from './student.service';

describe('StudentsInfoService', () => {
  let service: StudentsInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentsInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
