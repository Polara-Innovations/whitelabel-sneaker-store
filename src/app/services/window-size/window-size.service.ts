// window-size.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';

export enum ScreenSize {
  XS = 'xs',   // < 576px
  SM = 'sm',   // >= 576px
  MD = 'md',   // >= 768px
  LG = 'lg',   // >= 992px
  XL = 'xl',   // >= 1200px
  XXL = 'xxl'  // >= 1400px
}

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {
  private screenSizeSubject = new BehaviorSubject<ScreenSize>(this.getScreenSize());
  screenSize$ = this.screenSizeSubject.asObservable();
  
  private widthSubject = new BehaviorSubject<number>(window.innerWidth);
  width$ = this.widthSubject.asObservable();
  
  private heightSubject = new BehaviorSubject<number>(window.innerHeight);
  height$ = this.heightSubject.asObservable();
  
  private isMobileSubject = new BehaviorSubject<boolean>(window.innerWidth < 768);
  isMobile$ = this.isMobileSubject.asObservable();

  constructor() {
    this.setupResizeListener();
  }

  private setupResizeListener(): void {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(100),
        startWith(null)
      )
      .subscribe(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const screenSize = this.getScreenSize();
        const isMobile = width < 768;
        
        this.widthSubject.next(width);
        this.heightSubject.next(height);
        this.screenSizeSubject.next(screenSize);
        this.isMobileSubject.next(isMobile);
      });
  }

  private getScreenSize(): ScreenSize {
    const width = window.innerWidth;
    
    if (width < 576) return ScreenSize.XS;
    if (width < 768) return ScreenSize.SM;
    if (width < 992) return ScreenSize.MD;
    if (width < 1200) return ScreenSize.LG;
    if (width < 1400) return ScreenSize.XL;
    return ScreenSize.XXL;
  }

  isMobile(): boolean {
    return window.innerWidth < 768;
  }

  isTablet(): boolean {
    const width = window.innerWidth;
    return width >= 768 && width < 992;
  }

  isDesktop(): boolean {
    return window.innerWidth >= 992;
  }

  getContainerWidth(containerSelector: string): number {
    const container = document.querySelector(containerSelector);
    return container ? container.clientWidth : window.innerWidth;
  }

  calculateItemsPerRow(containerWidth: number, itemWidth: number, gap: number): number {
    // Subtrai uma margem de segurança para evitar overflow
    const safetyMargin = 10;
    const availableWidth = containerWidth - safetyMargin;
    
    // Calcula o espaço total ocupado por um item (incluindo o gap)
    const itemTotalWidth = itemWidth + gap;
    
    // Calcula quantos itens cabem
    const itemsPerRow = Math.floor(availableWidth / itemTotalWidth);
    
    // Garante que pelo menos 1 item será exibido
    return Math.max(1, itemsPerRow);
  }
}