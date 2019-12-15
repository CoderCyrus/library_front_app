import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { AbstractTreeNode } from '../model/abstractTreeNode.model';
import { Systemtree } from '../model/systemtree.model';

@Injectable()
export class D3Service {
    width: number = 975;
    radius: number = 487.5;
    red = "rgb(255,0,0)";
    green = "rgb(0,255,0)";
    grey = "rgb(110,110,110)";

    /* circle : Circle[] = [
        { cx: 100, cy: 100 , r: 100},
        { cx: 200, cy: 220 , r: 200},
        { cx: 50, cy: 50 , r: 50}
      ];

    drawCircle() {
        d3.select("svg").append("g").selectAll("circle")
        .data(this.circle)
        .enter()
        .append("circle")
        .attr("cx", function(d) {return d.cx})
        .attr("cy", function(d) {return d.cy})
        .attr("r", function(d) {return d.r})
        .style("fill", "red");
    } */

    color(node: d3.HierarchyRectangularNode<AbstractTreeNode>): string {
        console.log(node.data instanceof Systemtree);
        if (node.data instanceof Systemtree) {
            return node.data.nbIssues === 0 ? this.green : this.red;
        } else { // instanceof Metric
            switch (node.data.state) {
                case 0: { return this.red }
                case 1: { return this.green }
                case 2: { return this.red }
                default: { return this.grey } // typically -1
            }
        }
    }

    drawSunburst(table: AbstractTreeNode[]) {
        const width = 800;
        const radius = width / 2;

        // Create the hirearchy (tree)
        const root = d3.partition()
            .size([2 * Math.PI, radius])
            (d3.stratify()
                .id(function(d: AbstractTreeNode) { return d.id_node.toString() })
                .parentId(function(d: AbstractTreeNode) { if(d.id_parent == null) {return "";} else {return d.id_parent.toString()} })
                (table)
                .sum(function(d: AbstractTreeNode) { return 1 })
                .sort(function(a: d3.HierarchyNode<AbstractTreeNode>, b: d3.HierarchyNode<AbstractTreeNode>) { return (b.value - a.value) }));
        
        // Add the number of issues for each system. If a matric state is unknown, it is as if there is an issue
        root.eachAfter((d:d3.HierarchyRectangularNode<AbstractTreeNode>) => {
            if (d.data instanceof Systemtree && d.children != []) { // system (internal node)
                d.data.nbIssues = d.children.reduce((sum, current) => sum + current.data.nbIssues, 0);
            } else { // metric (leaf)
                d.data.nbIssues = d.data.state == 1 ? 0 : 1;
            }
        })

        console.log(root);
                
        var arc = d3.arc()
            .startAngle((d:any) => d.x0)
            .endAngle((d:any) => d.x1)
            .padAngle((d:any) => Math.min((d.x1 - d.x0) / 2, 0.005))
            .padRadius(radius / 2)
            .innerRadius((d:any) => d.y0)
            .outerRadius((d:any) => d.y1-1);
        
        var svg = d3.select("svg")
            .style("max-width", "65%")
            .style("height", "auto")
            .style("font", "10px sans-serif")
            .style("margin", "5px");

        svg.append("g")
            .attr("fill-opacity", 0.6)
            .selectAll("path")
            .data(root.descendants().filter(d => d.depth))
            .enter().append("path")
            .attr("fill", (d:d3.HierarchyRectangularNode<AbstractTreeNode>) => { /* while (d.depth > 1) d = d.parent; */ return this.color(d); })
            .attr('d', <any>arc)
            .append("title");

        svg.append("g")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
          .selectAll("text")
          .data(root.descendants().filter(d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10))
          .enter().append("text")
            .attr("transform", function(d) {
              const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
              const y = (d.y0 + d.y1) / 2;
              return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
            })
            .attr("dy", "0.35em")
            .text((d:d3.HierarchyRectangularNode<AbstractTreeNode>) => d.data.name); 

        function autoBox() {
            const {x, y, width, height} = this.getBBox();
            console.log(x,y,width,height);
            return [x, y, width, height];
        };

        svg.attr("viewBox", <any>autoBox);

    }
    
    

    
}
