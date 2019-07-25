import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {

  @Input() data: Array<number>;
  // tslint:disable-next-line: no-input-rename
  @Input('type') type: string;
  // tslint:disable-next-line: no-input-rename
  @Input('line-color') lineColor: string;
  // tslint:disable-next-line: no-input-rename
  @Input('margin-left') marginLeft: number;
  // tslint:disable-next-line: no-input-rename
  @Input('chart-vertical-text') verticalText: string;

  constructor() { }

  private height = 300;
  private margin =  {
    top: 20,
    right: 30,
    bottom: 30,
    left: 30
  };

  ngOnInit() {
    this.drawSvgLineChart();
  }

  private drawSvgLineChart(): void {
    this.margin.left = this.marginLeft ? this.marginLeft : this.margin.left;
    const svg = d3.select(`.${this.type}`)
      .select('svg')
      .attr('width', '100%')
      .attr('height', this.height);

    const g = svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    const elem = d3.select('.line-chart-svg').node();

    const x = d3.scaleTime()
      .rangeRound([0, elem.getBoundingClientRect().width]);

    const y = d3.scaleLinear()
      .rangeRound([(this.height - this.margin.bottom - this.margin.top), 0]);

    const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.value));

    x.domain(d3.extent(this.data, d => d.date));
    y.domain(d3.extent(this.data, d => d.value));

    g.append('g')
      .attr('transform', `translate(0, ${this.height - this.margin.top - this.margin.bottom})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('transform', `translate(0, 0)`)
      .call(d3.axisLeft(y))
      .append('text')
      .attr('fill', '#000')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text(this.verticalText ? this.verticalText : '');

    g.append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', this.lineColor ? this.lineColor : 'black')
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  }
}
