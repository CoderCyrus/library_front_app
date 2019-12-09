import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { Circle } from '../model/circle.model';

@Component({
    selector: 'click',
    templateUrl: './click.component.html',
    styleUrls: ['./click.component.css']
})


export class ClickComponent implements OnInit {

    constructor() { }

    creatCircle(event : any){

      var circleRadii = [50, 20, 10];

        d3.select(event.target)
                       .data(circleRadii)
                       .enter()
                       .append("circle");

         d3.select("circle")
                   .attr("cx", 80)
                   .attr("cy", 50)
                   .attr("r", function (d: any) { return d;})
                   .style("fill", function(d) {
                   var returnColor;
                   if (d === 50) { returnColor = "green";
            } else if (d === 20) { returnColor = "purple";
            } else if (d === 10) { returnColor = "red"; }
              return returnColor;
            });

    }

 clickCircle(event: any){                        
          d3.select(event.target).append("circle")
                                 .attr("cx", event.offsetX)
                                 .attr("cy", event.offsetY)
                                 .attr("r", 25)
                                 .style("fill", "red");}

    onKey(event: any) {

    }

    ngOnInit() {
    }
}
