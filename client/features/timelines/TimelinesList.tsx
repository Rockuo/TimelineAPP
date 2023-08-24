import * as React from 'react';
import {Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {setCurrentTimeline} from './timelineSlice';
import Button from "@mui/material/Button";


const Item = ({name, onClick}: {name: string, onClick: () => void}) => <Button variant="contained" color="primary" sx={{my: 1,p: 2}} onClick={onClick}>
    <Typography noWrap>{name}</Typography>
</Button>;

export default function TimelinesList()
{
    const timelines = useAppSelector(({timelines}) => timelines.timelines)
    const identifiers = useAppSelector(({timelines}) => timelines.timelinesOrder);
    const dispatch = useAppDispatch();

    return <Grid container direction={{xs: "column", md: "row"}} sx={{gap: 2}}>
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
}