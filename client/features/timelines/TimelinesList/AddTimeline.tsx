import Fab from '@mui/material/Fab';
import AddIcon from "@mui/icons-material/Add";
import * as React from 'react';
import {useState} from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import {
    DateTimeFormat,
    dateTimeFormats,
    TimelineItemsPosition,
    timelineItemsPositions
} from "../timelineDefinitions";
import InputLabel from "@mui/material/InputLabel";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {useAppDispatch} from "../../../app/hooks";
import {addTimeline} from "../timelinesSlice";

export default function AddTimeline() {

    const [open, setOpen] = useState(false);
    const [name, setName] = useState<string>('');
    const [position, setPosition] =
        useState<TimelineItemsPosition>('right');
    const [dateTimeFormat, setDateTimeFormat] =
        useState<DateTimeFormat>("dateTime");

    const dispatch = useAppDispatch();

    const clearForm = () => {
        setName('');
        setPosition('right');
        setDateTimeFormat('dateTime');
    }

    const handleClose = () => {
        setOpen(false);
        clearForm();
    }

    const handleCreate = () => {
        dispatch(addTimeline(name, position, dateTimeFormat));
        handleClose();
    }

    return <>
        <Fab
            color="primary"
            aria-label="add"
            sx={{
                position: 'absolute',
                bottom: (theme) => theme.spacing(2),
                right: (theme) => theme.spacing(2)
            }}
            onClick={() => setOpen(true)}
        >
            <AddIcon/>
        </Fab>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Timeline</DialogTitle>
            <DialogContent>
                <FormControl fullWidth sx={{ m: 1}}>
                    <TextField
                        value={name}
                        autoFocus margin="dense" label="Name"
                        type="text" fullWidth variant="standard"
                        onChange={(event) => {
                            setName(event.target.value)
                        }}
                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1}}>
                    <InputLabel>Item Main Position</InputLabel>
                    <Select
                        value={position}
                        label="Item Main Position"
                        onChange={(event) => {
                            setPosition(event.target.value as TimelineItemsPosition)
                        }}
                    >
                        {
                            timelineItemsPositions.map((value) =>
                                <MenuItem key={value} value={value}>
                                    {value}
                                </MenuItem
                        >)}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ m: 1}}>
                    <InputLabel>Date Time format</InputLabel>
                    <Select
                        value={dateTimeFormat}
                        label="Date Time format"
                        onChange={(event) => {
                            setDateTimeFormat(event.target.value as DateTimeFormat)
                        }}
                    >
                        {
                            Object.keys(dateTimeFormats).map((value) =>
                                <MenuItem key={value} value={value}>
                                    {value}
                                </MenuItem
                        >)}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCreate}>Create</Button>
            </DialogActions>
        </Dialog>
    </>
}