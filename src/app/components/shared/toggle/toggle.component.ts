import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css'],
  standalone: false
})
export class ToggleComponent {
  @Input() isChecked: boolean = false;
  @Output() toggleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  toggle() {
    this.isChecked = !this.isChecked;
    this.toggleChange.emit(this.isChecked);
  }
}