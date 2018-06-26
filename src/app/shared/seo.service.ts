import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable()
export class SeoService {

  constructor(private meta: Meta, private router: Router) { }

  generateTags(config) {
    // default values
    config = {
      title: 'TSV Willsbach - Handball',
      description: 'Homepage der Handballabteilung des TSV Willsbach',
      image: 'https://willsbach-handball.de/assets/images/handball_willsbach.png',
      images: [
        'https://willsbach-handball.de/assets/images/tsv_willsbach.png'
      ],
      slug: '',
      ...config
    };
    config.slug = this.router.url;

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

    if (config.images.length > 0) {
      config.images.forEach(element => {
        this.meta.addTag({ property: 'og:image', content: element });
      });
    }
  }
}
