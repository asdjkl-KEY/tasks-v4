import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{
  task!: any
  objectives: string = 'recoger patatas, no dañar plantas'
  editing: Boolean = false
  message: any = {
    type: '',
    content: '',
    show: false
  }
  ngOnInit(): void {
    this.auth.getTask().subscribe(res => {
      this.task = res.task;
    }, err => {
      console.log(err);
    })
  }
  saveEdit() {
    this.auth.updateTask({
      name: this.task.name,
      title: this.task.title,
      state: this.task.state,
      category: this.task.category,
      objectives: this.task.objectives,
      createdAt: this.task.createdAt,
      endAt: this.task.endAt,
      description: this.task.description,
      shortDescription: this.task.shortDescription,
      id: this.task.id
    }).subscribe(res => {
      if(res.text == 'success'){
        this.message.type = 'sucess';
        this.message.content = 'Guardando cambios...';
        this.message.show = true;
        setTimeout(() => {
          this.message.show = false;
          this.message.content = '';
          this.message.type = '';
          this.editing = false;
        }, 2000)
      }
    }, err => {
      this.message.type = 'error';
      this.message.content = 'No se han podido guardar los cambios ha ocurrido un error';
      this.message.show = true;
      setTimeout(() => {
        this.message.show = false;
        this.message.content = '';
        this.message.type = '';
        this.editing = false;
      }, 3000);
      console.log(err);
    })
    
  }
  initTask(){
    this.auth.updateTask({
      name: this.task.name,
      title: this.task.title,
      state: ['current', 'Tarea en curso'],
      category: this.task.category,
      objectives: this.task.objectives,
      createdAt: this.task.createdAt,
      endAt: this.task.endAt,
      description: this.task.description,
      shortDescription: this.task.shortDescription,
      id: this.task.id
    }).subscribe(res => {
      if(res.text == 'success'){
        this.message.type = 'sucess';
        this.message.content = 'Tarea Iniciada';
        this.message.show = true;
        setTimeout(() => {
          this.message.show = false;
          this.message.content = '';
          this.message.type = '';
          this.editing = false;
        }, 2000)
      }
      console.log(res)
    }, err => {
      console.log(err)
    })
  }
  completeTask(){
    this.auth.updateTask({
      name: this.task.name,
      title: this.task.title,
      state: ['ended', 'Tarea completada'],
      category: this.task.category,
      objectives: this.task.objectives,
      createdAt: this.task.createdAt,
      endAt: this.task.endAt,
      description: this.task.description,
      shortDescription: this.task.shortDescription,
      id: this.task.id
    }).subscribe(res => {
      if(res.text == 'success'){
        this.message.type = 'sucess';
        this.message.content = 'Tarea completada';
        this.message.show = true;
        setTimeout(() => {
          this.message.show = false;
          this.message.content = '';
          this.message.type = '';
          this.editing = false;
        }, 2000)
      }
      console.log(res)
    }, err => {
      console.log(err)
    })
  }
  deleteTask(){
    this.auth.deleteTask().subscribe(res => {
      if(res.text == 'success'){
        this.message.type = 'sucess';
        this.message.content = 'Tarea eliminada';
        this.message.show = true;
        setTimeout(() => {
          this.message.show = false;
          this.message.content = '';
          this.message.type = '';
          this.editing = false;
        }, 2000)
        this.router.navigate(['tasks']);
      }
    })
  }
  constructor(private router: Router, private auth: AuthService) { 
    // this.task = this.auth.taskById(parseInt(localStorage.getItem('currentTask')!));
    if(!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
    }
    localStorage.setItem('tasksrefresing', 'false');
   }
  
  setEditing() {
    if(this.editing == false) return this.editing = true;
    if(this.editing == true) return this.editing = false;
    return null;
  }
}
