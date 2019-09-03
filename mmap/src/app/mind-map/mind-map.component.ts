import { Component, OnInit } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';

interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussel sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];

@Component({
  selector: 'app-mind-map',
  templateUrl: './mind-map.component.html',
  styleUrls: ['./mind-map.component.scss']
})
export class MindMapComponent implements OnInit {

  ngOnInit() {
  }

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;

  //sample
  // /https://stackblitz.com/edit/angular-draggable-mat-tree

  //icons
  //https://github.com/timmy3131/knowledge-map

  //https://www.npmjs.com/package/leader-line
  //sample
  //https://stackblitz.com/edit/angular-woohoo-leader-line-aun2bx
}
