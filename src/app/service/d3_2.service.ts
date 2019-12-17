import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { AbstractTreeNode } from '../model/abstractTreeNode.model';
import { Systemtree } from '../model/systemtree.model';
import { Metric } from '../model/metric.model';

@Injectable()
export class D3Service2 {
    width = 900;
    radius = this.width / 6;
    red = "rgb(255,0,0)";
    green = "rgb(0,255,0)";
    grey = "rgb(110,110,110)";

    color(node: d3.HierarchyRectangularNode<AbstractTreeNode>): string {
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

    displayName(d: d3.HierarchyRectangularNode<AbstractTreeNode>): string {
        if (d.data instanceof Systemtree && d.data.instance_name != null) {
                return d.data.instance_name;
        } else { // Remove s_ or m_ at the beginning of the name
            let name = d.data.name;
            if (name.slice(0,2) === "s_" || name.slice(0, 2) === "m_") {
                return name.slice(2);
            } else {
                return name;
            }
        }
    }

    drawSunburst(table: AbstractTreeNode[]) {
        var format = d3.format(",d")
        var arc = d3.arc()
            .startAngle((d: any) => d.x0)
            .endAngle((d: any) => {return d.x1})
            .padAngle((d: any) => Math.min((d.x1 - d.x0) / 2, 0.005))
            .padRadius(this.radius * 1.5)
            .innerRadius((d: any) => d.y0 * this.radius )
            .outerRadius((d: any) => Math.max(d.y0 * this.radius, d.y1 * this.radius - 1));

        function arcVisible(d) {
            return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
        }

        function labelVisible(d) {
            return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
        }

        function labelTransform(d) {
            const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
            const y = (d.y0 + d.y1) / 2 * this.radius;
            return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        }

        // Create the hierarchy (tree)
        var hierarchy = d3.stratify()
            .id(function (d: AbstractTreeNode) { return d.id_node.toString() })
            .parentId(function (d: AbstractTreeNode) { if (d.id_parent == null) { return ""; } else { return d.id_parent.toString() } })
            (table)
            .count()
            .sort(function (a: d3.HierarchyNode<AbstractTreeNode>, b: d3.HierarchyNode<AbstractTreeNode>) { return (a.data.name <= b.data.name ? -1:1) });

        const root = d3.partition()
            .size([2 * Math.PI, hierarchy.height + 1])
            (hierarchy);

        // Add the number of issues for each system. If a metric state is unknown, it is handled as if there is an issue
        root.eachAfter((d: d3.HierarchyRectangularNode<AbstractTreeNode>) => {
            if (d.data instanceof Systemtree && d.children != []) { // system (internal node)
                d.data.nbIssues = d.children.reduce((sum, current) => sum + current.data.nbIssues, 0);
            } else { // metric (leaf)
                d.data.nbIssues = d.data.state == 1 ? 0 : 1;
            }
        })

        root.each((d: any) => d.current = d);

        // Callback used to zoom when the user clicks on a system
        function clicked(p: d3.HierarchyRectangularNode<AbstractTreeNode>) {
            parent.datum(p.parent || root);

            root.each((d: any) => d.target = {
                x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                y0: Math.max(0, d.y0 - p.depth),
                y1: Math.max(0, d.y1 - p.depth)
            });

            const t = g.transition().duration(750);

            // Transition the data on all arcs, even the ones that aren’t visible,
            // so that if this transition is interrupted, entering arcs will start
            // the next transition from the desired position.
            path.transition(t)
                .tween("data", (d: any) => {
                    const i = d3.interpolate(d.current, d.target);
                    return t => d.current = i(t);
                })
                .filter(<any>function (d: any) {
                    return +this.getAttribute("fill-opacity") || arcVisible(d.target);
                })
                .attr("fill-opacity", (d: any) => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
                .attrTween("d", (d:any) => () => arc(d.current));

            label.filter(<any>function (d) {
                return +this.getAttribute("fill-opacity") || labelVisible(d.target);
            }).transition(t)
                .attr("fill-opacity", (d: any) => +labelVisible(d.target))
                .attrTween("transform", (d: any) => () => labelTransform.bind(this)(d.current));
        }

        // Callback to display info about the system
        function mouseover(d:d3.HierarchyRectangularNode<AbstractTreeNode>) {
            d3.select("#pSystemInfo")
                .html(displaySystemInfo(d));
        }

        // Returns the formatted (for html) version of the info of d
        var displaySystemInfo = (d: d3.HierarchyRectangularNode<AbstractTreeNode>) => {
            let res = [];
            if (d.data instanceof Systemtree) {
                let data = <Systemtree> d.data;
                res.push(this.displayName(d) + " (System)");
                data.listStaticInfo.forEach((info) => (res.push(info.name + ": " + info.value)))
                res.push("nbIssues: " + data.nbIssues);
            } else { // Metric
                let data = <Metric> d.data;
                res.push(this.displayName(d) + " (Metric)");
                res.push("value: " + data.threshMax);
                res.push("threshMin: " + data.threshMin);
                res.push("threshMax: " + data.threshMax);
            }
            return res.join("<br />");
        }

        // Display the diagram
        const svg = d3.select("svg")
            .attr("viewBox", `0, 0, ${this.width}, ${this.width}`)
            .style("width", "100%")
            .style("font", "12px sans-serif");

        const g = svg.append("g")
            .attr("transform", `translate(${this.width / 2},${this.width / 2})`);

        const path = g.append("g")
            .selectAll("path")
            .data(root.descendants().slice(1))
            .join("path")
            .attr("fill", (d: d3.HierarchyRectangularNode<AbstractTreeNode>) => { return this.color(d); })
            .attr("fill-opacity", (d: any) => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
            .attr("d", (d: any) => arc(d.current));

        // Add callback to zoom when clicking on a system
        path.filter((d: any) => d.children)
            .style("cursor", "pointer")
            .on("click", clicked.bind(this))

        // Add callback to display system info when mouseover
        path.filter((d:any) => true)
            .on("mouseover", (d: d3.HierarchyRectangularNode<AbstractTreeNode>) => {mouseover(d)});

        path.append("title")
            .text((d: d3.HierarchyRectangularNode<AbstractTreeNode>) => {
                return `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.data.nbIssues)} issues`
            });

        const label = g.append("g")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
            .style("user-select", "none")
            .selectAll("text")
            .data(root.descendants().slice(1))
            .join("text")
            .attr("dy", "0.35em")
            .attr("fill-opacity", (d: any) => +labelVisible(d.current))
            .attr("transform", (d: any) => labelTransform.bind(this)(d.current))
            .text((d: d3.HierarchyRectangularNode<AbstractTreeNode>) => this.displayName(d))
                

        const parent = g.append("circle")
            .datum(root)
            .attr("r", this.radius)
            .attr("fill", "none")
            .attr("pointer-events", "all")
            .on("click", clicked.bind(this));
    }
}
