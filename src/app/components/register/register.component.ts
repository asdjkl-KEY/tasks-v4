
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {
    username: '',
    email: '',
    password: ''
  }
  message: any = {
    type: '',
    content: ''
  }
  constructor(private router: Router, private auth: AuthService) { 
    if(this.auth.isAuthenticated()) {
      this.router.navigate(['tasks']);
    }
   }

  ngOnInit(): void {
  }
  register(){
    if(this.user.username == '' && this.user.email == '' && this.user.password == '') {
      this.message.type = 'error';
      this.message.content = 'Completa los campos'
      return;
    }
    this.auth.register(this.user)
    .subscribe(res => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['tasks'])
    }, err => {
        if(err.error == 'taken'){
          this.message.type = 'error';
          this.message.content = 'El usuario ya existe'
        } else {
          this.message.type = 'error';
          this.message.content = 'Error al registrarse, faltan datos'
        }
      console.log(err.error);
    })
  }
  title = "Registrarse"

}

