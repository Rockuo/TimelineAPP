import * as React from 'react';
import {useAppSelector} from "../../app/hooks";
import TimelinesList from "./TimelinesList/TimelinesList";
import Timeline from "./Timeline/Timeline";


export default function TimelinesPage()
{
    const isTimelineSelected = useAppSelector(
        ({timelines}) => timelines.current !== undefined
    )

    return isTimelineSelected ? <Timeline/> : <TimelinesList/>
}