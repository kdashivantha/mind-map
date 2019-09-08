import { Component, OnInit, OnDestroy } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MindMapNode } from './models/mindmapnode';
import { Subscription } from 'rxjs';
import { MindMapDataService } from './services/mindmapdata.service';
import { SelectionModel } from '@angular/cdk/collections';



@Component({
  selector: 'app-mind-map',
  templateUrl: './mind-map.component.html',
  styleUrls: ['./mind-map.component.scss']
})
export class MindMapComponent implements OnInit, OnDestroy {

  private subscription:Subscription =  new Subscription();
  /** A selected parent node to be inserted */
  selectedParent: MindMapNode | null = null;

  

  treeControl = new NestedTreeControl<MindMapNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MindMapNode>();
  /** The selection for checklist */
  SelectionModel = new SelectionModel<MindMapNode>(false /* single */);

  hasChild = (_: number, node: MindMapNode) => !!node.children && node.children.length > 0;
  //getLevel = (node: MindMapNode) => node.level;
  //isExpandable = (node: MindMapNode) => node.expandable;
  getChildren = (node: MindMapNode): MindMapNode[] => node.children;
  hasNoContent = (_: number, _nodeData: MindMapNode) => _nodeData.name === '';

  constructor( private mindMapDataService: MindMapDataService) {

  }

  

  ngOnInit() {
    this.subscription.add(
      this.mindMapDataService.DataChange.subscribe(data => {
        this.dataSource.data = [];
        this.dataSource.data = data;
      }
    ));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  //sample
  // /https://stackblitz.com/edit/angular-draggable-mat-tree

  //icons
  //https://github.com/timmy3131/knowledge-map

  //https://www.npmjs.com/package/leader-line
  //sample
  //https://stackblitz.com/edit/angular-woohoo-leader-line-aun2bx


  //markdown editor
  //https://codepen.io/cusx/pen/mJNKre
  //https://github.com/dimpu/ngx-md

  /** Whether all the descendants of the node are selected */
  descendantsAllSelected(node: MindMapNode): boolean {
    // const descendants = this.treeControl.getDescendants(node);
    // return descendants.every(child => this.SelectionModel.isSelected(child));
    return false;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: MindMapNode): boolean {
    // const descendants = this.treeControl.getDescendants(node);
    // const result = descendants.some(child => this.SelectionModel.isSelected(child));
    // return result && !this.descendantsAllSelected(node);
    return false;
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: MindMapNode): void {
    // this.SelectionModel.toggle(node);
    // const descendants = this.treeControl.getDescendants(node);
    // this.SelectionModel.isSelected(node)
    //   ? this.SelectionModel.select(...descendants)
    //   : this.SelectionModel.deselect(...descendants);
  }

  /** Select the category so we can insert the new item. */
  addNewItem(node: MindMapNode) {
    //const parentNode = this.flatNodeMap.get(node);
    this.mindMapDataService.insertItem(node, '');
    this.treeControl.expand(node);
  }

  /** Save the node to database */
  saveNode(node: MindMapNode, itemValue: string) {
    //const nestedNode = this.flatNodeMap.get(node);
    this.mindMapDataService.updateItem(node, itemValue);
  }

  handleDragStart(event, node) {
    // Required by Firefox (https://stackoverflow.com/questions/19055264/why-doesnt-html5-drag-and-drop-work-in-firefox)
    // event.dataTransfer.setData('foo', 'bar');
    // event.dataTransfer.setDragImage(this.emptyItem.nativeElement, 0, 0);
    // this.dragNode = node;
    // this.treeControl.collapse(node);
  }

  handleDragOver(event, node) {
    // event.preventDefault();

    // // Handle node expand
    // if (node === this.dragNodeExpandOverNode) {
    //   if (this.dragNode !== node && !this.treeControl.isExpanded(node)) {
    //     if ((new Date().getTime() - this.dragNodeExpandOverTime) > this.dragNodeExpandOverWaitTimeMs) {
    //       this.treeControl.expand(node);
    //     }
    //   }
    // } else {
    //   this.dragNodeExpandOverNode = node;
    //   this.dragNodeExpandOverTime = new Date().getTime();
    // }

    // // Handle drag area
    // const percentageX = event.offsetX / event.target.clientWidth;
    // const percentageY = event.offsetY / event.target.clientHeight;
    // if (percentageY < 0.25) {
    //   this.dragNodeExpandOverArea = 'above';
    // } else if (percentageY > 0.75) {
    //   this.dragNodeExpandOverArea = 'below';
    // } else {
    //   this.dragNodeExpandOverArea = 'center';
    // }
  }

  handleDrop(event, node) {
    // event.preventDefault();
    // if (node !== this.dragNode) {
    //   let newItem: TodoItemNode;
    //   if (this.dragNodeExpandOverArea === 'above') {
    //     newItem = this.database.copyPasteItemAbove(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
    //   } else if (this.dragNodeExpandOverArea === 'below') {
    //     newItem = this.database.copyPasteItemBelow(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
    //   } else {
    //     newItem = this.database.copyPasteItem(this.flatNodeMap.get(this.dragNode), this.flatNodeMap.get(node));
    //   }
    //   this.database.deleteItem(this.flatNodeMap.get(this.dragNode));
    //   this.treeControl.expandDescendants(this.nestedNodeMap.get(newItem));
    // }
    // this.dragNode = null;
    // this.dragNodeExpandOverNode = null;
    // this.dragNodeExpandOverTime = 0;
  }

  handleDragEnd(event) {
    // this.dragNode = null;
    // this.dragNodeExpandOverNode = null;
    // this.dragNodeExpandOverTime = 0;
  }
}
