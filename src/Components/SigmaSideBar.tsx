import React from "react";
import valueLabelGetter from "../../api/DataGetter";

class Card extends React.Component <{label: any}, {}> {
    constructor(props){
        super(props)
    }
    render(){
        return (
                <h1>{this.props.label}</h1>
        )
    }
}


class SigmaSidebar extends React.Component <{cards: any},{}> {
    constructor(props: any) {
        super(props)
        this.state = {hasCards: false}
    }

    renderCards(){
        // I'm trying to get this to work quickly, after it's in good shape i'll take 
        // out the stupid double loop
        let c = []
        let rc = []
        if(this.props.cards){
            console.log("%%%%%%%%%")
            console.log(this.props.cards)
            Object.values(this.props.cards).forEach(element => {
                //c.push(element.label) //it's super dumb that this doesn't work
                c.push(element)
            });
        c.forEach(element => {
            rc.push(<Card label={element.label}/>) //but this does
        });
        }
        return rc
    }

    render() {
        return(
        <div>
            {this.renderCards()}
        </div>
        )
    }

}

 export default SigmaSidebar