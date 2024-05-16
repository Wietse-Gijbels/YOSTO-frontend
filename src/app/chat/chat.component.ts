import {Component, OnInit} from '@angular/core';
import {MatList, MatListItem} from "@angular/material/list";
import {MatLine} from "@angular/material/core";
import {GebruikerService} from "../service/gebruiker.service";
import {GebruikerInterface, Message} from "../models/interfaces";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatGridList} from "@angular/material/grid-list";
import {StompService} from "../service/stomp.service";
import {ChatService} from "../service/chat.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MatList,
    MatListItem,
    MatLine,
    MatButton,
    MatFormField,
    MatInput,
    MatGridList,
    ReactiveFormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{
  gebruikers: GebruikerInterface[] = [];
  selectedGebruiker: GebruikerInterface | null = null;
  messageForm!: FormGroup;
  berichten: Message[] = [];

  constructor(private gebruikerService: GebruikerService,
              private stompService:StompService,
              private chatService: ChatService,
              private formBuilder: FormBuilder) {
    this.chatService.getMessages();
  }

  ngOnInit(): void {
    this.gebruikerService.getAllConectedGebruikers().subscribe(
      (gebruikers) => {
        this.gebruikers = gebruikers;
      },
      (error) => {
        console.error('Error fetching gebruikers:', error);
      }
    );
    this.stompService.subscribe((): void => {
      this.chatService.getMessages();
    })
    this.messageForm = this.formBuilder.group({
      message: ['', Validators.required] // 'message' is the form control name
    });
  }

  onChatClick(gebruiker: GebruikerInterface): void {
    this.gebruikerService.getGebruikerByEmail(gebruiker.email).subscribe(
      (gebruiker) => {
        this.selectedGebruiker = gebruiker;
      },
      (error) => {
        console.error('Error fetching gebruiker:', error);
      }
    );
  }

  onSubmit() {
    if (this.messageForm.valid) {
      const message = this.messageForm.value.message;

      this.stompService.send(message);

      this.messageForm.reset();
    }
  }

}
