import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'page-pricing',
  imports: [],
  templateUrl: './pricing-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPage implements OnInit {

  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    //console.log(this.platform)
    //console.log(isPlatformBrowser(this.platform));
    /*if(isPlatformBrowser(this.platform)) {
      document.title = 'Princing Page';
    };*/
    this.title.setTitle('Princing Page');
    this.meta.updateTag({ name: 'description', content: 'Este es mi Princing Page' });
    this.meta.updateTag({ name: 'og:title', content: 'Princing Page' });
    this.meta.updateTag({ name: 'keywords', content: 'Hola,Mundo,Richard,Mazo,Curso,Angular,Pro' });
  }

}
