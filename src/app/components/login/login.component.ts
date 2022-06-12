import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = {
    username: '',
    password: ''
  }
  message: any = {
    type: '',
    content: ''
  }
  constructor(
    private AuthService: AuthService,
    private router: Router
    ) {
      if(this.AuthService.isAuthenticated()){
        this.router.navigate(['tasks'])
      }
     }
  logIn(){
    this.AuthService.login({username: this.user.username, password: this.user.password}).subscribe(
      res => {
      console.log(res.token);
      localStorage.setItem('token', res.token);
      this.router.navigate(["tasks"])
      },
      err => {
        this.message.type = 'error',
        this.message.content = (err.error == 'not found') ? 'Nombre de Usuario o email no encontrado' : "Contraseña inválida"
        console.log(err.error)
      }
      )
  }
  title = "Iniciar sesión"

}
