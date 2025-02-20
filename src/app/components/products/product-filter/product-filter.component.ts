import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  standalone: false,
  selector: "app-product-filter",
  templateUrl: "./product-filter.component.html",
  styleUrls: ["./product-filter.component.css"],
})
export class ProductFilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<any>();

  filterForm: FormGroup;

  categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Books" },
    { id: 4, name: "Home & Garden" },
    { id: 5, name: "Sports" }
  ];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      minPrice: [0],
      maxPrice: [1000],
      inStock: [false],
      categories: [[]]
    });
  }

  ngOnInit() {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(filters => {
        this.filterChange.emit(filters);
      });
  }

  onCategoryChange(event: any, categoryId: number) {
    const categories = [...(this.filterForm.get("categories")?.value || [])];
    if (event.target.checked) {
      categories.push(categoryId);
    } else {
      const index = categories.indexOf(categoryId);
      if (index > -1) {
        categories.splice(index, 1);
      }
    }
    this.filterForm.patchValue({ categories });
  }

  resetFilters() {
    this.filterForm.reset({
      minPrice: 0,
      maxPrice: 1000,
      inStock: false,
      categories: []
    });
  }

  applyFilters() {
    this.filterChange.emit(this.filterForm.value);
  }
}
