import { Component, OnInit } from '@angular/core';
import { SystemtreeService } from '../service/systemtree.service';


import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3 from 'd3';
import * as d3Hierarchy from 'd3-hierarchy';
import { AbstractTreeNode } from '../model/abstractTreeNode.model';
import { Systemtree } from '../model/systemtree.model';
import { Metric } from '../model/metric.model';
import { HttpData } from '../model/httpData.model';
import { D3Service } from '../service/d3.service';
import { D3Service2 } from '../service/d3_2.service';




@Component({
    selector: 'systemtree',
    templateUrl: './systemtree.component.html',
    styleUrls: ['./systemtree.component.css']
})


export class SystemtreeComponent implements OnInit {

    // list of systemtree
    systemtrees : AbstractTreeNode[];

    constructor(private systemtreeService: SystemtreeService, private d3Service: D3Service,
        private d3Service2: D3Service2) { }
    
    async getSystemtree() {
        return await this.systemtreeService.getSystemtree().toPromise().then((data) => { 
            this.systemtrees = HttpData.toSingleList(data.listSystems, data.listMetrics) 
        });                   
    }

    onKey() {
    }

    async ngOnInit() {
        await this.getSystemtree();
        // console.log(this.systemtrees);
        this.d3Service2.drawSunburst(this.systemtrees);
    }

}
