import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';

interface User { id: number; name: string; code: string; role: string; }

@Component({
  selector: 'app-student-search',
  imports: [FormsModule, TranslateModule],
  templateUrl: './student-search.component.html',
  styleUrl: './student-search.component.css'
})
export class StudentSearchComponent {
  private http = inject(HttpClient);

  searchTerm = '';
  allUsers   = signal<User[]>([]);
  results    = signal<User[]>([]);

  constructor() {
    this.http.get<User[]>(
      `${environment.platformProviderApiBaseUrl}${environment.platformProviderUsersEndpointPath}`
    ).subscribe({
      next:  users => this.allUsers.set(users),
      error: ()    => this.allUsers.set([])
    });
  }

  onSearch(): void {
    const q = this.searchTerm.trim().toLowerCase();
    if (q.length < 2) { this.results.set([]); return; }
    this.results.set(
      this.allUsers().filter(u =>
        u.name.toLowerCase().includes(q) || u.code.toLowerCase().includes(q)
      )
    );
  }

  clearSearch(): void { this.searchTerm = ''; this.results.set([]); }
}
