import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  dadosUsuario = {};

  constructor(public servicoLogin: LoginService) { }

  ngOnInit() {
    this.dadosUsuario = this.servicoLogin.response.correntista;
  }

}



