import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly http = inject(HttpClient);
  accountNumber = '';
  accountName = '';
  statementPeriod = '';
  selectedFile: File | null = null;
  busy = false;
  error = '';
  result: unknown = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
    this.error = '';
    this.result = null;
  }

  submit(): void {
    if (!this.selectedFile) {
      this.error = 'Choose a statement file to continue.';
      return;
    }
    if (this.selectedFile.size > 20 * 1024 * 1024) {
      this.error = 'The file must be 20 MB or smaller.';
      return;
    }

    const payload = new FormData();
    payload.append('expectedAccount', this.accountNumber.trim());
    payload.append('expectedOwner', this.accountName.trim());
    payload.append('expectedPeriod', this.statementPeriod.trim());
    payload.append('file', this.selectedFile);

    this.busy = true;
    this.error = '';
    this.result = null;
    this.http.post('/api/validate', payload).subscribe({
      next: (response) => { this.result = response; this.busy = false; },
      error: (failure) => {
        this.error = failure.error?.error ?? 'Could not reach the statement service. Check that the Spring Boot API is running.';
        this.busy = false;
      },
    });
  }
}
