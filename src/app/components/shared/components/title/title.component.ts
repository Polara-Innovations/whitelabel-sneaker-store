import { Component, Input } from '@angular/core';

type TitleSize = "small" | "medium" | "large" | "extra-large";
type TitlePosition = "left" | "center" | "right";
type FontWeight = "light" | "normal" | "bold";

@Component({
  standalone: false,
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {
  @Input() text: string = ''; 
  @Input() size: TitleSize = 'medium'; 
  @Input() position: TitlePosition = 'center';
  @Input() icon?: string; 
  @Input() fontWeight: FontWeight = 'normal'; 
}