import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { ThemeConfig } from '../../../models/theme-config-model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.css'],
  standalone: false
})
export class SettingsModalComponent implements OnInit, OnDestroy {
  @Input() isSettingsOpen: boolean = false;
  @Output() closeSettings = new EventEmitter<void>();

  selectedThemeType: string = 'light'; // Valor padrão
  availableThemes: { type: string }[] = [];
  
  private destroy$ = new Subject<void>();

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    // Monitorar o tipo de tema atual
    this.themeService.currentThemeType
      .pipe(takeUntil(this.destroy$))
      .subscribe(themeType => {
        this.selectedThemeType = themeType;
      });

    // Carregar temas disponíveis
    this.loadAvailableThemes();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Define o tipo de tema quando um toggle é acionado
   * @param themeType O tipo de tema a ser aplicado
   */
  setThemeType(themeType: string) {
    // Se o toggle for desativado, volta para o tema claro
    if (this.selectedThemeType === themeType) {
      this.selectedThemeType = 'light';
      this.themeService.changeTheme('light');
    } else {
      this.selectedThemeType = themeType;
      this.themeService.changeTheme(themeType);
    }
  }

  /**
   * Manipula a mudança de tema no dropdown
   */
  onThemeTypeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    const themeType = select.value;
    
    this.selectedThemeType = themeType;
    this.themeService.changeTheme(themeType);
  }

  close() {
    this.closeSettings.emit();
  }

  private loadAvailableThemes() {
    this.themeService.getAvailableThemes()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        themes => {
          // Agrupa temas por tipo para mostrar opções únicas
          const themeTypes = new Set<string>();
          
          this.availableThemes = themes
            .filter(theme => {
              // Só adiciona se este tipo de tema ainda não foi incluído
              if (!themeTypes.has(theme.type)) {
                themeTypes.add(theme.type);
                return true;
              }
              return false;
            })
            .map(theme => ({
              type: theme.type
            }));
        },
        error => {
          console.error('Erro ao carregar temas disponíveis:', error);
        }
      );
  }
}