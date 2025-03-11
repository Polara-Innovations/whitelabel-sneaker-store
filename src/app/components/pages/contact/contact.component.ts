import { Component, OnInit } from '@angular/core';
import { TextService } from '../../../services/api/text/text.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: false
})
export class ContactComponent implements OnInit {
  texts: any;

  constructor(private textService: TextService) {}

  ngOnInit(): void {
    this.textService.loadTextConfig().subscribe(config => {
      this.texts = config.contact;
    });
  }
}