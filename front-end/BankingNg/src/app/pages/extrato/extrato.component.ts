import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent implements OnInit {
  dados = {}

  constructor(
    public servicoLogin: LoginService
  ) { }

  ngOnInit() {
    this.dados = this.servicoLogin.response
  }

}
