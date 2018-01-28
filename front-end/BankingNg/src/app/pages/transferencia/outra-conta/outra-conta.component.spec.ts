import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutraContaComponent } from './outra-conta.component';

describe('OutraContaComponent', () => {
  let component: OutraContaComponent;
  let fixture: ComponentFixture<OutraContaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutraContaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutraContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
