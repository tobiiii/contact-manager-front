import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContactToCompanyComponent } from './add-contact-to-company.component';

describe('AddContactToCompanyComponent', () => {
  let component: AddContactToCompanyComponent;
  let fixture: ComponentFixture<AddContactToCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddContactToCompanyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddContactToCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
