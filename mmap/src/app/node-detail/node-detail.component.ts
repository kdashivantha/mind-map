import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-node-detail',
  templateUrl: './node-detail.component.html',
  styleUrls: ['./node-detail.component.scss']
})
export class NodeDetailComponent implements OnInit {

  constructor() { }

  //https://jfcere.github.io/ngx-markdown/
  
  ngOnInit() {
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
