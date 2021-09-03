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

export const isDesktopQuery = '(min-width:600px)'

export default function MobileSwitch(props) {
    const classes = useStyles();

    const isDesktop = useMediaQuery(isDesktopQuery);
    console.log("isDesktop: ", isDesktop)
    // Desktop mode
    if (isDesktop) {
        return (
            <Grid container >
                <Grid xs={1} item className={classes.legend} color='primary'>
                    <Box width="100%" margin={1}>
                        <Typography variant='h4'>Filters</Typography>
                        <Legend updateItemFilters={props.updateItemFilters} updateSearchText={props.updateSearchText} />
                    </Box>
                </Grid>

                <Grid xs={9} item >
                    <Box width="100%" margin={4}>
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
