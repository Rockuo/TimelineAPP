import * as React from 'react';

import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {setCurrentTimeline} from '../timelinesSlice';
import Box from "@mui/material/Box";
import AddTimeline from "./AddTimeline";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";


const Item = ({name, onClick}: {name: string, onClick: () => void}) =>
    <Paper
        elevation={2}
        sx={{my: 1,p: 2, cursor: 'pointer', minWidth:'30%', }}
        onClick={onClick}
    >
        <Typography noWrap align="center">{name}</Typography>
    </Paper>
;

export default function TimelinesList()
{
    const timelines = useAppSelector(({timelines}) => timelines.timelines)
    const identifiers = useAppSelector(({timelines}) => timelines.timelinesOrder);
    const dispatch = useAppDispatch();

    return <Box>
        <Grid container direction={{xs: "column", md: "row"}} sx={{columnGap: 1}}>
            {/*todo dNd*/}
            {identifiers.map(
                (identifier) => <Item
                    key={identifier}
                    name={timelines[identifier].name}
                    onClick={() => {
                        dispatch(setCurrentTimeline(identifier))
                    }}
                />
            )}
        </Grid>
       <AddTimeline/>
    </Box>
}