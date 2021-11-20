import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-video',
  templateUrl: './youtube-video.component.html',
  styleUrls: ['./youtube-video.component.scss'],
})
export class YoutubeVideoComponent implements OnInit {
  @Input() url: string | null = null;

  safeUrl!: SafeUrl | null;

  constructor(private sanintizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.url) this.safeUrl = this.sanitize(this.url);
    else this.safeUrl = null
  }

  sanitize(url: string) {
    return this.sanintizer.bypassSecurityTrustResourceUrl(url);
  }
}
