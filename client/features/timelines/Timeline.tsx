import * as React from 'react';
import {Typography} from "@mui/material";
import {useAppSelector} from '../../app/hooks';
import MuiTimeline from '@mui/lab/Timeline/Timeline';
import TimelineItem from '@mui/lab/TimelineItem/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator/TimelineSeparator';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent/TimelineOppositeContent';
import TimelineConnector from '@mui/lab/TimelineConnector/TimelineConnector';
import TimelineDot from '@mui/lab/TimelineDot/TimelineDot';
import TimelineContent from '@mui/lab/TimelineContent/TimelineContent';
import {icons} from "./TimelineItemIcons";
import {DateTime} from "luxon";




export default function Timeline()
{
    const timeline = useAppSelector(({timelines}) => timelines.current && timelines.timelines[timelines.current])

    // todo
    if (!timeline)
    {
        return 'todo tabs/pages';
    }

    return  <MuiTimeline position="alternate">
        {
            timeline.order.map((identifier) => {
                const item = timeline.items[identifier];
                const Icon = item.icon && icons[item.icon];
                return <TimelineItem key={identifier}>
                    {
                        item.time && <TimelineOppositeContent
                            sx={{ m: 'auto 0' }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                        >
                            {DateTime.fromMillis(Number(item.time)).toLocaleString(timeline.dateTimeFormat)}
                        </TimelineOppositeContent>
                    }
                    <TimelineSeparator>
                        <TimelineConnector />
                        <TimelineDot color={item.color} variant={item.variant}>
                            {Icon && <Icon/>}
                        </TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: item.description ? '12px' : '24px', px: 2 }}>
                        <Typography variant="h6" component="span">
                            {item.title}
                        </Typography>
                        {item.description && <Typography>{item.description}</Typography>}
                    </TimelineContent>
                </TimelineItem>
            })
        }
    </MuiTimeline>;
}