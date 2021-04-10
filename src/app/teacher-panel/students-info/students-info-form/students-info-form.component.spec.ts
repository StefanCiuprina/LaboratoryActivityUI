import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsInfoFormComponent } from './students-info-form.component';

describe('StudentsInfoFormComponent', () => {
  let component: StudentsInfoFormComponent;
  let fixture: ComponentFixture<StudentsInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentsInfoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
