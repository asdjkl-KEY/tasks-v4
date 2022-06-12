import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 API: string = 'https://Tasks.sparklybot.repl.co/api/';
  constructor(private http: HttpClient) { }

  login(user: any){
    return this.http.post<any>(this.API+'login', {
      username: user.username,
      password: user.password
    })
  }
  register(user: any){
    return this.http.post<any>(this.API+'register', {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
  getTasks() {
    return this.http.post<any>(this.API+'tasks', {
      token: this.getToken()
    });
  }
  getTask() {
    return this.http.post<any>(this.API+'taskbyid', {
      token: this.getToken(),
      id: localStorage.getItem('currentTask')
    });
  }
  getTaskByOptions(options: any) {
    return this.http.post<any>(this.API+'taskbyoptions', {
      token: this.getToken(),
      options: options
    });
  }
  newTask(task: any) {
    return this.http.post<any>(this.API+'newtask', {
      token: this.getToken(),
      newTask: task
    });
  }
  updateTask(task: any) {
    return this.http.post<any>(this.API+'updatetask', {
      token: this.getToken(),
      task: task
    });
  }
  deleteTask() {
    return this.http.post<any>(this.API+'deletetask', {
      token: this.getToken(),
      id: localStorage.getItem('currentTask')
    });
  }
  getToken() {
    return localStorage.getItem('token');
  }
  isAuthenticated() {
    if(this.getToken() != null) {
      return true;
    }
    return false
  }
  logout(): void {
    localStorage.removeItem('token');
  }
  saveToken(token: any) {
    return this.http.post<any>(this.API+'suscribetonotifications', {
      token: token,
      userToken: this.getToken()
    })
}

}
