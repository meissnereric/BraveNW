import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Theme, useTheme } from '@material-ui/core';
import { makeStyles } from "@material-ui/styles";

import { TwitchEmbed, TwitchChat, TwitchClip, TwitchPlayer } from 'react-twitch-embed';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        // backgroundColor:
    }
}));

const Stream = () => {
    return (
      <div>
        <TwitchEmbed
          channel="moonstar_x"
          id="moonstar_x"
          theme="dark"
          muted
          onVideoPause={() => console.log(':(')}
        />
        <TwitchChat channel="moonstar_x" theme="dark" />
        <TwitchClip clip="WealthyBumblingKimchiItsBoshyTime" parent={['mycoolsite.com, anotherawesomesite.net']} />
        <TwitchPlayer video="333014765" />
      </div>
    );
  }

export default function About(props) {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Grid container className='root' spacing={3} style={{ backgroundColor: theme.palette.secondary.main, minHeight:'100vh' }}
            // direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
        >
            <Grid item style={{ backgroundColor: theme.palette.secondary.light }}>
                {/* <Typography variant='h2'>Social Media</Typography> */}
                <Typography variant='h3'><a href="https://discord.gg/FVVFvGNj">BraveNW Discord</a></Typography>
                <Typography><iframe src="https://discord.com/widget?id=879794338756956191&theme=dark" width="350" height="500" allowTransparency={true} frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe></Typography>
            </Grid>
            <Grid item style={{ margin: 5, backgroundColor: theme.palette.secondary.light }}>
                <Typography variant='h2'>Our Twitch Channels</Typography>


                <Typography variant='h3'><a href="https://www.twitch.tv/Tanek17">Tanek17's Twitch</a></Typography>
                
                    <TwitchEmbed
                    channel="Tanek17"
                    id="Tanek17"
                    theme="dark"
                    layout='video' // video-with-chat
                    muted
                    onVideoPause={() => console.log('Tanek17 Twitch video paused :(')}
                    />

                <Typography variant='h3'><a href="https://www.twitch.tv/enbielievable">Enbielievable's Twitch</a></Typography>
                    {/* <TwitchEmbed
                    channel="Enbielievable"
                    id="Enbielievable"
                    theme="dark"
                    layout='video' // video-with-chat
                    muted
                    onVideoPause={() => console.log('Enbie Twitch video paused :(')}
                    /> */}
            </Grid>

            <Grid item style={{ margin: 5, backgroundColor: theme.palette.secondary.light }}>
                <Grid item style={{ margin: 5, backgroundColor: theme.palette.secondary.light }}>
                    <Typography variant='h2'>Github</Typography>
                    <Typography variant='body2'>You can find all the code used to run the website <a href="https://github.com/meissnereric/BraveNW">here</a> and
                        all the code to generate the graph <a href="https://github.com/meissnereric/NewWorldRecipeGraph">here</a>. </Typography>
                </Grid>
                <Grid item style={{ margin: 5, backgroundColor: theme.palette.secondary.light }}>
                    <Typography variant='h2'>Data</Typography>
                    <Typography variant='body2'>All data is taken gratefully from <a href="https://nwdb.info">nwdb.info</a>.</Typography>
                </Grid>
                <Grid item style={{ margin: 5, backgroundColor: theme.palette.secondary.light }}>
                    <Typography variant='h2'>Bugs</Typography>
                    <Typography variant='body2'>If you find any bugs, please report them either in our <a href="https://discord.gg/FVVFvGNj">Discord</a> or
                        in the <a href="https://github.com/meissnereric/BraveNW/issues">Issues</a> section of the Githubs. </Typography>
                </Grid>
                <Grid item style={{ margin: 5, backgroundColor: theme.palette.secondary.light }}>
                    <Typography variant='body2'> Copyright © 2021 bravenw.info  </Typography>
                </Grid>
            </Grid>



        </Grid>
    )
}