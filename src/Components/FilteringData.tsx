
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
    createData('Tradeskill', 'Logging', "#93A8FF"),
    createData('Tradeskill', 'Mining', "#FFA202"),
    createData('Tradeskill', 'Harvesting', "#89CFCF"),
    createData('Tradeskill', 'Skinning', "#FFA202"),
    createData('Tradeskill', 'Fishing', "#11D904"),
    createData('Tradeskill', 'Item Category', "#dddddd"),
    createData('Tradeskill', 'N/A', "#dddddd"),
    createData('Tradeskill', 'ElementalAnimal', "#FFA202"),


    createData('ItemType', 'Armor', "#00B680"),
    createData('ItemType', 'Resource', "#FF7EFF"),
    createData('ItemType', 'Consumable', "#FF7012"),
    createData('ItemType', 'Weapon', "#067000"),
    createData('ItemType', 'HousingItem', "#B5950F"),
    createData('ItemType', 'Item Category', "#00D4FF"),
    createData('ItemType', 'Dye', "#55CF00"),
    createData('ItemType', 'Ammo', "#5EAAFD"),
    createData('ItemType', 'currency', "#FF6383"),
    createData('ItemType', 'LootBucket', "#222222"),
    createData('ItemType', 'LootTable', "#666666"),
    createData('ItemType', 'Item', "#999999"),
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

function createGatheringData(gatheringType: string, nodeId: string, nodeName: string, colorHex: string) {
    return { gatheringType, nodeId, nodeName, colorHex };
}

