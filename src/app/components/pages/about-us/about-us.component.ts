import { Component, OnInit } from '@angular/core';
import { AboutUsData } from '../../../models/about-us.model';
import { ThemeService } from '../../../services/theme/theme.service';
import { Observable } from 'rxjs';
import { ThemeConfig } from '../../../models/theme-config-model';
import { AboutUsService } from '../../../services/api/about-us/about-us.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  standalone: false
})
export class AboutUsComponent implements OnInit {
  aboutUsData: AboutUsData | null = null;
  currentTheme$: Observable<ThemeConfig | null>;

  constructor(
    private themeService: ThemeService,
    private aboutUsService: AboutUsService
  ) {
    this.currentTheme$ = this.themeService.currentTheme;
  }

  ngOnInit(): void {
    this.aboutUsService.getAboutUs().subscribe(data => {
      this.aboutUsData = data[0];
    });
  }
}