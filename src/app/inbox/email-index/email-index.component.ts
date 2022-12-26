import { Component, Input } from '@angular/core';
import { EmailService } from '../email.service';

interface EmailSummary {
  id: string;
  from: string;
  subject: string;
}
@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.css']
})
export class EmailIndexComponent {
  @Input() emails: EmailSummary[]
  constructor(private emailService: EmailService) { }

  ngOnInit() {
    this.emailService.getEmails().subscribe((emails) => this.emails = emails)
  }
}
