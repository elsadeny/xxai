import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import { CONFIG } from 'src/config-global';
import { varAlpha, bgGradient } from 'src/theme/styles';
import { useEffect, useState } from 'react';


import {  List, ListItem } from '@mui/material';


//----------------------------------------------------------
import { fYuan} from 'src/utils/format-number';

//-----------------------------------------------------------

export function PayCircleView({
    sx,
    name,
    rows = [],  // Default value if rows is not provided
    selectedRow,
    onRowSelect,
    ...other
}) {
    const Irow = ({ label, value, isSelected, onClick }) => (
        <ListItem
            sx={{
                display: 'flex',
                typography: 'body2',
                justifyContent: 'space-between',
                cursor: 'pointer',
                backgroundColor: isSelected ? 'primary.light' : 'background.paper',
                p: 2,
                mb: 1,
                borderRadius: 1,  // Optional: to give a rounded look like Paper
            }}
            onClick={onClick}
            selected={isSelected} // Highlights the selected ListItem
        >
            <Box component="span" sx={{ color: 'text.secondary' }}>
                {label}
            </Box>
            <Box component="span">{fYuan(value)}</Box>
        </ListItem>
    );

    return (
        <Card sx={{ p: 3, ...sx }} {...other}>
            <Box sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ typography: 'h3' }}>{name}</Box>
                <Divider sx={{ borderStyle: 'dashed' }} />
                <List>
                    {rows.map((row, index) => (
                        <Irow
                            key={index}
                            label={row.label}
                            value={row.value}
                            isSelected={selectedRow === index}
                            onClick={() => onRowSelect(index)}  // Notify parent of selection
                        />
                    ))}
                </List>
            </Box>
        </Card>
    );
}