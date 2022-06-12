import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  options: any = [
    {label: 'Iniciar Sesión', link: 'login',icon: 'fa fa-sign-in', index: 'index0'},
    {label: 'Registrarse', link: 'register',icon: 'fa fa-user-plus', index: 'index1'},
]
options2: any = [
  {label: "Tareas", link: 'tasks', icon: "fa fa-tasks", index: 'index0'},
  {label: "Nueva Tarea", link: 'newtask', icon: "fa fa-plus", index: 'index1'},
  {label: "Buscar Tarea", link: 'searchtasks', icon: "fa fa-search", index: 'index2'},
  {label: "Cerrar Sesión", link: 'logout', icon: "fa fa-sign-out", index: 'index3'}
]
authenticated: boolean = this.auth.isAuthenticated();
  ngOnInit(): void {
    setInterval(() => {
      if(this.auth.isAuthenticated() != this.authenticated){
        this.authenticated = this.auth.isAuthenticated();
      } else {
        return;
      }
    }, 100)
  }
  bars: any = ''
  constructor(private auth: AuthService, private router: Router) { 
    
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
  toggle(){
    if(this.bars == '' || this.bars == 'stop'){
     return this.bars = 'active'
    }
    return this.bars = 'stop'
  }

  

}
