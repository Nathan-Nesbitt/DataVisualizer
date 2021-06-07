/* eslint-disable no-use-before-define */
import React, { FunctionComponent } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useEffect } from 'react';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

type DropdownItem = {
    Serial_Number?: string,
    Device_ID?: string
}


/**
 * Requests the data for the dropdown. 
 * @param location - Where the dropdown api endpoint is
 * @returns array of dropdown items
 */
function get_data(location: string): Promise<DropdownItem[]> {

    return fetch(location)
        .then(response => {
            if (!response.ok)
                throw new Error(response.statusText)
            return response.json() as Promise<DropdownItem[]>;
        }).then(new_data => {
            return new_data;
        })
}

type MultipleDropdownProps = {
    title: string,
    location: string,
    updateGraph: (serial_number: string, device_id?: string) => void,
    setParentState?: (serial_number: string) => void,
    parentState?: string
}

/**
 * This is a dropdown with dependency of another dropdown. It can be used to 
 * selectively render and request data based on the previous dropdown.
 * 
 * @param title - Name of the component. Displays in dropdown
 * @param location - Where the API endpoint is to get the data for the component
 * @param updateGraph - Function to update the parent function. In this case a graph. 
 * @param setParentState - Function to update the value of the decedent element
 * @param parentState - Value provided by the predecessor of this element.
 * @returns FormControl dropdown element
 */
const MultipleDropdown: FunctionComponent<MultipleDropdownProps> = ({ title, location, updateGraph, setParentState, parentState }) => {

    const classes = useStyles();
    const [data, setData] = React.useState<DropdownItem[]>([{}]);
    const [dataSetTo, setdataSetTo] = React.useState("");
    const [loaded, setLoaded] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setdataSetTo(event.target.value as string);
        if (parentState) {
            updateGraph(parentState, event.target.value as string)
        }
        else if (setParentState) {
            setParentState(event.target.value as string);
            updateGraph(event.target.value as string)
        }
    };

    useEffect(() => {
        if (!loaded)
            get_data(location)
                .then((result) => {
                    setData(result)
                    setLoaded(true)
                })
    })

    // This handles the case that only parentState changes, as we don't always 
    // want to run. 
    useEffect(() => {
        get_data(location + "?serial_number=" + parentState)
            .then((result) => {
                setData(result)
                setLoaded(true)
            })
    }, [parentState])

    return <div>
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">{title}</InputLabel>
            <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={dataSetTo}
                onChange={handleChange}
            >
                {data.map((val, index) =>
                    val.Serial_Number ? < MenuItem key={index} value={val.Serial_Number} > {val.Serial_Number}</MenuItem>
                        : < MenuItem key={index} value={val.Device_ID} > {val.Device_ID}</MenuItem>
                )}
            </Select>
            <FormHelperText>Select a {title}</FormHelperText>
        </FormControl>
    </div >
}
export default MultipleDropdown;