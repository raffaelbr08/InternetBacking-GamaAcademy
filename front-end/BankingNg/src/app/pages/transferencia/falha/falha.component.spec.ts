import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FalhaComponent } from './falha.component';

describe('FalhaComponent', () => {
  let component: FalhaComponent;
  let fixture: ComponentFixture<FalhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FalhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FalhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
