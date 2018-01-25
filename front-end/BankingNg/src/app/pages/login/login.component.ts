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
  public incorret: boolean;

  constructor(public servicoLogin: LoginService, private navegacao: Router) { }

  ngOnInit() {
  }

  public enviaFormulario(formulario: NgForm): void{

    this.servicoLogin.login = {
      cpf:'1',
      senha:'12345'
    }
    
    this.servicoLogin.efetuaLogin()
    .subscribe(
      dados => {
        if(dados.status == 200){
          this.servicoLogin.response = dados.json();
          this.navegacao.navigate(['/extrato']);

        }else{
          this.incorret = true;
          console.log(this.servicoLogin.login)
        }
      },error=>{
        this.incorret = true;
      }

    )
        

  }

}
