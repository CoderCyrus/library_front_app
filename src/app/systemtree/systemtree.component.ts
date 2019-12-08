import { Component, OnInit } from '@angular/core';
import { SystemtreeService } from '../service/systemtree.service';
import { Systemtree } from '../model/systemtree.model';


import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3 from 'd3';
import * as d3Hierarchy from 'd3-hierarchy';
import { StaticInfo } from '../model/staticInfo.model';
import { Metric } from '../model/metric.model';
import { D3Service } from '../service/d3.service';



@Component({
    selector: 'systemtree',
    templateUrl: './systemtree.component.html',
    styleUrls: ['./systemtree.component.css']
})


export class SystemtreeComponent implements OnInit {

    // list of systemtree
    systemtrees : Systemtree[];

    constructor(private systemtreeService: SystemtreeService, private d3Service: D3Service) { 
    }
    
    getSystemtree(){
        this.systemtreeService.getSystemtree()
        .subscribe((data: Systemtree[]) => {
            this.systemtrees = data;
            console.log(data);
        });            
    }

    onKey() {
    }

    ngOnInit() {
     this.getSystemtree();
     this.d3Service.drawCircle();
    }

}
