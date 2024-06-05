import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-feedback-popup',
  templateUrl: './feedback-popup.component.html',
  styleUrls: ['./feedback-popup.component.scss'],
  standalone: true,
  imports: [CommonModule, MatDialogModule]
})
export class FeedbackPopupComponent {
  showFeedbackForm = false;
  contentRating = 0;
  attitudeRating = 0;
  overallRating = 0;
  responseTime: boolean | null = null;
  clarity: boolean | null = null;
  answered: boolean | null = null;

  constructor(public dialogRef: MatDialogRef<FeedbackPopupComponent>) {}

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
      overallRating: this.overallRating
    };
    console.log('Feedback:', feedback);
    this.dialogRef.close('submitFeedback');
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
