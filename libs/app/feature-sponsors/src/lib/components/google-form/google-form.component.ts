import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'speak-out-google-form',
  templateUrl: './google-form.component.html',
  styleUrls: ['./google-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleFormComponent implements OnInit {
  @Input() url: string | null = null;

  safeUrl!: SafeUrl;

  constructor(private sanintizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.url) this.safeUrl = this.sanitize(this.url);
  }

  sanitize(url: string) {
    return this.sanintizer.bypassSecurityTrustResourceUrl(url);
  }
}
