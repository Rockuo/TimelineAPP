import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {DateTime} from "luxon";
import {IconsEnum} from "./TimelineItemIcons";

interface TimelinesState {
    current?: string;
    timelines: Record<string, Timeline>
    timelinesOrder: Array<string>
}
interface Timeline {
    name: string
    position: 'alternate-reverse' | 'alternate' | 'left' | 'right',
    items: Record<string, TimelineItem>
    dateTimeFormat: Intl.DateTimeFormatOptions,
    order: Array<string>
}

interface TimelineItem {
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
            dateTimeFormat: DateTime.DATETIME_SHORT,
            position: 'alternate',
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
        addTimeline: (state, action: PayloadAction<string>) => {
            const identifier = DateTime.now().toMillis().toString();
            state.timelinesOrder.push(identifier);
            state.timelines = {...state.timelines, [identifier]: {
                    name: action.payload,
                    position: 'right',
                    dateTimeFormat: DateTime.DATETIME_SHORT,
                    items: {},
                    order: []
                }
            };
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