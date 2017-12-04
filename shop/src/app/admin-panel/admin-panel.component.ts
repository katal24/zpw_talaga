import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private router: Router) { 
    console.log("admin panel constructor");
  }

  ngOnInit() {
  }

  orders(){
    this.router.navigate(['/orders']);

  }
}
