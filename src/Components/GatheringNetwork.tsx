import { Sigma, LoadGEXF } from 'react-sigma';
import GatheringNodeSelector from './GatheringNodeSelector';

import Theming from './Theming';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import { isDesktopQuery } from './MobileSwitch';
import { GRAPH_PATH } from './GraphConfig'

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        maxHeight: '0vh',
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

export default function GatheringNetwork(props) {
    const classes = useStyles();
    const theme = Theming.theme
    const setAdjNodes = props.setAdjNodes
    const setAdjEdges = props.setAdjEdges
    const selectedGatheringNode = props.selectedGatheringNode
    const luckBonus = props.luckBonus

    const matches = useMediaQuery(isDesktopQuery);
    const sigmaStyle = {
        height: '900px', // TODO add in media query here for height on mobile
        // display: 'flex',
        'backgroundColor': theme.palette.primary.main
    }

    return (
        <Sigma renderer="canvas"
            settings={sigmaSettings}
            style={sigmaStyle}
        >
            <LoadGEXF path={GRAPH_PATH}>
                <GatheringNodeSelector path='red'
                    adjNodesSetter={setAdjNodes}
                    adjEdgesSetter={setAdjEdges}
                    selectedGatheringNode={selectedGatheringNode}
                    luckBonus={luckBonus}
                    >
                </GatheringNodeSelector>
            </LoadGEXF>
        </Sigma>
    )
}