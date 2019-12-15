import { AbstractTreeNode } from './abstractTreeNode.model';
import { Timestamp } from 'rxjs';

export class Metric extends AbstractTreeNode {
    value: number;
    last_checked: Timestamp<string>;
    threshMin: number;
    threshMax: number;
    res1: number;
    res2: number;
    state: number;

    constructor(jsonData: any) {
        super(jsonData.id_node, jsonData.id_parent, jsonData.name, jsonData.state);
        this.value = jsonData.value;
        this.last_checked = jsonData.last_checked;
        this.threshMin = jsonData.threshMin;
        this.threshMax = jsonData.threshMax;
        this.res1 = jsonData.res1;
        this.res2 = jsonData.res2;
    }
}