import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogSignComponent } from './log-sign.component';

describe('LogSignComponent', () => {
  let component: LogSignComponent;
  let fixture: ComponentFixture<LogSignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogSignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
