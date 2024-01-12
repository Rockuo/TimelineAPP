import {DateTime} from "luxon";
import {IconsEnum} from "./TimelineItemIcons";

export interface TimelinesState {
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
    day: Intl.DateTimeFormatOptions,
    monthAndYear: Intl.DateTimeFormatOptions,
};
export const dateTimeFormats: DateTimeFormats = {
    date: DateTime.DATE_SHORT,
    time: DateTime.TIME_24_SIMPLE,
    dateTime: DateTime.DATETIME_SHORT,
    year: {year: 'numeric'},
    day: {weekday: 'long'},
    monthAndYear: {year: 'numeric', month: 'long'},
};

export type DateTimeFormat = keyof DateTimeFormats;

export interface Timeline {
    name: string
    itemPosition: TimelineItemsPosition,
    dateTimeFormat: DateTimeFormat,
    items: Record<string, TimelineItemType>
    order: Array<string>
}

export const timelineItemColors = [
    'inherit',
    'grey',
    'primary',
    'secondary',
    'error',
    'info',
    'success',
    'warning'
] as const;

export type TimelineItemColorsType = typeof timelineItemColors[number];
export const timelineItemVariants = ['filled', 'outlined'] as const;

export type TimelineItemVariantsType = typeof timelineItemVariants[number];


export interface TimelineItemType {
    icon?: IconsEnum,
    time?: number, // timestamp
    title: string
    description?: string
    variant: TimelineItemVariantsType,
    color: TimelineItemColorsType,
}