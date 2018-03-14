import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable()
export class SeoService {

  constructor(private meta: Meta) { }

  generateTags(config) {
    // default values
    config = {
      title: 'TSV Willsbach - Handball',
      description: 'Homepage der Handballabteilung des TSV Willsbach',
      image: 'https://willsbach-handball.de/assets/images/handball_willsbach.png',
      slug: ''
    }

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@willsbach_hndbl' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Willsbach Handball' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image });
    this.meta.updateTag({ property: 'og:url', content: `https://willsbach-handball.de/${config.slug}` });
  }

}
