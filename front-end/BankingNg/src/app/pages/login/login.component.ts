import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  msgerror = '';
  public incorret: boolean;

  constructor(public servicoLogin: LoginService, private navegacao: Router) { }

  ngOnInit() {
  }

  public enviaFormulario(formulario: NgForm): void{

    this.servicoLogin.login = formulario.value;
    
    this.servicoLogin.efetuaLogin()
    .subscribe(
      dados => {
        
          this.servicoLogin.response = dados.json();
          this.navegacao.navigate(['/extrato']);               
       
      },error=>{
        this.incorret = true;   
        this.msgerror = JSON.parse(error._body);
      }

    )
        

  }

}
