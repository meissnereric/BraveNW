
function createData(filterType: string, filterValue: string, colorHex: string) {
    return { filterType, filterValue, colorHex };
}

export const rows = [
    createData('Rarity', 'Common', "#C8C8C8"),
    createData('Rarity', 'Uncommon', "#07C02F"),
    createData('Rarity', 'Rare', "#00CBE9"),
    createData('Rarity', 'Epic', "#FF16F7"),
    createData('Rarity', 'Legendary', "#EA5B1C"),
    createData('Rarity', 'Unknown', "#c8c8c8"),

    createData('Tradeskill', 'Armoring', "#F59FF5"),
    createData('Tradeskill', 'Furnishing', "#F59FF5"),
    createData('Tradeskill', 'Engineering', "#316A24"),
    createData('Tradeskill', 'Outfitting', "#FE7123"),
    createData('Tradeskill', 'Weaponsmithing', "#11D904"),
    createData('Tradeskill', 'Cooking', "#06E3FE"),
    createData('Tradeskill', 'Arcana', "#89CFCF"),
    createData('Tradeskill', 'Jewelcrafting', "#703735"),
    createData('Tradeskill', 'Stonecutting', "#00D38C"),
    createData('Tradeskill', 'Smelting', "#93A8FF"),
    createData('Tradeskill', 'Leatherworking', "#FFA202"),
    createData('Tradeskill', 'Weaving', "#FFA202"),
    createData('Tradeskill', 'Woodworking', "#999999"),
    createData('Tradeskill', 'Item Category', "#dddddd"),


    createData('ItemType', 'Armor', "#00B680"),
    createData('ItemType', 'Resource', "#FF7EFF"),
    createData('ItemType', 'Consumable', "#FF7012"),
    createData('ItemType', 'Weapon', "#067000"),
    createData('ItemType', 'HousingItem', "#B5950F"),
    createData('ItemType', 'Item Category', "#00D4FF"),
    createData('ItemType', 'Dye', "#55CF00"),
    createData('ItemType', 'Ammo', "#5EAAFD"),
    createData('ItemType', 'currency', "#FF6383"),
];

export const rColors = [
    "rgb(200, 200, 200)",
    "rgb(7, 192, 47)",
    "rgb(0, 203, 233)",
    "rgb(255, 22, 247)",
    "rgb(255, 135, 23)",
    "rgb(200, 200, 200)"
]

const DEFAULT_SHOWN = true

function addRowToShownFilter(fType, fValue, colorHex, filter) {

    if (!(fType in filter)) {
        filter[fType] = {}
    }
    if (!(fValue in filter)) {
        filter[fType][fValue] = {}
    }
    filter[fType][fValue] = Object.assign({}, filter[fType][fValue], { 'isShown': DEFAULT_SHOWN, 'colorHex': colorHex })
}

/*
Format for this is as follows: 
isShownFilter = {
  'Rarity': {
    'Common': {
      'isShown': true,
      'colorHex': "#C8C8C8"
    }
    'Uncommon': false
  },
  'Tradeskill': {
    'Armoring': true,
    'Smelting': false
  }
}
*/
export var initShownFilter = {}
for (let row of Object.values(rows)) {
    addRowToShownFilter(row.filterType, row.filterValue, row.colorHex, initShownFilter)
}

const rowsSplitter = (rows) => {
    let rarity = []
    let tradeskill = []
    let itemType = []
    rows.forEach(element => {
        if (element.filterType === "Rarity") {
            rarity.push(element)
        }
        if (element.filterType === "Tradeskill")
            tradeskill.push(element)

        if (element.filterType === "ItemType")
            itemType.push(element)
    });
    return { rarity, tradeskill, itemType }
}

export const splitRows = rowsSplitter(rows)

export function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
