import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {DateTime} from "luxon";
import {DateTimeFormat, Timeline, TimelineItemsPosition, TimelineItemType, TimelinesState} from "./timelineDefinitions";


// Define the initial state using that type
const initialState: TimelinesState = {
    current: undefined,
    timelines: {
        'example': {
            name: 'Example',
            dateTimeFormat: 'dateTime',
            itemPosition: 'right',
            items: {
                'plain': {title: 'Plain', variant: 'outlined', color: "grey"},
                'color': {title: 'Colored', variant: 'filled', color: "success"},
                'icon': {title: 'Icon', variant: 'filled', icon: "Laptop", color: "primary"},
                'outlined': {title: 'Outlined', variant: 'outlined', icon: "FastFood", color: "primary"},
                'description': {title: 'Description', variant: 'outlined', icon: "FastFood", description: "With this description", color: "primary"},
                'withTime': {title: 'With Time', variant: 'outlined', icon: "FastFood", description: "With this description", color: "primary", time: DateTime.now().toSeconds()},
            },
            order: ['plain', 'color', 'icon', 'outlined', 'description', 'withTime']
        },
    },
    timelinesOrder: ['example']
}

const createIdentifier = () => DateTime.now().toMillis().toString();

export const timelinesSlice = createSlice({
    name: 'timelines',
    initialState: initialState,
    reducers: {
        addTimeline : {
            reducer: (state, action: PayloadAction<Timeline>) => {
                const identifier = createIdentifier();
                state.timelinesOrder.push(identifier);
                state.timelines = {...state.timelines, [identifier]: action.payload};
            },
            prepare: (
                name: string,
                itemPosition: TimelineItemsPosition,
                dateTimeFormat: DateTimeFormat
            ): { payload: Timeline } => {
                const identifier = createIdentifier();
                return {
                    payload: {
                        name,
                        itemPosition,
                        dateTimeFormat,
                        items: {
                            [identifier]: {
                                title: 'First',
                                variant: 'filled',
                                color: 'grey'
                            }
                        },
                        order: [identifier],
                    }
                };
            }
        },
        removeTimeline: (state, action: PayloadAction<string>) =>
        {
            state.timelinesOrder = state.timelinesOrder.filter((identifier) => identifier !== action.payload)
            delete state.timelines[action.payload];
        },
        setCurrentTimeline: (state, action: PayloadAction<string|undefined>) =>
        {
            state.current = action.payload
        },
        addTimelineItemBellow: (
            state,
            action: PayloadAction<{timeline: string, after: string, item: TimelineItemType}>
        ) => {
            let timeline = state.timelines[action.payload.timeline]
            const identifier = createIdentifier();
            timeline.items[identifier] = action.payload.item;
            const index = timeline.order.indexOf(action.payload.after);
            timeline.order = [
                ...timeline.order.slice(0, index +1),
                identifier,
                ...timeline.order.slice(index + 1)
            ]
            state.timelines[action.payload.timeline] = timeline;
        },
        editTimelineItem: (
            state,
            action: PayloadAction<{timeline: string, identifier: string, item: TimelineItemType}>
        ) => {
            let timeline = state.timelines[action.payload.timeline]
            timeline.items[action.payload.identifier] = action.payload.item;
            state.timelines[action.payload.timeline] = timeline;
        },
        deleteTimelineItem: (
            state,
            action: PayloadAction<{timeline: string, identifier: string}>
        ) => {
            let timeline = state.timelines[action.payload.timeline]
            delete timeline.items[action.payload.identifier];
            timeline.order = timeline.order.filter((i) => i !== action.payload.identifier)
            state.timelines[action.payload.timeline] = timeline;
        },
        moveTimelineItemUp: (
            state,
            action: PayloadAction<{timeline: string, identifier: string}>
        ) => {
            let timeline = state.timelines[action.payload.timeline]
            const index = timeline.order.indexOf(action.payload.identifier);
            if (index <= 0) return state;
            [timeline.order[index], timeline.order[index - 1]] = [timeline.order[index - 1], timeline.order[index]];
            state.timelines[action.payload.timeline] = timeline;
        },
        moveTimelineItemDown: (
            state,
            action: PayloadAction<{timeline: string, identifier: string}>
        ) => {
            let timeline = state.timelines[action.payload.timeline]
            const index = timeline.order.indexOf(action.payload.identifier);
            if ((index + 1) >= timeline.order.length) return state;

            [timeline.order[index], timeline.order[index + 1]] = [timeline.order[index + 1], timeline.order[index]];
            state.timelines[action.payload.timeline] = timeline;
        }
    }
})

// Action creators are generated for each case reducer function
export const {
    removeTimeline,
    addTimeline,
    setCurrentTimeline,
    addTimelineItemBellow,
    editTimelineItem,
    deleteTimelineItem,
    moveTimelineItemUp,
    moveTimelineItemDown,
} = timelinesSlice.actions
export default timelinesSlice.reducer