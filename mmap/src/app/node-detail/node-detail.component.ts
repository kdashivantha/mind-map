import { Component, OnInit, NgZone, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { CdkDragMove, CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-node-detail',
  templateUrl: './node-detail.component.html',
  styleUrls: ['./node-detail.component.scss']
})
export class NodeDetailComponent implements OnInit {

  constructor(
    private ngZone: NgZone,
    private renderer: Renderer2) { }

  //https://jfcere.github.io/ngx-markdown/
  
  ngOnInit() {
  }

  @ViewChild("detailContent", { static: false }) DetailContainer: ElementRef;

  /**
   * drag resizer
   */
  private DetailContainerPreviousPositionX:number = 0;
  public DetailContainerFreeDragPosition = {x: 0, y: 0};
  /**
   * ListView Container resize 
   * @param  {CdkDragMove} e
   */
  public onResizeDetailContainer(e: CdkDragMove) {
      this.ngZone.runOutsideAngular(() => {

      const ListViewContainerRect = this.DetailContainer.nativeElement.getBoundingClientRect();
      let s= e.source.getFreeDragPosition();
      let diff = s.x - this.DetailContainerPreviousPositionX;

      this.renderer.setStyle(this.DetailContainer.nativeElement, 'width', `${ListViewContainerRect.width-diff}px`);

      this.DetailContainerFreeDragPosition = {x: 0, y: 0};
      this.DetailContainerPreviousPositionX = s.x;

      });
  }
  public onResizeDetailContainerDragEnded(e:CdkDragEnd){
      this.DetailContainerPreviousPositionX = 0;
  }




  markdown = `## Markdown __rulez__!
---

### Syntax highlight
\`\`\`typescript
const language = 'typescript';
\`\`\`

### Lists
1. Ordered list
2. Another bullet point
  - Unordered list
  - Another unordered bullet point

### Blockquote
> Blockquote to the max`;

}
