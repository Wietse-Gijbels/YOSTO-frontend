import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  public openSnackBar(
    message: string,
    type: 'success' | 'error' | 'warn',
    secondaryButton?: { name: string; action: () => void },
  ) {
    const duration = type === 'error' || secondaryButton ? 10000 : 2000;
    const config: MatSnackBarConfig = {
      panelClass: type,
      duration,
      verticalPosition: 'bottom',
    };
    this.snackBar
      .open(message, secondaryButton?.name || 'ok', config)
      .afterDismissed()
      .subscribe((snackbarDismiss) => {
        if (snackbarDismiss.dismissedByAction) secondaryButton?.action();
      });
  }
}
