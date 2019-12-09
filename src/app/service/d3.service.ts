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

    drawSunburst(table: Systemtree[]) {
        const width = 800;
        const radius = width / 2;
        var color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, 6));

        const root = d3.partition()
            .size([2 * Math.PI, radius])
            (d3.stratify()
                .id(function(d: Systemtree) { return d.id_node.toString()})
                .parentId(function(d: Systemtree) { if(d.id_parent == null) {return "";} else {return d.id_parent.toString()}})
                (table)
                .sum(function(d: Systemtree) { return d.value})
                .sort(function(a, b) {return (b.value - a.value)}));
        
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
            .attr("fill", (d:d3.HierarchyRectangularNode<Systemtree>) => { while (d.depth > 1) d = d.parent; return color(d.data.system_name); })
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
            .text((d:d3.HierarchyRectangularNode<Systemtree>) => d.data.system_name); 

        function autoBox() {
            const {x, y, width, height} = this.getBBox();
            //console.log(x,y,width,height);
            return [x, y, width, height];
        };

        svg.attr("viewBox", <any>autoBox);

    }
    
    

    
}
