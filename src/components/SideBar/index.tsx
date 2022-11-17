import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';


const sideBarData = [
    {
        pageName: "Home",
        pageLink: "/",
        pageOptions: []
    },
    {
        pageName: "Tools",
        pageLink: "/tools",
        pageOptions: [
            {
                pageName: "Calculator",
                pageLink: "/calculator"
            },
            {
                pageName: "To Do List",
                pageLink: "/todolist"
            }
        ]
    },
    {
        pageName: "Services",
        pageLink: "/services",
        pageOptions: [
            {
                pageName: "Weather",
                pageLink: "/weather"
            },
            {
                pageName: "Currency",
                pageLink: "/currency"
            },
            {
                pageName: "News Feed",
                pageLink: "/newsfeed"
            }
        ]
    }
]
const SideBar = () => {
    const [openMenu, setOpenMenu] = React.useState<{ [key: string]: boolean }>({})

    const handleClick = (key: string) => () => {
        console.log(key);
        setOpenMenu({ [key]: !openMenu[key] });
    };
    return (
        <div>
            <List
                component="nav">
                {sideBarData.map(({ pageName, pageOptions, pageLink }, index) => {
                    const open = openMenu[pageName] || false;
                    return (
                        <div key={index}>
                            {pageOptions.length > 0 ? (
                                <>
                                    <ListItem button onClick={handleClick(pageName)}>
                                        <ListItemText inset primary={pageName} />
                                        {open ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={open} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {pageOptions.map((pageOption, pageOptionIndex) => (
                                                <ListItem key={pageOptionIndex} button>
                                                    <Link to={pageLink + pageOption.pageLink} className={styles.link} key={pageOption.pageName}>
                                                        <ListItemText inset primary={pageOption.pageName} />
                                                    </Link>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Collapse>
                                </>
                            ) : <>
                                <ListItem button>
                                    <Link to={pageLink} className={styles.link} key={pageName}>
                                        <ListItemText inset primary={pageName} />
                                    </Link>
                                </ListItem>
                            </>
                            }
                        </div>
                    );
                })}
            </List>
        </div>
    )
}
export default SideBar