import React from "react";
import valueLabelGetter from "../../api/DataGetter";

class Card extends React.Component <{label: any, nodeId: any}, {}> {
    render(){
        var url = "https://nwdb.info/db/item/" + this.props.nodeId
        return (
                <li>
                    <a href={url}>{this.props.label}</a>
                </li>
        )
    }
}


class SigmaSidebar extends React.Component <{nodes: any, edges: any}, {}> {
    constructor(props: any) {
        super(props)
        this.state = {hasCards: false}
    }

    renderCards(){
        // I'm trying to get this to work quickly, after it's in good shape i'll take 
        // out the stupid double loop
        let c = []
        let rc = []
        if(this.props.edges){
            // console.log("%%%%Edges%%%%%")
            // console.log(this.props.edges)
        }
        if(this.props.nodes){
            // console.log("%%%%%Nodes%%%%")
            // console.log(this.props.nodes)
            Object.values(this.props.nodes).forEach(element => {
                //c.push(element.label) //it's super dumb that this doesn't work
                c.push(element)
            });
        c.forEach(element => {
            rc.push(<Card label={element.label} nodeId={element.id}/>) //but this does
        });
        }
        return rc
    }

    render() {
        return(
        <div className="sideBar">
            <ul>
            {this.renderCards()}
            </ul>
        </div>
        )
    }

}

 export default SigmaSidebar