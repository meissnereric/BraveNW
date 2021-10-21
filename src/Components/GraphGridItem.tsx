import { Sigma, LoadGEXF } from 'react-sigma';
import UpdateNodes from './UpdateNodes';

import Theming from './Theming';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import { isDesktopQuery } from './MobileSwitch';



const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minHeight: '100vh',
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


var sigmaSettings = {
    batchEdgesDrawing: true,
    defaultNodeColor: '#ec5148',
    defaultLabelColor: '#ffffff',
    defaultLabelSize: 8,
    hoverFontStyle: 'text-size: 11',
    drawEdgeLabels: false,
    drawEdges: true,
    edgeColor: 'target',
    nodesPowRatio: 0.2,
    edgesPowRatio: 0.2,
    labelThreshold: 12
}


export default function GraphGridItem(props) {
    const classes = useStyles();
    const theme = Theming.theme
    const filePath = props.filePath
    const sf = props.shownFilter
    const st = props.searchText
    const getAdjNodes = props.getAdjNodes
    const getAdjEdges = props.getAdjEdges

    const matches = useMediaQuery(isDesktopQuery);
    const sigmaStyle = {
        height: '900px', // TODO add in media query here for height on mobile
        // display: 'flex',
        'backgroundColor': theme.palette.primary.main
    }
    console.log("Path:", filePath)

    return (
        <Sigma renderer="canvas"
            settings={sigmaSettings}
            style={sigmaStyle}
        >
            <LoadGEXF path={filePath}>
                <UpdateNodes path='red' shownFilter={sf}
                    searchText={st}
                    adjNodesSetter={getAdjNodes}
                    adjEdgesSetter={getAdjEdges}>
                </UpdateNodes>
            </LoadGEXF>
        </Sigma>
    )
}