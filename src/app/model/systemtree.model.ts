import { AbstractTreeNode } from './abstractTreeNode.model';
import { StaticInfo } from './staticInfo.model';

export class Systemtree extends AbstractTreeNode {

    instance_name: string;
    has_static: boolean;
    has_metrics: boolean;
    listStaticInfo: StaticInfo[];

    constructor(jsonData: any) {
        super(jsonData.id_node, jsonData.id_parent, jsonData.name, -1);
        this.instance_name = jsonData.instance_name;
        this.has_static = jsonData.has_static;
        this.has_metrics = jsonData.has_metrics;
        this.listStaticInfo = jsonData.listStaticInfo;
    }
}