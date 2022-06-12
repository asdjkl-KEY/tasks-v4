import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private router: Router, private auth: AuthService) { }
  ngOnInit(): void {
  if(this.auth.isAuthenticated()){
    this.router.navigate(['tasks']);
  }
  }

}
