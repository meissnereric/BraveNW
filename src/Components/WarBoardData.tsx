export function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function createServersData(region: string, server: string, colorHex: string) {
    return { region, server, colorHex };
}

export const serverRows = [
    createServersData('US-West', 'Xibalba', "#CC8E00"),
    createServersData('US-West', 'Orofena', "#996A00"),

    createServersData('US-East', 'Xibalba', "#CC8E00"),
    createServersData('US-East', 'Orofena', "#996A00"),

    createServersData('EU-Central', 'Xibalba', "#CC8E00"),
    createServersData('EU-Central', 'Orofena', "#996A00"),

    createServersData('AP-Southeast', 'Xibalba', "#CC8E00"),
    createServersData('AP-Southeast', 'Orofena', "#996A00"),

    createServersData('SA-East', 'Xibalba', "#CC8E00"),
    createServersData('SA-East', 'Orofena', "#996A00"),

]

const serversRowSplitter = (rows) => {
    let uswest = []
    let useast = []
    let eucentral = []
    let apsoutheast = []
    let saeast = []
    rows.forEach(element => {
        if (element.region === "US-West")
            uswest.push(element)

        if (element.region === "US-East")
            useast.push(element)

        if (element.region === "EU-Central")
            eucentral.push(element)

        if (element.region === "AP-Southeast")
            apsoutheast.push(element)

        if (element.region === "SA-East")
            saeast.push(element)

    });
    return { uswest, useast, eucentral, apsoutheast, saeast}
}
export const serversSplitRows = serversRowSplitter(serverRows)
