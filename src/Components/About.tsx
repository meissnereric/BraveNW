import React from "react";


class About extends React.Component{
    render(){
        return(
            <div>         
                <h1> Social Media </h1>
                <h2><a href="https://discord.gg/FVVFvGNj">Website Discord</a></h2>
                    <iframe src="https://discord.com/widget?id=879794338756956191&theme=dark" width="350" height="500" allowTransparency={true} frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
                <h2><a href="https://www.twitch.tv/Tanek17">Tanek17's Twitch</a></h2>
                <h2><a href="https://www.twitch.tv/enbielievable">Enbielievable's Twitch</a></h2>

                <h1>Github</h1>
                You can find all the code used to run the website <a href="https://github.com/meissnereric/BraveNW">here</a> and 
                all the code to generate the graph <a href="https://github.com/meissnereric/NewWorldRecipeGraph">here</a>. 
                
                <h2>Data</h2>
                All data is taken gratefully from <a href="https://nwdb.info">nwdb.info</a>.

                <h2>Bugs</h2>
                If you find any bugs, please report them either in our <a href="https://discord.gg/FVVFvGNj">Discord</a> or 
                in the <a href="https://github.com/meissnereric/BraveNW/issues">Issues</a> section of the Githubs.  
            </div>
        )
    }
}

export default About