import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[mobSelectOnFocus]'
})
export class SelectOnFocusDirective {
  constructor(private el: ElementRef) { }

  // TODO Can focus in be prevented??
  // focusin because it bubbles (focus does not)
  // https://developer.mozilla.org/en-US/docs/Web/Events/focusin
  @HostListener('focusin') onClick() {
    this.findElement().select();
  }

  private findElement(): HTMLInputElement {
    if (/^(?:INPUT|TEXTAREA)$/.test(this.el.nativeElement.tagName)) {
      return this.el.nativeElement;
    } else {
      return this.el.nativeElement.querySelector('INPUT,TEXTAREA');
    }
  }
}
