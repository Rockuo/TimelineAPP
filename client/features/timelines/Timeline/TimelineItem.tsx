
import MuiTimelineItem from '@mui/lab/TimelineItem/TimelineItem';
import {DateTimeFormat, dateTimeFormats, TimelineItemType} from "../timelineSlice";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent/TimelineOppositeContent";
import {DateTime} from "luxon";
import TimelineSeparator from "@mui/lab/TimelineSeparator/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector/TimelineConnector";
import TimelineDot from "@mui/lab/TimelineDot/TimelineDot";
import TimelineContent from "@mui/lab/TimelineContent/TimelineContent";
import {Typography} from "@mui/material";
import * as React from "react";
import {icons} from "../TimelineItemIcons";

export default function TimelineItem(
    {
        icon,
        title,
        description,
        time,
        variant,
        color,
        dateTimeFormat,
        onClick
    }: TimelineItemType & {
        dateTimeFormat: DateTimeFormat,
        onClick: (anchor: HTMLElement) => void
    }
) {
    const Icon = icon && icons[icon];
    return <MuiTimelineItem
        onClick={(e) => onClick(e.currentTarget)}
        sx={{
            // ':hover': {
            //     bgcolor: 'success.main',
            // },
        }}
    >
        {
            time && <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align="right"
                variant="body2"
                color="text.secondary"
            >
                {DateTime.fromMillis(Number(time)).toLocaleString(dateTimeFormats[dateTimeFormat])}
            </TimelineOppositeContent>
        }
        <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color={color} variant={variant}>
                {Icon && <Icon/>}
            </TimelineDot>
            <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: description ? '12px' : '24px', px: 2 }}>
            <Typography variant="h6" component="span">
                {title}
            </Typography>
            {description && <Typography>{description}</Typography>}
        </TimelineContent>
    </MuiTimelineItem>
}