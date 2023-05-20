import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPrivilegeComponent } from './show-privilege.component';

describe('ShowPrivilegeComponent', () => {
  let component: ShowPrivilegeComponent;
  let fixture: ComponentFixture<ShowPrivilegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPrivilegeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
