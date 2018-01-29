import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLoginExpiradoComponent } from './modal-login-expirado.component';

describe('ModalLoginExpiradoComponent', () => {
  let component: ModalLoginExpiradoComponent;
  let fixture: ComponentFixture<ModalLoginExpiradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLoginExpiradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLoginExpiradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
