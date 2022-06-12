import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit {
  message = {
    type: '',
    content: ''
  }
  saving: boolean = false;
  task = {
    title: '',
    description: '',
    objectives: [],
    category: '',
    state: '',
    endAt: ''
  }
  constructor(private router: Router, private auth: AuthService) {
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['login'])
    }
   }
  ngOnInit(): void {
  }
  saveTask(){
    this.auth.newTask(this.task).subscribe(res => {
      console.log(res)
      if(res.text == 'success'){
        this.message = {
          type: 'sucess',
          content: "Tarea guardada correctamente"
        }
        this.saving = true;
        setTimeout(() => {
          this.message = {
            type: '',
            content: ''
          }
          this.saving = false;
        }, 10000)
        return;
      }
      return
    }, err => {
      console.log(err)
      this.message = {
        type: 'error',
        content: 'Hubo un error inténtelo de nuevo'
      }
      setTimeout(() => {
        this.message = {
          type: '',
          content: ''
        }
      }, 10000)
    })
  }
  
  title = "Buscar Tarea"

}
