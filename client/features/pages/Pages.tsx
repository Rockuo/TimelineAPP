import * as React from 'react'
import {Page} from "./pagesSlice";
import TimelinesPage from "../timelines/TimelinesPage";
import {useAppSelector} from "../../app/hooks";


const pagesRecord: Record<Page, () => React.JSX.Element> = {
    timelines: () => <TimelinesPage/>
}

export default function Pages()
{
    const page = useAppSelector(({pages}) => pages.current);
    return pagesRecord[page]();
}