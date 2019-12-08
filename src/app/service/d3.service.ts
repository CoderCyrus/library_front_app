import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { Systemtree } from '../model/systemtree.model';
import { Circle } from '../model/circle.model';
@Injectable()
export class D3Service {
    width: number = 975;
    radius: number = 487.5;
    
    circle : Circle[] = [
        { cx: 100, cy: 100 , r: 100},
        { cx: 200, cy: 220 , r: 200},
        { cx: 50, cy: 50 , r: 50}
      ];

    // first(systemtrees: Systemtree[]) {
    //     d3.select("svg").append("g")
    //     .attr("fill-opacity", 0.6)
    //     .selectAll("path")
    //     .data(systemtrees)
    //     .enter().append("path")
    //     .attr("fill", d => { while (d.id_node > 1) d = d.parent; return color(d.data.name); })
    //     .attr("d", arc)
    //   .append("title")
    //     .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
    // }

    // partition(systemtrees: Systemtree[]) {
    //     d3.partition()
    //     .size([2 * Math.PI, this.radius])(d3.hierarchy(systemtrees).sum(d => d.)
    //     .sort((a, b) => b.value - a.value))

    drawCircle() {
        d3.select("svg").append("g").selectAll("circle")
        .data(this.circle)
        .enter()
        .append("circle")
        .attr("cx", function(d) {return d.cx})
        .attr("cy", function(d) {return d.cy})
        .attr("r", function(d) {return d.r})
        .style("fill", "red");
    }

    
}
