import * as React from 'react';
import {useAppSelector} from '../../../app/hooks';
import MuiTimeline from '@mui/lab/Timeline/Timeline';
import TimelineItem from "./TimelineItem";
import TimelineMenu from "./TimelineMenu";

export default function Timeline() {
    const timeline = useAppSelector(({timelines}) => timelines.current && timelines.timelines[timelines.current])
    const [timelineItem, selectTimelineItem] =
        React.useState<{
            anchor: HTMLElement,
            identifier: string
        } | null>(null);

    if (!timeline) {
        return 'Timeline NOT found';
    }

    const handleMenuClose = () => {
        selectTimelineItem(null);
    }

    return <>
        <MuiTimeline position="alternate">
            {
                timeline.order.map((identifier) =>
                    <TimelineItem
                        key={identifier}
                        {...timeline.items[identifier]}
                        dateTimeFormat={timeline.dateTimeFormat}
                        onClick={(anchor) => selectTimelineItem({anchor, identifier})}
                    />
                )
            }
            <TimelineMenu
                anchor={timelineItem?.anchor}
                onClose={handleMenuClose}
                onAddAbove={handleMenuClose}
                onAddBellow={handleMenuClose}
                onEdit={handleMenuClose}
            />
        </MuiTimeline>
    </>;
}