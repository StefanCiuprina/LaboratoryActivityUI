import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabsFormComponent } from './labs-form.component';

describe('LabsFormComponent', () => {
  let component: LabsFormComponent;
  let fixture: ComponentFixture<LabsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
