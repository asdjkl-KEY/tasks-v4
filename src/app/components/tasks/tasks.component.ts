import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  allTasks: any[] = []
  ngOnInit(): void {
    this.auth.getTasks().subscribe(res => {
      // this.allTasks = res.tasks;
      for(let task of res.tasks){
        this.allTasks.push(task)
      }
    }, err => {console.log(err)})
  }
  constructor(private router: Router, private auth: AuthService) {
    localStorage.setItem('url', 'Tareas');
    localStorage.setItem('page', 'tasks');
    if(localStorage.getItem('token') == 'null' || localStorage.getItem('token') == null){
      this.router.navigate(['login']);
    }
  }
  click(id: number) {
    localStorage.setItem('currentTask', ""+id);
  }
  title = "Tareas"

}
