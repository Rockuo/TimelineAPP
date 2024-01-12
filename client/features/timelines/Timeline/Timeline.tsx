import * as React from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import MuiTimeline from '@mui/lab/Timeline/Timeline';
import TimelineItem from "./TimelineItem";
import TimelineMenu from "./TimelineMenu";
import {
    deleteTimelineItem,
    moveTimelineItemUp,
    addTimelineItemBellow,
    moveTimelineItemDown,
    editTimelineItem
} from "../timelinesSlice";
import EditTimelineItemForm from "./EditTimelineItemForm";
import {TimelineItemType} from "../timelineDefinitions";

export default function Timeline() {
    const timelineIdentifier = useAppSelector(({timelines}) => timelines.current)
    const timeline = useAppSelector(({timelines}) => timelineIdentifier && timelines.timelines[timelineIdentifier])
    const dispatch = useAppDispatch();

    const [timelineItem, selectTimelineItem] =
        React.useState<{
            anchor: HTMLElement,
            identifier: string,
        } | null>(null);
    const [action, setAction] = React.useState<'add' | 'edit' | null>(null)


    if (!timeline) {
        return 'Timeline NOT found';
    }
;


    const handleMenuClose = () => selectTimelineItem(null);
    const handleFormClose = () => {
        setAction(null);
        handleMenuClose();
    };

    const handleFormSave = (item: TimelineItemType) => {
        if (action === "add")
        {
            dispatch(addTimelineItemBellow({
                timeline: timelineIdentifier,
                after: timelineItem.identifier,
                item,
            }))
        }
        else if (action === "edit")
        {
            dispatch(editTimelineItem({
                timeline: timelineIdentifier,
                identifier: timelineItem.identifier,
                item,
            }))
        }
        handleFormClose();
    }

    const handleDelete = () => {
        const item = timelineItem.identifier;
        handleMenuClose();
        dispatch(deleteTimelineItem({timeline: timelineIdentifier, identifier: item}));
    }
    const handleMoveUp = () => {
        const item = timelineItem.identifier;
        handleMenuClose();
        dispatch(moveTimelineItemUp({timeline: timelineIdentifier, identifier: item}));
    }
    const handleMoveDown = () => {
        const item = timelineItem.identifier;
        handleMenuClose();
        dispatch(moveTimelineItemDown({timeline: timelineIdentifier, identifier: item}));
    }

    const selectedTimelineItem = timelineItem?.identifier ? timeline.items[timelineItem.identifier] : undefined

    return <>
        <MuiTimeline position={timeline.itemPosition}>
            {
                timeline.order.map((identifier) =>
                    <TimelineItem
                        key={identifier}
                        {...timeline.items[identifier]}
                        dateTimeFormat={timeline.dateTimeFormat}
                        onClick={(anchor: HTMLElement) => selectTimelineItem({anchor, identifier})}
                    />
                )
            }
            <TimelineMenu
                anchor={timelineItem?.anchor}
                onClose={handleMenuClose}
                onAdd={() => setAction('add')}
                onEdit={() => setAction('edit')}
                onMoveUp={timeline.order[0] === timelineItem?.identifier ? undefined : handleMoveUp}
                onMoveDown={timeline.order[timeline.order.length-1] === timelineItem?.identifier ? undefined : handleMoveDown}
                onDelete={handleDelete}
            />
            <EditTimelineItemForm
                open={!!action}
                timelineItem={action === 'edit' ? selectedTimelineItem : {
                    color: 'grey',
                    variant: 'filled',
                    ...(selectedTimelineItem ?? {}),
                    title: '',
                    description: '',
                }}
                onCancel={handleFormClose}
                onSave={handleFormSave}
            />
        </MuiTimeline>
    </>;
}