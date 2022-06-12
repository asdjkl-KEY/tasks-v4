import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-searchtasks',
  templateUrl: './searchtasks.component.html',
  styleUrls: ['./searchtasks.component.css']
})
export class SearchtasksComponent implements OnInit {
  options = {
    state: null,
    category: null,
    paragraph: null
  }
  tasks: any[] = []
  message = {
    type: '',
    content: ''
  }
  allTasks: any[] = []
  searching: boolean = false
  constructor(private router: Router, private auth: AuthService) { 
    if(!this.auth.isAuthenticated()) {
      this.router.navigate(['login'])
    }
   }

  ngOnInit(): void {
  }
  search(){
    if(this.options.category == null && this.options.state == null && this.options.paragraph == null){
      this.message.type = 'error'
      this.message.content = "Al menos uno de los campos debe contener algo"
      setTimeout(() => {
        this.message.type = ''
        this.message.content = ''
      }, 4000)
      return
    }
    this.searching = false
    this.searching = true
    this.auth.getTaskByOptions(this.options).subscribe(res => {
      this.tasks = res.tasks
      console.log(res.tasks)
    }, err => {
      this.message.type = 'error'
      this.message.content = "Error al buscar"
      setTimeout(() => { 
        this.message.type = ''
        this.message.content = ''
      }
      , 4000)
      console.log(err)
    })
  }
  click(id: number) {
    localStorage.setItem('currentTask', ""+id);
    console.log(localStorage.getItem('currentTask'))
    this.router.navigate(['task'])
  }
}
