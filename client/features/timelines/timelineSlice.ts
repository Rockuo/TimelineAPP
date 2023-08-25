import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {DateTime} from "luxon";
import {IconsEnum} from "./TimelineItemIcons";

interface TimelinesState {
    current?: string;
    timelines: Record<string, Timeline>
    timelinesOrder: Array<string>
}

export type TimelineItemsPosition = 'alternate-reverse' | 'alternate' | 'left' | 'right';
export const timelineItemsPositions: Array<TimelineItemsPosition> = [
    'alternate-reverse', 'alternate',
    'left', 'right'
]

type DateTimeFormats = {
    date: Intl.DateTimeFormatOptions
    time: Intl.DateTimeFormatOptions
    dateTime: Intl.DateTimeFormatOptions
    year: Intl.DateTimeFormatOptions
    day: Intl.DateTimeFormatOptions
};
export const dateTimeFormats: DateTimeFormats = {
    date: DateTime.DATE_SHORT,
    time: DateTime.TIME_24_SIMPLE,
    dateTime: DateTime.DATETIME_SHORT,
    year: {year: 'numeric'},
    day: {weekday: 'long'},

};

export type DateTimeFormat = keyof DateTimeFormats;

interface Timeline {
    name: string
    itemPosition: TimelineItemsPosition,
    dateTimeFormat: DateTimeFormat,
    items: Record<string, TimelineItemType>
    order: Array<string>
}

export interface TimelineItemType {
    icon?: IconsEnum,
    time?: number, // timestamp
    title: string
    description?: string
    variant: 'filled'|'outlined',
    color: 'inherit' | 'grey' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
}

// Define the initial state using that type
const initialState: TimelinesState = {
    current: undefined,
    timelines: {
        'example': {
            name: 'Example',
            dateTimeFormat: 'dateTime',
            itemPosition: 'alternate',
            items: {
                'plain': {title: 'Plain', variant: 'filled', color: "grey"},
                'color': {title: 'Colored', variant: 'filled', color: "primary"},
                'icon': {title: 'Icon', variant: 'filled', icon: "Laptop", color: "primary"},
                'outlined': {title: 'Outlined', variant: 'outlined', icon: "FastFood", color: "primary"},
                'description': {title: 'Description', variant: 'outlined', icon: "FastFood", description: "With this description", color: "primary"},
            },
            order: ['plain', 'color', 'icon', 'outlined', 'description']
        },
    },
    timelinesOrder: ['example']
}

export const timelinesSlice = createSlice({
    name: 'timelines',
    initialState: initialState,
    reducers: {
        addTimeline : {
            reducer: (state, action: PayloadAction<Timeline>) => {
                const identifier = DateTime.now().toMillis().toString();
                state.timelinesOrder.push(identifier);
                state.timelines = {...state.timelines, [identifier]: action.payload};
            },
            prepare: (
                name: string,
                itemPosition: TimelineItemsPosition,
                dateTimeFormat: DateTimeFormat
            ): { payload: Timeline } => {
                const identifier = DateTime.now().toMillis().toString();
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
        }
        // todo
    }
})

// Action creators are generated for each case reducer function
export const {
    removeTimeline,
    addTimeline,
    setCurrentTimeline,
} = timelinesSlice.actions
export default timelinesSlice.reducer