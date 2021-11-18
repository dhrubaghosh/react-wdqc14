import * as React from 'react';
import * as ReactDOM from 'react-dom';
import internetGrowthData from './donut-series-data.json';
import { Chart, ChartTitle, ChartLegend, ChartArea, ChartTooltip, ChartSeries, ChartSeriesItem, ChartSeriesLabels } from '@progress/kendo-react-charts';
import 'hammerjs';

const labelContent = e => `${e.category}: \n ${e.value}%`;
const donutCenterRenderer = () => (
  <span>
    <h3>22.5%</h3> of which renewables
  </span>
);
const ChartContainer = () => {
  const mapSeries = (series, index, array) => <ChartSeriesItem type="donut" startAngle={150} name={series.name} data={series.data} field="value" categoryField="category" colorField="color">
        {index === array.length - 1 && <ChartSeriesLabels position="outsideEnd" background="none" content={labelContent} />}
      </ChartSeriesItem>;

  const renderTooltip = context => {
    const {
      category,
      series,
      value
    } = context.point || context;
    return <div>{category} ({series.name}): {value}%</div>;
  };

  return <Chart donutCenterRender={donutCenterRenderer}>
        <ChartTooltip render={renderTooltip} />
        <ChartTitle text="Share of Internet Population Growth" />
        <ChartLegend visible={false} />
        <ChartArea background="none" />
        <ChartSeries>
          {internetGrowthData.map(mapSeries)}
        </ChartSeries>
      </Chart>;
};

ReactDOM.render(<ChartContainer />, document.querySelector('my-app'));