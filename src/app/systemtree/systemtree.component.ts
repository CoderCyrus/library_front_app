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
    
    async getSystemtree() {
        // this.systemtreeService.getSystemtree()
        // .subscribe((data: Systemtree[]) => {
         //   console.log
        //     this.systemtrees = data;
        // });  
        return await this.systemtreeService.getSystemtree().toPromise().then((data) => { this.systemtrees=data });
        
                  
    }

    onKey() {
    }

    async ngOnInit() {
        await this.getSystemtree();
        console.log(this.systemtrees);
         this.d3Service.drawSunburst(this.systemtrees);
        // const root = this.d3Service.createTree(this.systemtrees)
        // console.log(root);
     // this.d3Service.drawCircle();
    }

}
