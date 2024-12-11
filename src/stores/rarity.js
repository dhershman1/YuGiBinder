// I'm mkaing rarity into it's own store because it's data is useful all over the app
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useRarityStore = defineStore('rarity', () => {
  const rarities = ref({
    common: 'C',
    rare: 'R',
    'super rare': 'SR',
    'ultra rare': 'UR',
    'ultimate rare': 'UtR',
    'ghost rare': 'GR',
    'holographic rare': 'HGR',
    'platnium rare': 'PIR',
    'alternative/starlight rare': 'AltR',

    'secret rare': 'ScR',
    'prismatic secret rare': 'PScR',
    'extra secret rare': 'EScR',
    'platnium secret rare': 'PIScR',
    'ultra secret rare': 'UScR',
    '20th secret rare': '20ScR',
    'secret ultra rare (misprint)': 'ScUR',
    '1000 secret rare': '1000ScR',

    'parallel rare': 'PR',
    'normal parallel rare': 'NPR',
    'super parallel rare': 'SPR',
    'ultra parallel rare': 'UPR',
    'secret parallel rare': 'ScPR',
    'extra secret parallel rare': 'EScPR',
    'starfoil rare': 'SFR',
    'mosaic rare': 'MR',
    'shatterfoil rare': 'SHR',
    'collectors rare': 'CR',
    'holographic parallel rare': 'HGPR',

    'kaiba corporation common': 'KCC',
    'kaiba corporation rare': 'KCR',
    'kaiba corporation ultra rare': 'KCUR',

    'gold rare': 'GUR',
    'gold secret rare': 'GScR',
    'ghost/gold rare': 'GGR',
    'premium gold rare': 'PGR',

    'millennium rare': 'MLR',
    'millennium super rare': 'MLSR',
    'millennium ultra rare': 'MLUR',
    'millennium secret rare': 'MLScR',
    'millennium gold rare': 'MLGR',

    'quarter century secret rare': 'QSrR'
  })
  const rarityNames = computed(() => Object.keys(rarities.value))
  const rarityAcronyms = computed(() => Object.values(rarities.value))

  function getRarityAcronym(rarity) {
    return rarities.value[rarity.toLowerCase()]
  }

  return {
    getRarityAcronym,
    rarities,
    rarityAcronyms,
    rarityNames
  }
})
