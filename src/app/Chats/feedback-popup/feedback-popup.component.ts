import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { GebruikerService } from '../../common/service/gebruiker.service';
import { ChatService } from '../../common/service/chat.service';

@Component({
  selector: 'app-feedback-popup',
  templateUrl: './feedback-popup.component.html',
  styleUrls: ['./feedback-popup.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule],
})
export class FeedbackPopupComponent {
  showFeedbackForm = false;
  contentRating = 0;
  attitudeRating = 0;
  overallRating = 0;
  responseTime: boolean | null = null;
  clarity: boolean | null = null;
  answered: boolean | null = null;

  constructor(
    public dialogRef: MatDialogRef<FeedbackPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string; chatId: string }, // Inject dialog data
    private gebruikerService: GebruikerService,
    private chatService: ChatService,
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitFeedback(): void {
    const feedback = {
      contentRating: this.contentRating,
      attitudeRating: this.attitudeRating,
      responseTime: this.responseTime,
      clarity: this.clarity,
      answered: this.answered,
      overallRating: this.overallRating,
    };
    const xp = this.calculateXp(feedback);
    this.chatService.sluitChatRoom(this.data.chatId).subscribe(() => {
      this.gebruikerService
        .addGebruikerXp(this.data.userId, xp)
        .subscribe(() => {
          this.dialogRef.close('submitFeedback');
        });
    });
  }

  calculateXp(feedback: any): number {
    let xp = 0;

    // Calculate XP based on ratings (assuming max 5 stars)
    xp += feedback.contentRating * 10; // Each star gives 10 XP
    xp += feedback.attitudeRating * 10;
    xp += feedback.overallRating * 20;

    // Additional XP for positive feedback
    if (feedback.responseTime === false) xp += 10; // Quick response gives 10 XP
    if (feedback.clarity === true) xp += 10; // Clear information gives 10 XP
    if (feedback.answered === true) xp += 10; // All questions answered gives 10 XP

    // Penalty for negative feedback
    if (feedback.responseTime === true) xp -= 5; // Slow response reduces 5 XP
    if (feedback.clarity === false) xp -= 5; // Unclear information reduces 5 XP
    if (feedback.answered === false) xp -= 5; // Unanswered questions reduce 5 XP

    return Math.max(xp, 0); // Ensure XP is not negative
  }

  [key: string]: any; // Add index signature

  openFeedbackForm(): void {
    this.showFeedbackForm = true;
  }

  setRating(type: string, value: number): void {
    this[type] = value;
  }

  setResponseTime(value: boolean): void {
    this.responseTime = value;
  }

  setClarity(value: boolean): void {
    this.clarity = value;
  }

  setAnswered(value: boolean): void {
    this.answered = value;
  }

  isSelected(option: boolean | null, value: boolean): boolean {
    return option === value;
  }
}
