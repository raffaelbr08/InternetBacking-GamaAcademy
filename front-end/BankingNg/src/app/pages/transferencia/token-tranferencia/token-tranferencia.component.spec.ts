import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenTranferenciaComponent } from './token-tranferencia.component';

describe('TokenTranferenciaComponent', () => {
  let component: TokenTranferenciaComponent;
  let fixture: ComponentFixture<TokenTranferenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenTranferenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenTranferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
