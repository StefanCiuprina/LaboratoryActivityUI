import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabsStudentsFormComponent } from './labs-students-form.component';

describe('LabsStudentsFormComponent', () => {
  let component: LabsStudentsFormComponent;
  let fixture: ComponentFixture<LabsStudentsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabsStudentsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabsStudentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
