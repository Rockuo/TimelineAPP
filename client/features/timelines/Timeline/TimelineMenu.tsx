import * as React from 'react';
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import AboveIcon from "@mui/icons-material/KeyboardArrowUp";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import BellowIcon from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Clear";
import Menu from "@mui/material/Menu";
import Divider from '@mui/material/Divider';

export default function TimelineMenu({anchor, onClose, onAdd, onDelete, onEdit, onMoveUp, onMoveDown}: {
    anchor?: HTMLElement,
    onClose: () => void,
    onAdd: () => void,
    onEdit: () => void,
    onDelete: () => void,
    onMoveUp?: () => void,
    onMoveDown?: () => void,
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
        {
            onMoveUp &&
                <MenuItem onClick={onMoveUp}>
                    <ListItemIcon>
                        <AboveIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Move up</ListItemText>
                </MenuItem>
        }
        {onMoveUp && <Divider/>}
        <MenuItem onClick={onAdd}>
            <ListItemIcon>
                <AddIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add Bellow</ListItemText>
        </MenuItem>
        <MenuItem onClick={onEdit}>
            <ListItemIcon>
                <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={onDelete}>
            <ListItemIcon>
                <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
        </MenuItem>

        {onMoveDown && <Divider/>}
        {
            onMoveDown && <MenuItem onClick={onMoveDown}>
                <ListItemIcon>
                    <BellowIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Move Down</ListItemText>
            </MenuItem>
        }
    </Menu>
}