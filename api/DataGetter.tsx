import data from "./mockData";


const valueLabelGetter = (id: string) => {
    let datum
    data.forEach((e) =>{
        if(e.id === id) { datum = e}
    })
    return datum
}

export default valueLabelGetter

