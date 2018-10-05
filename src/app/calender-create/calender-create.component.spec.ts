import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderCreateComponent } from './calender-create.component';

describe('CalenderCreateComponent', () => {
  let component: CalenderCreateComponent;
  let fixture: ComponentFixture<CalenderCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalenderCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
