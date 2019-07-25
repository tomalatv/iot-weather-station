import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementsPage } from './measurements.page';

describe('MeasurementsPage', () => {
  let component: MeasurementsPage;
  let fixture: ComponentFixture<MeasurementsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeasurementsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
