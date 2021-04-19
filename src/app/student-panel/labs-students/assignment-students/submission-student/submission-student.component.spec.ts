import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionStudentComponent } from './submission-student.component';

describe('SubmissionStudentComponent', () => {
  let component: SubmissionStudentComponent;
  let fixture: ComponentFixture<SubmissionStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmissionStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
