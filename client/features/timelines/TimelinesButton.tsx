import {useAppDispatch} from "../../app/hooks";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {setCurrentTimeline} from "./timelinesSlice";

export default function TimelinesButton({onClick}: {onClick: () => void})
{
    const dispatch = useAppDispatch();

    return <Typography
        variant="h6"
        component="a"
        sx={{flexGrow: 1, cursor: 'pointer'}}
        onClick={() => {
            dispatch(setCurrentTimeline(undefined))
            onClick();
        }}
    >
        Timeline
    </Typography>
}