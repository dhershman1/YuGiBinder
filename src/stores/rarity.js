// I'm mkaing rarity into it's own store because it's data is useful all over the app
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useRarityStore = defineStore('rarity', () => {
  const rarities = ref({
    Common: 'C',
    Rare: 'R',
    'Super Rare': 'SR',
    'Ultra Rare': 'UR',
    'Ultimate Rare': 'UtR',
    'Ghost Rare': 'GR',
    'Holographic Rare': 'HGR',
    'Platnium Rare': 'PIR',
    'Alternative/Starlight Rare': 'AltR',

    'Secret Rare': 'ScR',
    'Prismatic Secret Rare': 'PScR',
    'Extra Secret Rare': 'EScR',
    'Platnium Secret Rare': 'PIScR',
    'Ultra Secret Rare': 'UScR',
    '20th Secret Rare': '20ScR',
    'Secret Ultra Rare (Misprint)': 'ScUR',
    '1000 Secret Rare': '1000ScR',

    'Parallel Rare': 'PR',
    'Normal Parallel Rare': 'NPR',
    'Super Parallel Rare': 'SPR',
    'Ultra Parallel Rare': 'UPR',
    'Secret Parallel Rare': 'ScPR',
    'Extra Secret Parallel Rare': 'EScPR',
    'Starfoil Rare': 'SFR',
    'Mosaic Rare': 'MR',
    'Shatterfoil Rare': 'SHR',
    'Collectors Rare': 'CR',
    'Holographic Parallel Rare': 'HGPR',

    'Kaiba Corporation Common': 'KCC',
    'Kaiba Corporation Rare': 'KCR',
    'Kaiba Corporation Ultra Rare': 'KCUR',

    'Gold Rare': 'GUR',
    'Gold Secret Rare': 'GScR',
    'Ghost/Gold Rare': 'GGR',
    'Premium Gold Rare': 'PGR',

    'Millennium Rare': 'MLR',
    'Millennium Super Rare': 'MLSR',
    'Millennium urltra Rare': 'MLUR',
    'Millennium Secret Rare': 'MLScR',
    'Millennium Gold Rare': 'MLGR',

    'Quarter Century Secret Rare': 'QSrR'
  })
  const rarityNames = computed(() => Object.keys(rarities.value))
  const rarityAcronyms = computed(() => Object.values(rarities.value))

  function getRarityAcronym(rarity) {
    return rarities.value[rarity]
  }

  return {
    getRarityAcronym,
    rarities,
    rarityAcronyms,
    rarityNames
  }
})
