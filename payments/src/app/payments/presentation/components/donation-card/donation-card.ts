import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Donation } from '../../../domain/model/donation.entity';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Output, EventEmitter } from '@angular/core';
import { DecimalPipe, SlicePipe } from '@angular/common';
import { MatDivider } from '@angular/material/list';

@Component({
  selector: 'app-donation-card',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    DecimalPipe,
    MatDivider,
    SlicePipe,
  ],
  templateUrl: './donation-card.html',
  styleUrl: './donation-card.css',
})
export class DonationCard {
  @Input() donation!: Donation;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onEdit() {
    this.edit.emit(this.donation.id);
  }

  onDelete() {
    this.delete.emit(this.donation.id);
  }
}
