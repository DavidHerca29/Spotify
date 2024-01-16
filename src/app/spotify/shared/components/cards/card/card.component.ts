import { Component, Input } from '@angular/core';
import { LazyImageComponent } from "../../lazy-image/lazy-image.component";

@Component({
    selector: 'gifs-card',
    standalone: true,
    templateUrl: './card.component.html',
    imports: [LazyImageComponent]
})
export class CardComponent {
  @Input()
  public elements!: string;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(!this.elements) throw new Error('GIF is required');
  }

}
