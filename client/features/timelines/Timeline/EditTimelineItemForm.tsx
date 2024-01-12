import * as React from 'react';
import {
    timelineItemColors, TimelineItemColorsType,
    TimelineItemType, timelineItemVariants, TimelineItemVariantsType
} from "../timelineDefinitions";
import {useEffect, useState} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {MobileDatePicker, MobileTimePicker} from "@mui/x-date-pickers";
import {DateTime} from "luxon";

const newItem: TimelineItemType = {
    title: '',
    description: '',
    variant: 'filled',
    color: 'grey',
};

export default function EditTimelineItemForm(
    {
        open,
        onSave,
        onCancel,
        timelineItem: defaultTimelineItem
    }: {
        open: boolean,
        timelineItem?: TimelineItemType
        onSave: (item: TimelineItemType) => void,
        onCancel: () => void,
    }) {
    const [timelineItem, setTimelineItem] =
        useState<TimelineItemType>(defaultTimelineItem ?? newItem);
    const [dateTime, setDateTime] = useState<DateTime|null>(
        defaultTimelineItem.time ? DateTime.fromSeconds(defaultTimelineItem.time): null
    );

    useEffect(() => {
        setTimelineItem(defaultTimelineItem ?? newItem);
        setDateTime(defaultTimelineItem.time ? DateTime.fromSeconds(defaultTimelineItem.time): null);
    }, [defaultTimelineItem]);

    const handleUpdateScalar = (key: keyof TimelineItemType, value: TimelineItemType[keyof TimelineItemType]) => {
        setTimelineItem({...timelineItem, [key]: value});
    }

    const updateDate = (date: DateTime) => {
        // copy
        let newDateTime = dateTime ? DateTime.fromSeconds(dateTime.toSeconds()) :DateTime.now();
        newDateTime = newDateTime.set({year: date.year, month: date.month, day: date.day});
        setDateTime(newDateTime);
        handleUpdateScalar('time', newDateTime.toSeconds());
    }

    const updateTime = (time: DateTime) => {
        // copy
        if (dateTime)
        {
            time = time.set({year: dateTime.year, month: dateTime.month, day: dateTime.day});
        }
        setDateTime(time);
        handleUpdateScalar('time', time.toSeconds());
    }

    return <Dialog open={open} onClose={onCancel}>
        <DialogTitle>New Timeline</DialogTitle>
        <DialogContent>
            <FormControl fullWidth sx={{ m: 1}}>
                <TextField
                    value={timelineItem.title}
                    autoFocus margin="dense" label="Title"
                    type="text" fullWidth variant="standard"
                    onChange={(event) => {
                        handleUpdateScalar('title', event.target.value as string)
                    }}
                />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1}}>
                <TextField
                    value={timelineItem.description}
                    margin="dense" label="Description"
                    type="text" fullWidth variant="standard"
                    onChange={(event) => {
                        handleUpdateScalar('description', event.target.value as string)
                    }}
                />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1}}>
                <InputLabel>Bullet/Icon Variant</InputLabel>
                <Select
                    value={timelineItem.variant}
                    label="Bullet/Icon Variant"
                    onChange={(event) => {
                        handleUpdateScalar('variant', event.target.value as TimelineItemVariantsType)
                    }}
                >
                    {
                        timelineItemVariants.map((value) =>
                            <MenuItem key={value} value={value}>
                                {value}
                            </MenuItem
                            >)}
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1}}>
                <InputLabel>Bullet/Icon Color</InputLabel>
                <Select
                    value={timelineItem.color}
                    label="Bullet/Icon Color"
                    onChange={(event) => {
                        handleUpdateScalar('color', event.target.value as TimelineItemColorsType)
                    }}
                >
                    {
                        timelineItemColors.map((value) =>
                            <MenuItem key={value} value={value}>
                                {value}
                            </MenuItem
                            >)}
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{ m: 1}}>
                <MobileDatePicker value={dateTime} onChange={updateDate}/>
                <MobileTimePicker value={dateTime} onChange={updateTime}/>
            </FormControl>
        </DialogContent>
        <DialogActions>
            <Button onClick={onCancel}>Cancel</Button>
            <Button onClick={() => onSave(timelineItem)}>
                {
                    defaultTimelineItem.title? 'Update' : 'Create'
                }
            </Button>
        </DialogActions>
    </Dialog>
}