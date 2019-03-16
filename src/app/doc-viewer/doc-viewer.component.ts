import { Component, ComponentRef, DoCheck, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { DocumentService, DocumentContents } from '../documents/document.service';
import { tap, switchMap } from 'rxjs/operators';
import { filter } from 'rxjs/operators';

// Coding from: https://github.com/ReactiveX/rxjs/blob/master/docs_app/src/app/layout/doc-viewer/doc-viewer.component.ts

// Constants
export const NO_ANIMATIONS = 'no-animations';

// Initialization prevents flicker once pre-rendering is on
const initialDocViewerContent = '<p></p>';

@Component({
  selector: 'app-doc-viewer',
  //  templateUrl: './doc-viewer.component.html',
  template: '',
  styleUrls: ['./doc-viewer.component.scss']
})

export class DocViewerComponent implements DoCheck, OnDestroy {
  // Enable/Disable view transition animations.
  static animationsEnabled = true;

  private hostElement: HTMLElement;

  private void$ = of<void>(undefined);
  private onDestroy$ = new EventEmitter<void>();

  protected embeddedComponentRefs: ComponentRef<any>[] = [];
  protected currViewContainer: HTMLElement = document.createElement('div');
  protected nextViewContainer: HTMLElement = document.createElement('div');


  constructor(
    elementRef: ElementRef,
    private titleService: Title,
    private metaService: Meta,
    router: Router,
    private documentService: DocumentService) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap((url: any) => this.render(url))
    ).subscribe();
    this.hostElement = elementRef.nativeElement;
    // Security: the initialDocViewerContent comes from the prerendered DOM and is considered to be secure
    this.hostElement.innerHTML = initialDocViewerContent;

    if (this.hostElement.firstElementChild) {
      this.currViewContainer = this.hostElement.firstElementChild as HTMLElement;
    }

  }

  ngDoCheck() {
    this.embeddedComponentRefs.forEach(comp => comp.changeDetectorRef.detectChanges());
  }

  ngOnDestroy() {
    this.onDestroy$.emit();
  }

  /**
   * Destroy the embedded components to avoid memory leaks.
   */
  protected destroyEmbeddedComponents(): void {
    this.embeddedComponentRefs.forEach(comp => comp.destroy());
    this.embeddedComponentRefs = [];
  }

  /**
   * Prepare for setting the window title and ToC.
   * Return a function to actually set them.
   */
  protected prepareTitleAndToc(targetElem: HTMLElement): () => void {
    const titleEl = targetElem.querySelector('h1');
    const hasToc = !!titleEl && !/no-?toc/i.test(titleEl.className);

    if (hasToc) {
      // tslint:disable-next-line:no-non-null-assertion
      titleEl!.insertAdjacentHTML('afterend', '<aio-toc class="embedded"></aio-toc>');
    }

    return () => {
      // this.tocService.reset();
      let title: string | null = '';

      // Only create ToC for docs with an `<h1>` heading.
      // If you don't want a ToC, add "no-toc" class to `<h1>`.
      if (titleEl) {
        title = (typeof titleEl.innerText === 'string') ? titleEl.innerText : titleEl.textContent;

        if (hasToc) {
          // this.tocService.genToc(targetElem, docId);
        }
      }

      this.titleService.setTitle(title ? `Angular - ${title}` : 'Angular');
    };
  }

  /**
   * Add doc content to host element and build it out with embedded components.
   */
  protected render(doc: any): Observable<void> {
    //  console.log("Render beeing called " + doc)
    this.documentService
      .getDocument(doc.url.replace(/^\//, ''))
      .subscribe(document => {

        // console.log("Render doc read " + JSON.stringify(document))
        this.nextViewContainer.innerHTML = document.contents || '';
        this.swapViews().subscribe(() => { });
      });
    return this.void$;
  }


  /**
   * Swap the views, removing `currViewContainer` and inserting `nextViewContainer`.
   * (At this point all content should be ready, including having loaded and instantiated embedded
   *  components.)
   *
   * Optionally, run a callback as soon as `nextViewContainer` has been inserted, but before the
   * entering animation has been completed. This is useful for work that needs to be done as soon as
   * the element has been attached to the DOM.
   */
  protected swapViews(onInsertedCb = () => { }): Observable<void> {

    //  this.currViewContainer = this.nextViewContainer;
    //   this.hostElement.appendChild(this.nextViewContainer);

    const raf$ = new Observable<void>(subscriber => {
      const rafId = requestAnimationFrame(() => {
        subscriber.next();
        subscriber.complete();
      });
      return () => cancelAnimationFrame(rafId);
    });

    // Get the actual transition duration (taking global styles into account).
    // According to the [CSSOM spec](https://drafts.csswg.org/cssom/#serializing-css-values),
    // `time` values should be returned in seconds.
    const getActualDuration = (elem: HTMLElement) => {
      const cssValue = getComputedStyle(elem).transitionDuration || '';
      const seconds = Number(cssValue.replace(/s$/, ''));
      return 1000 * seconds;
    };
    const animateProp =
      (elem: HTMLElement, prop: keyof CSSStyleDeclaration, from: string, to: string, duration = 200) => {
        const animationsDisabled = !DocViewerComponent.animationsEnabled
          || this.hostElement.classList.contains(NO_ANIMATIONS);
        if (prop === 'length' || prop === 'parentRule') {
          // We cannot animate length or parentRule properties because they are readonly
          return this.void$;
        }
        elem.style.transition = '';
        return animationsDisabled
          ? this.void$.pipe(tap(() => elem.style[prop] = to))
          : this.void$.pipe(
            // In order to ensure that the `from` value will be applied immediately (i.e.
            // without transition) and that the `to` value will be affected by the
            // `transition` style, we need to ensure an animation frame has passed between
            // setting each style.
            switchMap(() => raf$), tap(() => elem.style[prop] = from),
            switchMap(() => raf$), tap(() => elem.style.transition = `all ${duration}ms ease-in-out`),
            switchMap(() => raf$), tap(() => (elem.style as any)[prop] = to),
            switchMap(() => timer(getActualDuration(elem))), switchMap(() => this.void$),
          );
      };

    const animateLeave = (elem: HTMLElement) => animateProp(elem, 'opacity', '1', '0.1');
    const animateEnter = (elem: HTMLElement) => animateProp(elem, 'opacity', '0.1', '1');

    let done$ = this.void$;

    if (this.currViewContainer.parentElement) {
      done$ = done$.pipe(
        // Remove the current view from the viewer.
        switchMap(() => animateLeave(this.currViewContainer)),
        // tslint:disable-next-line:no-non-null-assertion
        tap(() => this.currViewContainer.parentElement!.removeChild(this.currViewContainer)),
      );
    }

    return done$
      // Insert the next view into the viewer.
      .pipe(
        tap(() => this.hostElement.appendChild(this.nextViewContainer)),
        tap(() => onInsertedCb()),
        switchMap(() => animateEnter(this.nextViewContainer)),
        tap(() => {
          const prevViewContainer = this.currViewContainer;
          this.currViewContainer = this.nextViewContainer;
          this.nextViewContainer = prevViewContainer;
          this.nextViewContainer.innerHTML = '';  // Empty to release memory.
        })
        //  .tap(() => this.docInserted.emit())
      );
  }
}
