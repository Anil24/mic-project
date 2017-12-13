import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyholderdetailsComponent } from './policyholderdetails.component';

describe('PolicyholderdetailsComponent', () => {
  let component: PolicyholderdetailsComponent;
  let fixture: ComponentFixture<PolicyholderdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyholderdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyholderdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
