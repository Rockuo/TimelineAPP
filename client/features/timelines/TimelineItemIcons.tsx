import * as React from 'react';

import {
    Fastfood,
    LaptopMac,
    Hotel,
    FoodBank,
    Laptop
} from "@mui/icons-material";



export const icons = {
    'FastFood': Fastfood,
    'LaptopMac': LaptopMac,
    'Hotel': Hotel,
    'FoodBank': FoodBank,
    'Laptop': Laptop,
    '': () => <React.Fragment/>
};

export type IconsEnum = 'FastFood'| 'LaptopMac'| 'Hotel'| 'FoodBank'| 'Laptop' | '';