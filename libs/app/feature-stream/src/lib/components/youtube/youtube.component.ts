import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'speak-out-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.scss']
})
export class YoutubeComponent implements OnInit {
  @Input() id = '';

  posterUrl?: string;

  static addPrefetch(kind: string, url: string, as?: string) {
    const linkEl = document.createElement('link');
    linkEl.rel = kind;
    linkEl.href = url;
    if (as) {
      linkEl.as = as;
    }
    document.head.append(linkEl);
  }

  constructor(readonly elRef: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    if (!this.elRef.nativeElement.style.backgroundImage) {

      this.posterUrl = `https://i.ytimg.com/vi/${this.id}/hqdefault.jpg`
      YoutubeComponent.addPrefetch('preload', this.posterUrl, 'image');

      this.elRef.nativeElement.style.backgroundImage = `url("${this.posterUrl}")`;
    }
  }

}
