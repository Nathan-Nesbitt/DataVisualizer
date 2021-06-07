/* eslint-disable no-use-before-define */
import React, { FunctionComponent } from 'react';

import { ResponsiveLine } from '@nivo/line'

type Data = {
    y: string,
    x: Date
}[];

type GraphProps = {
    data: {
        id: string,
        data: Data
    }[]
};

/**
 * Basic graph object that displays data generated from the database.
 * 
 * Must be used in a div with defined hight and width.
 * 
 * @param data - Array of objects that contain x and y values. 
 * @returns ResponsiveLine object.
 */
const Graph: FunctionComponent<GraphProps> = ({ data }) => <ResponsiveLine
    data={data}
    margin={{ top: 30, right: 110, bottom: 135, left: 60 }}
    xScale={{
        type: 'time',
        format: '%Y-%m-%d %H:%M:%S',
        precision: 'second',
    }}
    yScale={{ type: 'linear', min: 'auto', max: 'auto', reverse: false }}
    yFormat=" >-.2f"
    xFormat="time:%Y-%m-%d"
    axisTop={null}
    axisRight={null}
    axisBottom={{
        format: "%b %d - %H:%M:%S",
        tickRotation: -90,
        legend: "Time",
        legendOffset: 130,
        legendPosition: 'middle'
    }}
    axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Wattage',
        legendOffset: -50,
        legendPosition: 'middle'
    }}
    pointSize={4}
    pointColor={{ theme: 'background' }}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
        {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1
                    }
                }
            ]
        }
    ]}
/>

export default Graph;