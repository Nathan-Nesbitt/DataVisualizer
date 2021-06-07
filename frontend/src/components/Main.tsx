/* eslint-disable no-use-before-define */
import React from 'react';

import Graph from './Graph';
import MultipleDropdown from './MultipleDropdown';

type Data = {
    y: string,
    x: Date
}[];

function get_data(value: string, location: string): Promise<{ id: string, data: Data }> {

    return fetch(location)
        .then(response => {
            if (!response.ok)
                throw new Error(response.statusText)
            return response.json() as Promise<Data>;
        }).then(new_data => {
            return { id: value, data: new_data }
        })
}

const Main = () => {

    const [data, setData] = React.useState<{ id: string, data: Data }>();
    const [serialNumber, setSerialNumber] = React.useState<string>();

    function update_graph(serial_number: string, device_id?: string) {

        var location, value;

        if (device_id) {
            value = device_id
            location = `api/limited_data?device_id=${device_id}&serial_number=${serial_number}`
        }
        else {
            location = `api/limited_data?serial_number=${serial_number}`
            value = serial_number
        }

        console.log(value, location)

        get_data(value, location)
            .then(result => {
                setData(result)
                console.log(result)
            })
            .catch(err => {
                console.log(err)
            })
    }

    function set_parent(value: string) {
        console.log(value)
        setSerialNumber(value);
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <div style={{ width: "95vw", height: "500px" }}>
                {data ? <Graph data={[data]} />
                    : null}
            </div>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
                <div style={{ padding: "10px" }}>
                    <MultipleDropdown title="Serial Number" location="/api/serial_nums" updateGraph={update_graph} setParentState={set_parent} />
                </div>
                {serialNumber ? <div style={{ padding: "10px" }}>
                    <MultipleDropdown title="Device ID's" location="/api/device_ids" updateGraph={update_graph} parentState={serialNumber} />
                </div> : null}
            </div>
        </div>
    )
}

export default Main;