export const gatheringRows = [
    createGatheringData('Mining', 'oreveinfinishsmall', "Iron Vein (S)", "#C8C8C8"),
    createGatheringData('Mining', 'oreveinfinishmedium', "Iron Vein (M)", "#C8C8C8"),
    createGatheringData('Mining', 'oreveinfinishlarge', "Iron Vein (L)", "#C8C8C8"),

    createGatheringData('Mining', 'starmetaloreveinfinishsmall', "Starmetal Vein (S)", "#C8C8C8"),
    createGatheringData('Mining', 'starmetaloreveinfinishmedium', "Starmetal Vein (M)", "#C8C8C8"),
    createGatheringData('Mining', 'starmetaloreveinfinishlarge', "Starmetal Vein (L)", "#C8C8C8"),

    createGatheringData('Mining', 'orichalcumoreveinfinishsmall', "Orichalcum Vein (S)", "#C8C8C8"),
    createGatheringData('Mining', 'orichalcumoreveinfinishmedium', "Orichalcum Vein (M)", "#C8C8C8"),
    createGatheringData('Mining', 'orichalcumoreveinfinishlarge', "Orichalcum Vein (L)", "#C8C8C8"),

    createGatheringData('Mining', 'silver_small', "Silver Vein (S)", "#C8C8C8"),
    createGatheringData('Mining', 'silver_medium', "Silver Vein (M)", "#C8C8C8"),
    createGatheringData('Mining', 'silver_large', "Silver Vein (L)", "#C8C8C8"),

    createGatheringData('Mining', 'gold_small', "Gold Vein (S)", "#C8C8C8"),
    createGatheringData('Mining', 'gold_medium', "Gold Vein (M)", "#C8C8C8"),
    createGatheringData('Mining', 'gold_large', "Gold Vein (L)", "#C8C8C8"),

    createGatheringData('Mining', 'platinum_small', "Platinum Vein (S)", "#C8C8C8"),
    createGatheringData('Mining', 'platinum_medium', "Platinum Vein (M)", "#C8C8C8"),
    createGatheringData('Mining', 'platinum_large', "Platinum Vein (L)", "#C8C8C8"),

    createGatheringData('Mining', 'boulderfinishsmall', "Boulder (S)", "#C8C8C8"),
    createGatheringData('Mining', 'boulderfinishmedium', "Boulder (M)", "#C8C8C8"),
    createGatheringData('Mining', 'boulderfinishlarge', "Boulder (L)", "#C8C8C8"),

    createGatheringData('Mining', 'lodestonefinishsmall', "Lodestone (S)", "#C8C8C8"),
    createGatheringData('Mining', 'lodestonefinishmedium', "Lodestone (M)", "#C8C8C8"),
    createGatheringData('Mining', 'lodestonefinishlarge', "Lodestone (L)", "#C8C8C8"),

    createGatheringData('Mining', 'seepingstonesmall', "Seeping Stone (S)", "#C8C8C8"),
    createGatheringData('Mining', 'seepingstonemedium', "Seeping Stone (M)", "#C8C8C8"),
    createGatheringData('Mining', 'seepingstonelarge', "Seeping Stone (L)", "#C8C8C8"),

    createGatheringData('Mining', 'singlestone', "Flint", "#C8C8C8"),

    createGatheringData('Logging', 'treetiny', "Young Tree (T)", "#C8C8C8"),
    createGatheringData('Logging', 'treesmall', "Young Tree (S)", "#C8C8C8"),
    createGatheringData('Logging', 'treemedium', "Young Tree (M)", "#C8C8C8"),
    createGatheringData('Logging', 'treelarge', "Young Tree (L)", "#C8C8C8"),
    createGatheringData('Logging', 'treehuge', "Young Tree (H)", "#C8C8C8"),

    createGatheringData('Logging', 'treesoftwoodtiny', "Mature Tree (T)", "#C8C8C8"),
    createGatheringData('Logging', 'treesoftwoodsmall', "Mature Tree (S)", "#C8C8C8"),
    createGatheringData('Logging', 'treesoftwoodmedium', "Mature Tree (M)", "#C8C8C8"),
    createGatheringData('Logging', 'treesoftwoodlarge', "Mature Tree (L)", "#C8C8C8"),
    createGatheringData('Logging', 'treesoftwoodhuge', "Mature Tree (H)", "#C8C8C8"),

    createGatheringData('Logging', 'wyrdwoodtreetiny', "Wyrdwood Tree (T)", "#C8C8C8"),
    createGatheringData('Logging', 'wyrdwoodtreesmall', "Wyrdwood Tree (S)", "#C8C8C8"),
    createGatheringData('Logging', 'wyrdwoodtreemedium', "Wyrdwood Tree (M)", "#C8C8C8"),
    createGatheringData('Logging', 'wyrdwoodtreelarge', "Wyrdwood Tree (L)", "#C8C8C8"),
    createGatheringData('Logging', 'wyrdwoodtreehuge', "Wyrdwood Tree (H)", "#C8C8C8"),

    createGatheringData('Logging', 'ironwoodtreetiny', "Ironwood Tree (T)", "#C8C8C8"),
    createGatheringData('Logging', 'ironwoodtreesmall', "Ironwood Tree (S)", "#C8C8C8"),
    createGatheringData('Logging', 'ironwoodtreemedium', "Ironwood Tree (M)", "#C8C8C8"),
    createGatheringData('Logging', 'ironwoodtreelarge', "Ironwood Tree (L)", "#C8C8C8"),
    createGatheringData('Logging', 'ironwoodtreehuge', "Ironwood Tree (H)", "#C8C8C8"),

    createGatheringData('Logging', 'bushxsmall', "Bush (XS)", "#C8C8C8"),
    createGatheringData('Logging', 'bushsmall', "Bush (S)", "#C8C8C8"),
    createGatheringData('Logging', 'bushmedium', "Bush (M)", "#C8C8C8"),
    createGatheringData('Logging', 'bushlarge', "Bush (L)", "#C8C8C8"),
    createGatheringData('Logging', 'bushhuge', "Bush (H)", "#C8C8C8"),

    createGatheringData('Harvesting', 'hempsmallt1', "Hemp (S)", "#C8C8C8"),
    createGatheringData('Harvesting', 'hempmediumt1', "Hemp (M)", "#C8C8C8"),
    createGatheringData('Harvesting', 'hemplarget1', "Hemp (L)", "#C8C8C8"),

    createGatheringData('Harvesting', 'hempsmallt4', "Silkweed (S)", "#C8C8C8"),
    createGatheringData('Harvesting', 'hempmediumt4', "Silkweed (M)", "#C8C8C8"),
    createGatheringData('Harvesting', 'hemplarget4', "Silkweed (L)", "#C8C8C8"),

    createGatheringData('Harvesting', 'hempsmallt5', "Wirefiber (S)", "#C8C8C8"),
    createGatheringData('Harvesting', 'hempmediumt5', "Wirefiber (M)", "#C8C8C8"),
    createGatheringData('Harvesting', 'hemplarget5', "Wirefiber (L)", "#C8C8C8"),

    createGatheringData('Harvesting', 'earth_plant', "Earth Plant", "#C8C8C8"),
    createGatheringData('Harvesting', 'fire_plant', "Fire Plant", "#C8C8C8"),
    createGatheringData('Harvesting', 'air_plant', "Air Plant", "#C8C8C8"),
    createGatheringData('Harvesting', 'water_plant', "Water Plant", "#C8C8C8"),
    createGatheringData('Harvesting', 'soul_plant', "Soul Plant", "#C8C8C8"),
    createGatheringData('Harvesting', 'life_plant', "Life Plant", "#C8C8C8"),
    createGatheringData('Harvesting', 'death_plant', "Death Plant", "#C8C8C8"),

]

const gatheringRowsSplitter = (rows) => {
    let mining = []
    let logging = []
    let harvesting = []
    rows.forEach(element => {
        if (element.filterType === "Mining")
            mining.push(element)
        
        if (element.filterType === "Logging")
            logging.push(element)

        if (element.filterType === "Harvesting")
            harvesting.push(element)
    });
    return { mining, logging, harvesting }
}

export const gatheringSplitRows = gatheringRowsSplitter(gatheringRows)