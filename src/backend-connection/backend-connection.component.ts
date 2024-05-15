import { Component, OnInit } from '@angular/core';
import { BackendConnectionService } from '../app/service/backend-connection.service';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'backend-connection',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './backend-connection.component.html',
  styleUrls: ['./backend-connection.component.scss']
})
export class BackendConnectionComponent implements OnInit {
  userEmail: string | undefined;

  constructor(private backendService: BackendConnectionService) {}

  ngOnInit(): void {
    const userEmail = 'demo@demo.demo'; // Assuming you want to fetch this user initially
    this.backendService.getUserByEmail(userEmail).subscribe(
      (userData) => {
        this.userEmail = userData.email;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}
