import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: false
})
export class FooterComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
  }
}