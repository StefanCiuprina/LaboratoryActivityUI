import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabsStudentsComponent } from './labs-students.component';

describe('LabsStudentsComponent', () => {
  let component: LabsStudentsComponent;
  let fixture: ComponentFixture<LabsStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabsStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabsStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
