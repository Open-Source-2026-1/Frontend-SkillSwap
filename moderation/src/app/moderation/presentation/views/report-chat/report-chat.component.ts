import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';
import { ModerationStoreService } from '../../../application/moderation-store.service';

interface Message {
  id: number;
  reportedUserId: number;
  senderId: number;
  message: string;
  sentAt: string;
}

@Component({
  selector: 'app-report-chat',
  imports: [TranslateModule],
  templateUrl: './report-chat.component.html',
  styleUrl: './report-chat.component.css'
})
export class ReportChatComponent {
  private route   = inject(ActivatedRoute);
  readonly router = inject(Router);
  private http    = inject(HttpClient);
  private store   = inject(ModerationStoreService);

  userId      = signal<number>(0);
  tutorId     = signal<number>(0);
  studentId   = signal<number>(0);
  caseDate    = signal<string>('');
  messages    = signal<Message[]>([]);

  constructor() {
    this.route.params.subscribe(params => {
      const id = params['userId'] ? +params['userId'] : 0;
      this.userId.set(id);

      // Buscar el reporte vinculado para obtener reporterUserId y reportedUserId
      const report = this.store.reports().find(r => r.reportedUserId === id);
      if (report) {
        this.tutorId.set(report.reporterUserId);   // quien reportó = tutor
        this.studentId.set(report.reportedUserId); // quien fue reportado = estudiante
        this.caseDate.set(report.getFormattedCreatedAt());
      } else {
        this.tutorId.set(id + 100);   // fallback distinto
        this.studentId.set(id);
        this.caseDate.set(new Date().toLocaleString('es-PE'));
      }

      this.http.get<Message[]>(
        `${environment.platformProviderApiBaseUrl}/messages?reportedUserId=${id}`
      ).subscribe({
        next:  msgs => this.messages.set(msgs),
        error: ()   => this.messages.set([])
      });
    });
  }
}
