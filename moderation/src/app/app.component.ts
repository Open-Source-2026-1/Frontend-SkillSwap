import { Component } from '@angular/core';
import { LayoutComponent } from './shared/presentation/components/layout/layout.component';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  template: `<app-layout/>`,
  styles: []
})
export class AppComponent {}
