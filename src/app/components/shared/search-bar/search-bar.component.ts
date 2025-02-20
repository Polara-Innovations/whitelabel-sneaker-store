import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { BehaviorSubject, Observable, of } from "rxjs";

interface SearchSuggestion {
  name: string;
  category: string;
}

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements OnInit {
  searchControl = new FormControl("");
  isFocused = false;
  showSuggestions = false;
  showNoResults = false;
  suggestions: SearchSuggestion[] = [];
  private searchResults$ = new BehaviorSubject<SearchSuggestion[]>([]);

  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string | null) => this.search(term || ""))
    ).subscribe(results => {
      this.suggestions = results;
      this.showNoResults = Boolean(this.searchControl.value && results.length === 0);
      this.showSuggestions = results.length > 0;
    });
  }

  onFocus() {
    this.isFocused = true;
    if (this.searchControl.value) {
      this.showSuggestions = true;
    }
  }

  onBlur() {
    this.isFocused = false;
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  clearSearch() {
    this.searchControl.setValue("");
    this.showSuggestions = false;
    this.showNoResults = false;
  }

  selectSuggestion(suggestion: SearchSuggestion) {
    this.searchControl.setValue(suggestion.name);
    this.showSuggestions = false;
  }

  private search(term: string): Observable<SearchSuggestion[]> {
    if (!term) {
      return of([]);
    }

    const mockResults: SearchSuggestion[] = [
      { name: "Wireless Headphones", category: "Electronics" },
      { name: "Wireless Charger", category: "Accessories" },
      { name: "Wireless Mouse", category: "Computers" }
    ].filter(item =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );

    return of(mockResults);
  }
}