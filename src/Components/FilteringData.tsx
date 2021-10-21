
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
    createGatheringData('Mining', 'oreveinfinishsmall', "Iron Vein (S)", "#CC8E00"),
    createGatheringData('Mining', 'oreveinfinishmedium', "Iron Vein (M)", "#996A00"),
    createGatheringData('Mining', 'oreveinfinishlarge', "Iron Vein (L)", "#7F5800"),

    createGatheringData('Mining', 'starmetaloreveinfinishsmall', "Starmetal Vein (S)", "#CC8E00"),
    createGatheringData('Mining', 'starmetaloreveinfinishmedium', "Starmetal Vein (M)", "#996A00"),
    createGatheringData('Mining', 'starmetaloreveinfinishlarge', "Starmetal Vein (L)", "#7F5800"),

    createGatheringData('Mining', 'orichalcumoreveinfinishsmall', "Orichalcum Vein (S)", "#CC8E00"),
    createGatheringData('Mining', 'orichalcumoreveinfinishmedium', "Orichalcum Vein (M)", "#996A00"),
    createGatheringData('Mining', 'orichalcumoreveinfinishlarge', "Orichalcum Vein (L)", "#7F5800"),

    createGatheringData('Mining', 'silver_small', "Silver Vein (S)", "#CC8E00"),
    createGatheringData('Mining', 'silver_medium', "Silver Vein (M)", "#996A00"),
    createGatheringData('Mining', 'silver_large', "Silver Vein (L)", "#7F5800"),

    createGatheringData('Mining', 'gold_small', "Gold Vein (S)", "#CC8E00"),
    createGatheringData('Mining', 'gold_medium', "Gold Vein (M)", "#996A00"),
    createGatheringData('Mining', 'gold_large', "Gold Vein (L)", "#7F5800"),

    createGatheringData('Mining', 'platinum_small', "Platinum Vein (S)", "#CC8E00"),
    createGatheringData('Mining', 'platinum_medium', "Platinum Vein (M)", "#996A00"),
    createGatheringData('Mining', 'platinum_large', "Platinum Vein (L)", "#7F5800"),

    createGatheringData('Mining', 'boulderfinishsmall', "Boulder (S)", "#A8A8A8"),
    createGatheringData('Mining', 'boulderfinishmedium', "Boulder (M)", "#949494"),
    createGatheringData('Mining', 'boulderfinishlarge', "Boulder (L)", "#474747"),

    createGatheringData('Mining', 'lodestonefinishsmall', "Lodestone (S)", "#A8A8A8"),
    createGatheringData('Mining', 'lodestonefinishmedium', "Lodestone (M)", "#949494"),
    createGatheringData('Mining', 'lodestonefinishlarge', "Lodestone (L)", "#474747"),

    createGatheringData('Mining', 'seepingstonesmall', "Seeping Stone (S)", "#A8A8A8"),
    createGatheringData('Mining', 'seepingstonemedium', "Seeping Stone (M)", "#949494"),
    createGatheringData('Mining', 'seepingstonelarge', "Seeping Stone (L)", "#474747"),

    createGatheringData('Mining', 'singlestone', "Flint", "#949494"),

    createGatheringData('Logging', 'treetiny', "Young Tree (T)", "#429030"),
    createGatheringData('Logging', 'treesmall', "Young Tree (S)", "#3A802A"),
    createGatheringData('Logging', 'treemedium', "Young Tree (M)", "#316A24"),
    createGatheringData('Logging', 'treelarge', "Young Tree (L)", "#25501B"),
    createGatheringData('Logging', 'treehuge', "Young Tree (H)", "#122F0A"),

    createGatheringData('Logging', 'treesoftwoodtiny', "Mature Tree (T)", "#429030"),
    createGatheringData('Logging', 'treesoftwoodsmall', "Mature Tree (S)", "#3A802A"),
    createGatheringData('Logging', 'treesoftwoodmedium', "Mature Tree (M)", "#316A24"),
    createGatheringData('Logging', 'treesoftwoodlarge', "Mature Tree (L)", "#25501B"),
    createGatheringData('Logging', 'treesoftwoodhuge', "Mature Tree (H)", "#122F0A"),

    createGatheringData('Logging', 'wyrdwoodtreetiny', "Wyrdwood Tree (T)", "#429030"),
    createGatheringData('Logging', 'wyrdwoodtreesmall', "Wyrdwood Tree (S)", "#3A802A"),
    createGatheringData('Logging', 'wyrdwoodtreemedium', "Wyrdwood Tree (M)", "#316A24"),
    createGatheringData('Logging', 'wyrdwoodtreelarge', "Wyrdwood Tree (L)", "#25501B"),
    createGatheringData('Logging', 'wyrdwoodtreehuge', "Wyrdwood Tree (H)", "#122F0A"),

    createGatheringData('Logging', 'ironwoodtreetiny', "Ironwood Tree (T)", "#429030"),
    createGatheringData('Logging', 'ironwoodtreesmall', "Ironwood Tree (S)", "#3A802A"),
    createGatheringData('Logging', 'ironwoodtreemedium', "Ironwood Tree (M)", "#316A24"),
    createGatheringData('Logging', 'ironwoodtreelarge', "Ironwood Tree (L)", "#25501B"),
    createGatheringData('Logging', 'ironwoodtreehuge', "Ironwood Tree (H)", "#122F0A"),

    createGatheringData('Harvesting', 'bushxsmall', "Bush (XS)", "#ADBDFF"),
    createGatheringData('Harvesting', 'bushsmall', "Bush (S)", "#ADB2FF"),
    createGatheringData('Harvesting', 'bushmedium', "Bush (M)", "#93A8FF"),
    createGatheringData('Harvesting', 'bushlarge', "Bush (L)", "#6675B2"),
    createGatheringData('Harvesting', 'bushhuge', "Bush (H)", "#48537E"),

    createGatheringData('Harvesting', 'hempsmallt1', "Hemp (S)", "#93A8FF"),
    createGatheringData('Harvesting', 'hempmediumt1', "Hemp (M)", "#6675B2"),
    createGatheringData('Harvesting', 'hemplarget1', "Hemp (L)", "#48537E"),

    createGatheringData('Harvesting', 'hempsmallt4', "Silkweed (S)", "#93A8FF"),
    createGatheringData('Harvesting', 'hempmediumt4', "Silkweed (M)", "#6675B2"),
    createGatheringData('Harvesting', 'hemplarget4', "Silkweed (L)", "#48537E"),

    createGatheringData('Harvesting', 'hempsmallt5', "Wirefiber (S)", "#93A8FF"),
    createGatheringData('Harvesting', 'hempmediumt5', "Wirefiber (M)", "#6675B2"),
    createGatheringData('Harvesting', 'hemplarget5', "Wirefiber (L)", "#48537E"),

    createGatheringData('Harvesting', 'earth_plant', "Earth Plant", "#603735"),
    createGatheringData('Harvesting', 'fire_plant', "Fire Plant", "#FF6333"),
    createGatheringData('Harvesting', 'air_plant', "Air Plant", "#89CFCF"),
    createGatheringData('Harvesting', 'water_plant', "Water Plant", "#5EAAFD"),
    createGatheringData('Harvesting', 'soul_plant', "Soul Plant", "#93B8FF"),
    createGatheringData('Harvesting', 'life_plant', "Life Plant", "#00D38C"),
    createGatheringData('Harvesting', 'death_plant', "Death Plant", "#555555"),

]

const gatheringRowsSplitter = (rows) => {
    let mining = []
    let logging = []
    let harvesting = []
    rows.forEach(element => {
        if (element.gatheringType === "Mining")
            mining.push(element)
        
        if (element.gatheringType === "Logging")
            logging.push(element)

        if (element.gatheringType === "Harvesting")
            harvesting.push(element)
    });
    return { mining, logging, harvesting }
}
export const gatheringSplitRows = gatheringRowsSplitter(gatheringRows)


const makeGatheringLabelsMap = (rows) => {
    let map = {}
    rows.forEach(element => {
        map[element.nodeId] = element.nodeName
    })
    return map

}

export const gatheringLabelsMap = makeGatheringLabelsMap(gatheringRows)


