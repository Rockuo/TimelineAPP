import * as React from 'react';
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import AboveIcon from "@mui/icons-material/KeyboardArrowUp";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import BellowIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";

export default function TimelineMenu({anchor, onClose, onAddAbove, onAddBellow, onEdit}: {
    anchor?: HTMLElement,
    onClose: () => void,
    onAddAbove: () => void,
    onAddBellow: () => void,
    onEdit: () => void,
})
{
    return <Menu
        id="basic-menu"
        anchorEl={anchor}
        open={!!anchor}
        onClose={onClose}
        anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        MenuListProps={{
            'aria-labelledby': 'basic-button',
        }}
    >
        <MenuItem onClick={onAddAbove}>
            <ListItemIcon>
                <AboveIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add Above</ListItemText>
        </MenuItem>
        {/*<Divider />*/}
        <MenuItem onClick={onEdit}>
            <ListItemIcon>
                <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
        </MenuItem>
        {/*<Divider />*/}
        <MenuItem onClick={onAddBellow}>
            <ListItemIcon>
                <BellowIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add Bellow</ListItemText>
        </MenuItem>
    </Menu>
}