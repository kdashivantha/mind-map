import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MindMapNode } from '../models/mindmapnode';
import * as uuidv1 from 'uuid/v1';
import { BackupService } from 'src/app/services/backup.service';



const TREE_DATA: MindMapNode[] = [
    {
      id: uuidv1(),
      name: 'Fruit',
      children: [
        {
          id: uuidv1(),
          name: 'Apple'
        },
        {
          id: uuidv1(),
          name: 'Banana'
        },
        {
          id: uuidv1(),
          name: 'Fruit loops'
        },
      ]
    }, {
      id: uuidv1(),
      name: 'Vegetables',
      children: [
        {
          id: uuidv1(),
          name: 'Green',
          children: [
            {
              id: uuidv1(),
              name: 'Broccoli'
            },
            {
              id: uuidv1(),
              name: 'Brussel sprouts'
            },
          ]
        }, {
          id: uuidv1(),
          name: 'Orange',
          children: [
            {
              id: uuidv1(),
              name: 'Pumpkins'
            },
            {
              id: uuidv1(),
              name: 'Carrots'
            },
          ]
        },
      ]
    },
  ];

  
@Injectable({
    providedIn: 'root',
  })
export class MindMapDataService {
    public DataChange = new BehaviorSubject<MindMapNode[]>([]);

    get data(): MindMapNode[] { return this.DataChange.value; }

    constructor( private BackupService:BackupService) {
        this.initialize();

        this.DataChange.subscribe(data=>{
          debugger;
          this.BackupService.WriteToLocalStorage(data);
        });
    }

    initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = TREE_DATA;

    // Notify the change.
    this.DataChange.next(data);

    }

    /** Add an item to to-do list */
    insertItem(parent: MindMapNode, name: string): MindMapNode {
        if (!parent.children) {
        parent.children = [];
        }
        const newItem = { id: uuidv1(), name: name } as MindMapNode;
        parent.children.push(newItem);
        this.DataChange.next(this.data);
        return newItem;
    }

    insertItemAbove(node: MindMapNode, name: string): MindMapNode {
        const parentNode = this.getParentFromNodes(node);
        const newItem = { id: uuidv1(), name: name } as MindMapNode;
        if (parentNode != null) {
        parentNode.children.splice(parentNode.children.indexOf(node), 0, newItem);
        } else {
        this.data.splice(this.data.indexOf(node), 0, newItem);
        }
        this.DataChange.next(this.data);
        return newItem;
    }

    insertItemBelow(node: MindMapNode, name: string): MindMapNode {
        const parentNode = this.getParentFromNodes(node);
        const newItem = { id: uuidv1(), name: name } as MindMapNode;
        if (parentNode != null) {
        parentNode.children.splice(parentNode.children.indexOf(node) + 1, 0, newItem);
        } else {
        this.data.splice(this.data.indexOf(node) + 1, 0, newItem);
        }
        this.DataChange.next(this.data);
        return newItem;
    }

    getParentFromNodes(node: MindMapNode): MindMapNode {
        for (let i = 0; i < this.data.length; ++i) {
        const currentRoot = this.data[i];
        const parent = this.getParent(currentRoot, node);
        if (parent != null) {
            return parent;
        }
        }
        return null;
    }

    getParent(currentRoot: MindMapNode, node: MindMapNode): MindMapNode {
        if (currentRoot.children && currentRoot.children.length > 0) {
        for (let i = 0; i < currentRoot.children.length; ++i) {
            const child = currentRoot.children[i];
            if (child === node) {
            return currentRoot;
            } else if (child.children && child.children.length > 0) {
            const parent = this.getParent(child, node);
            if (parent != null) {
                return parent;
            }
            }
        }
        }
        return null;
    }

    updateItem(node: MindMapNode, name: string) {
        node.name = name;
        this.DataChange.next(this.data);
    }

    deleteItem(node: MindMapNode) {
        this.deleteNode(this.data, node);
        this.DataChange.next(this.data);
    }

    copyPasteItem(from: MindMapNode, to: MindMapNode): MindMapNode {
        const newItem = this.insertItem(to, from.name);
        if (from.children) {
        from.children.forEach(child => {
            this.copyPasteItem(child, newItem);
        });
        }
        return newItem;
    }

    copyPasteItemAbove(from: MindMapNode, to: MindMapNode): MindMapNode {
        const newItem = this.insertItemAbove(to, from.name);
        if (from.children) {
        from.children.forEach(child => {
            this.copyPasteItem(child, newItem);
        });
        }
        return newItem;
    }

    copyPasteItemBelow(from: MindMapNode, to: MindMapNode): MindMapNode {
        const newItem = this.insertItemBelow(to, from.name);
        if (from.children) {
        from.children.forEach(child => {
            this.copyPasteItem(child, newItem);
        });
        }
        return newItem;
    }

    deleteNode(nodes: MindMapNode[], nodeToDelete: MindMapNode) {
        const index = nodes.indexOf(nodeToDelete, 0);
        if (index > -1) {
        nodes.splice(index, 1);
        } else {
        nodes.forEach(node => {
            if (node.children && node.children.length > 0) {
            this.deleteNode(node.children, nodeToDelete);
            }
        });
        }
    }
}