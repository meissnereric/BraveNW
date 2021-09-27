import useMediaQuery from '@material-ui/core/useMediaQuery';
import SigmaSidebar from './SigmaSideBar';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Theme, Typography } from '@material-ui/core';
import PersistentDrawer from './PersistentDrawer';

import Theming from './Theming';
import Legend from './SigmaLegend';
import GraphGridItem from './GraphGridItem';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        background: Theming.theme.palette.secondary.main
    },

    legend: {
        background: Theming.theme.palette.secondary.main
    },

    graphouter: {
        background: Theming.theme.palette.primary.dark,

    },

    sidebar: {
        background: Theming.theme.palette.secondary.main,
    }
}));

export const isDesktopQuery = theme => theme.breakpoints.up('sm')

export default function MobileSwitch(props) {
    const classes = useStyles();

    const isDesktop = useMediaQuery(isDesktopQuery);
    console.log("isDesktop: ", isDesktop)
    // Desktop mode
    if (isDesktop) {
        return (
            <Grid container >
                <Grid xs={2} item className={classes.legend} color='primary'>
                    <Box width="100%" margin={1}>
                        <Typography variant='h4'>Filters</Typography>
                        <Legend updateItemFilters={props.updateItemFilters} updateSearchText={props.updateSearchText} />
                    </Box>
                </Grid>

                <Grid xs={8} item >
                    <Box width="100%" margin={4}>
                        <Box>
                            <Typography variant='h4'>How to use: </Typography>
                            <Typography variant='body2'>
                                <ul>
                                    <li>Each <b>dot</b> is each an item in the game.</li>
                                    <ul>
                                        <li>The color of each dot represents its rarity in game.</li>
                                        </ul>
                                    <li>The <b>lines</b> between them indicate that that item is used to make another item.</li>
                                    <ul>
                                        <li>The color of each line represents the tradeskill used in creating that item.</li>
                                    </ul>
                                    <li>For example, an Iron Axe will have 3 Armoring lines coming into it from Iron Ingot, Timber, and Coarse Leather, respectively.</li>
                                </ul>
                            </Typography>
                            <Typography variant='h5'> Selecting, Searching, and Filtering</Typography>

                            <Typography variant='body2'>
                                <ul>
                                    <li>Selecting: If you click on a node, it will show up in the right side under “Recipe” and you can see the recipes.</li>
                                    <li>If you hover over those items a tooltip to nwdb.info will pop up with more info.</li>
                                    <li>Filtering: You can use the filters on the left to choose what types of items you want to see, such as only items that are made via armoring or only legendary items.</li>
                                    <li>Searching: You can also use the search bar, found in the left under the filters tab, to search directly for an item. It will filter all items that don't contain that search.</li>
                                </ul>
                            </Typography>
                        </Box>
                        <GraphGridItem filePath={props.filePath} getAdjNodes={props.getAdjNodes} getAdjEdges={props.getAdjEdges}
                            shownFilter={props.shownFilter} searchText={props.searchText} />
                    </Box>
                </Grid>
                <Grid xs={2} item className={classes.legend} color='primary'>
                    <Box width="100%" margin={2}>
                        <SigmaSidebar nodes={props.adjNodes} edges={props.adjEdges} />
                    </Box>
                </Grid>
            </Grid>
        )
    }
    //Mobile mode
    else {
        return (
            <Grid container >
                <Grid item xs={12}>
                    <PersistentDrawer
                        lLabel="Filters"
                        lDisplay={<Legend updateItemFilters={props.updateItemFilters} updateSearchText={props.updateSearchText} />}
                        rLabel="Selected Item"
                        rDisplay={<SigmaSidebar nodes={props.adjNodes} edges={props.adjEdges} />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <GraphGridItem filePath={props.filePath} getAdjNodes={props.getAdjNodes} getAdjEdges={props.getAdjEdges}
                        shownFilter={props.shownFilter} searchText={props.searchText} />
                </Grid>
            </Grid>
        )
    }
}
