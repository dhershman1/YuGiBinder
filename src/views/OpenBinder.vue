<script setup>
import { onMounted, ref, computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { format } from 'date-fns'
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import { useBindersStore } from '@/stores/binders'
import { useCardsStore } from '@/stores/cards'
import { useRarityStore } from '@/stores/rarity'
import Loader from '@/components/Loader.vue'
import DropDownCircle from '@/components/DropDownCircle.vue'
import FiltersSidebar from '@/components/FiltersSidebar.vue'

const props = defineProps({
  id: String,
  isRandom: Boolean
})
const binderStore = useBindersStore()
const cardsStore = useCardsStore()
const rarityStore = useRarityStore()
const { width } = useWindowSize()

const loading = ref(true)
const pageSizing = ref(9)
const parsedContent = computed(() => {
  return DOMPurify.sanitize(marked(binderStore.currentBinder.description))
})
const backgroundStyle = computed(() => ({
  backgroundImage: `linear-gradient(to right, rgba(65, 68, 67, 0.8), rgba(65, 68, 67, 75%)), url(${binderStore.currentBinder.thumbnail})`,
  backgroundSize: 'cover',
  backgroundPosition: 'right'
}))

function translateEdition(edition) {
  // This function is going to take edition and turn it into a simplified version
  // for example: 1st Edition -> 1st, Unlimited Edition -> Unlimited
  if (edition === 'first_edition') {
    return '1st'
  } else {
    return 'UN'
  }
}

function removeWhiteSpace(rarity) {
  // This function is going to take rarity and turn it into a simplified version
  // for example: Rare -> rare, Common -> common, Super Rare -> super_rare
  return rarity.replace(/\s/g, '')
}

function getSpacingStyles(card) {
  const acronym = rarityStore.getRarityAcronym(card.rarity)

  if (acronym.length > 3) {
    return {
      left: '3.8rem'
    }
  }

  if (acronym.length === 3) {
    return {
      left: '3rem'
    }
  }

  if (acronym.length === 2) {
    return {
      left: '2.8rem'
    }
  }

  return {
    left: '2rem'
  }
}

function formatDate(date) {
  return format(new Date(date), 'MMM dd, yyyy')
}

onMounted(async () => {
  if (width.value < 768) {
    pageSizing.value = 6
  } else if (width.value < 1024) {
    pageSizing.value = 9
  } else {
    pageSizing.value = 12
  }
  if (props.isRandom) {
    await binderStore.retrieveRandomBinder()
    await cardsStore.retrieveCardsInBinder(binderStore.currentBinder.id, {
      limit: pageSizing.value,
      offset: 0
    })
  } else {
    await binderStore.retrieveBinderById(props.id)
    await cardsStore.retrieveCardsInBinder(props.id, {
      limit: pageSizing.value,
      offset: 0
    })
  }
  loading.value = false
})
</script>

<template>
  <div
    class="binder-cards"
    v-if="!loading"
  >
    <filters-sidebar />
    <section class="binder-cards__content">
      <div class="binder-cards__wrapper">
        <aside
          class="binder-cards__header"
          :style="backgroundStyle"
        >
          <h1 class="binder-cards__name">{{ binderStore.currentBinder.name }}</h1>
          <section class="binder-cards__info">
            <span class="bc--cntr">
              <vue-feather type="user" />
              Created by: {{ binderStore.currentBinder.created_by || 'Unknown' }}
            </span>
          </section>
          <section class="binder-cards__dates">
            <span class="bc--cntr">
              <vue-feather type="calendar" />
              Created at: {{ formatDate(binderStore.currentBinder.created_at) }}
            </span>
            <span class="bc--cntr">
              <vue-feather type="calendar" /> Last Updated at:
              {{ formatDate(binderStore.currentBinder.updated_at) }}
            </span>
          </section>
          <section class="binder-cards__metadata">
            <span class="bc--cntr">
              <vue-feather type="eye" />
              {{ binderStore.currentBinder.views }} Views
            </span>
            <span
              class="bc--cntr"
              title="Cards in Binder"
            >
              <vue-feather type="layers" />
              {{ cardsStore.cardsInBinder.length }}
            </span>
            <span
              v-if="binderStore.currentBinder.tags.length < 4 && width > 768"
              class="bc__tags__container"
            >
              <span
                class="bc--cntr"
                v-for="tag in binderStore.currentBinder.tags"
                :key="tag"
              >
                <vue-feather type="tag" />
                {{ tag }}
              </span>
            </span>
            <drop-down-circle
              v-else
              :icon="'tag'"
              :items="binderStore.currentBinder.tags"
            />
          </section>
        </aside>
        <aside class="binder-cards__action-panel">
          <h1 class="binder-cards__name">Action Panel</h1>
          <section class="bc--cntr">
            <button class="btn btn__primary has-icon">
              <vue-feather type="pie-chart" />
              See Stats
            </button>
            <button class="btn btn__primary has-icon">
              <vue-feather type="thumbs-up" />
              Like
            </button>
          </section>
          <section class="bc--cntr">
            <router-link
              class="btn btn__primary has-icon"
              :to="`/binders/${binderStore.currentBinder.id}/edit`"
            >
              <vue-feather type="edit" />
              Edit Binder
            </router-link>
            <router-link
              to="/card-catalog"
              class="btn btn__primary has-icon"
            >
              <vue-feather type="plus-circle" />
              Add Cards
            </router-link>
            <button class="btn btn__primary has-icon">
              <vue-feather type="trash-2" />
              Delete Binder
            </button>
          </section>
        </aside>
      </div>
      <div
        class="binder-cards__description"
        v-html="parsedContent"
      ></div>
      <div class="binder-cards__ygo-cards">
        <div
          v-for="card in cardsStore.cardsInBinder"
          :key="card.id"
          class="media-item img-container"
        >
          <img
            class="ygo__card"
            :src="`https://imgs.yugibinder.com/cards/normal/${card.id}.jpg`"
            :alt="card.name"
            @click="() => $router.push(`/cards/${card.id}`)"
          />
          <div
            :title="card.rarity"
            :class="['corner-tag', removeWhiteSpace(card.rarity)]"
          >
            <span class="rarity">{{ rarityStore.getRarityAcronym(card.rarity) }}</span>
          </div>
          <div
            :title="card.edition"
            class="edition-tag"
            :style="getSpacingStyles(card)"
          >
            <span>{{ translateEdition(card.edition) }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
  <loader
    class="center is-large"
    size="large"
    v-else
  />
</template>

<style scoped>
.binder-cards {
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: 1fr 6fr;
  height: 100%;
}

.binder-cards__wrapper {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: 2fr 2fr;
}

.binder-cards__action-panel h1 {
  max-height: 2.2rem;
}

.binder-cards__header,
.binder-cards__action-panel {
  background: transparent;
  padding: 1rem;
  border-radius: 5px;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  border: 1px solid var(--lightgrey);
  margin-bottom: 1rem;
  margin-top: 1rem;
  display: grid;
  grid-template-rows: 1fr 1fr;
}

.bc--cntr {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.binder-cards__info,
.binder-cards__metadata,
.binder-cards__dates {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.bc__tags__container {
  display: flex;
  gap: 1rem;
}

.binder-cards__info .center i,
.binder-cards__metadata .center i {
  margin-right: 0.5rem;
}

.binder-cards__name {
  margin: 0;
  font-size: 24px;
}

.binder-cards__description {
  background: var(--dark);
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 5px 5px -5px var(--shadow);
}

.binder-cards__content {
  padding-left: 1rem;
}

.binder-cards__sidebar {
  border-right: 1px solid var(--accent);
}

.binder-cards__ygo-cards {
  display: grid;
  margin-top: 1rem;
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
}

.ygo__card {
  width: 100%;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.ygo__card:hover {
  transform: scale(1.3);
}

.img-container {
  position: relative;
  display: inline-block;
}

.img-container img,
.img-container .corner-tag,
.img-container .edition-tag {
  transition: transform 0.3s ease;
}

.img-container:hover img,
.img-container:hover .corner-tag .img-container:hover .edition-tag {
  transform: scale(1.1); /* Scale both the image and the tag */
}

.img-container:hover .corner-tag,
.img-container:hover .edition-tag {
  transform: scale(1.1) translateY(20px) translateX(-15px);
}

.img-container:hover .edition-tag {
  transform: scale(1.1) translateY(20px) translateX(-10px);
}

.img-container img {
  display: block;
}

.edition-tag {
  position: absolute;
  bottom: 0;
  left: 3.8rem;
  padding: 0.4rem 0.6rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: var(--accent);
  color: var(--white);
  font-weight: bold;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.corner-tag {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.4rem 0.6rem;
  border-top-right-radius: 5px;
  background: linear-gradient(to right, rgba(255, 255, 255), rgba(0, 0, 0));
  color: var(--white);
  font-weight: bold;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  z-index: 10;
}

/* Basic Rarities */
.Common.corner-tag {
  color: var(--black);
  background: linear-gradient(135deg, #d3d3d3, #989898);
} /* Common - Light gray tones */
.Rare.corner-tag {
  background: linear-gradient(135deg, #243ee6, #5767f2);
} /* Rare - Slightly darker gray */
.SuperRare.corner-tag {
  color: var(--black);
  background: linear-gradient(135deg, #78c2ff, #b8e0ff);
} /* Super Rare - Soft blue tones */
.UltraRare.corner-tag {
  color: var(--black);
  background: linear-gradient(135deg, #ffcc66, #ffe5b3);
} /* Ultra Rare - Golden hues */
.UltimateRare.corner-tag {
  background: linear-gradient(135deg, #e65757, #a3a3a3);
} /* Ultimate Rare - Dark gray gradient */
.GhostRare.corner-tag {
  color: var(--black);
  background: linear-gradient(135deg, #ffffff, #e0e0e0);
} /* Ghost Rare - Very light white-gray tones */
.HolographicRare.corner-tag {
  background: linear-gradient(135deg, #d4d4d4, #e8e8e8);
} /* Holographic Rare - Metallic silver look */
.PlatinumRare.corner-tag {
  background: linear-gradient(135deg, #e5e5e5, #a6a6a6);
} /* Platinum Rare - Platinum-like tones */
.AlternativeStarlightRare.corner-tag {
  background: linear-gradient(135deg, #ff6f61, #ffb7a3);
} /* Alternative/Starlight Rare - Starry red-pink */

/* Secret Rarities */
.SecretRare.corner-tag {
  background: linear-gradient(135deg, #ff6347, #ffad99);
} /* Secret Rare - Soft red hues */
.PrismaticSecretRare.corner-tag {
  color: var(--black);
  background: linear-gradient(135deg, #f2d1ff, #ffe0e0);
} /* Prismatic Secret Rare - Light lavender to pink */
.ExtraSecretRare.corner-tag {
  background: linear-gradient(135deg, #ffe066, #ffad33);
} /* Extra Secret Rare - Vibrant gold */
.PlatinumSecretRare.corner-tag {
  background: linear-gradient(135deg, #a8a8a8, #d6d6d6);
} /* Platinum Secret Rare - Platinum tones */
.UltraSecretRare.corner-tag {
  background: linear-gradient(135deg, #f3b562, #f0e68c);
} /* Ultra Secret Rare - Light yellow-gold */
.TwentiethSecretRare.corner-tag {
  background: linear-gradient(135deg, #dc143c, #ff7f7f);
} /* 20th Secret Rare - Crimson */
.SecretUltraRareMisprint.corner-tag {
  background: linear-gradient(135deg, #ff9d9d, #ffd1d1);
} /* Secret Ultra Rare (Misprint) - Pink hues */
.ThousandSecretRare.corner-tag {
  background: linear-gradient(135deg, #ff69b4, #ffccff);
} /* 1000 Secret Rare - Vibrant pink-purple */

/* Parallel Rarities */
.ParallelRare.corner-tag {
  background: linear-gradient(135deg, #7f7fff, #b2b2ff);
} /* Parallel Rare - Dark blue-purple tones */
.NormalParallelRare.corner-tag {
  background: linear-gradient(135deg, #b0c4de, #e6f2ff);
} /* Normal Parallel Rare - Soft blue */
.SuperParallelRare.corner-tag {
  background: linear-gradient(135deg, #ffb6c1, #ffd8e8);
} /* Super Parallel Rare - Light pinks */
.UltraParallelRare.corner-tag {
  background: linear-gradient(135deg, #ff9e80, #ffdab3);
} /* Ultra Parallel Rare - Coral and peach */
.SecretParallelRare.corner-tag {
  background: linear-gradient(135deg, #ee82ee, #d0bdf2);
} /* Secret Parallel Rare - Violet tones */
.ExtraSecretParallelRare.corner-tag {
  background: linear-gradient(135deg, #ff6347, #ffb3b3);
} /* Extra Secret Parallel Rare - Tomato red to light red */
.StarfoilRare.corner-tag {
  background: linear-gradient(135deg, #ffd700, #ffe4b5);
} /* Starfoil Rare - Gold tones */
.MosaicRare.corner-tag {
  background: linear-gradient(135deg, #00ced1, #afe0e0);
} /* Mosaic Rare - Aqua tones */
.ShatterfoilRare.corner-tag {
  background: linear-gradient(135deg, #a0522d, #cd9575);
} /* Shatterfoil Rare - Brown tones */
.CollectorsRare.corner-tag {
  background: linear-gradient(135deg, #ffda79, #ffe5b4);
} /* Collectors Rare - Light gold */
.HolographicParallelRare.corner-tag {
  background: linear-gradient(135deg, #f0f8ff, #c0c0c0);
} /* Holographic Parallel Rare - Holographic light gray */

/* Kaiba Corporation Rarities */
.KaibaCorporationCommon.corner-tag {
  background: linear-gradient(135deg, #b0e0e6, #a4d3ee);
} /* Kaiba Corporation Common - Light blue */
.KaibaCorporationRare.corner-tag {
  background: linear-gradient(135deg, #87cefa, #1e90ff);
} /* Kaiba Corporation Rare - Blue tones */
.KaibaCorporationUltraRare.corner-tag {
  background: linear-gradient(135deg, #4682b4, #5f9ea0);
} /* Kaiba Corporation Ultra Rare - Medium blues */

/* Gold Rarities */
.GoldRare.corner-tag {
  background: linear-gradient(135deg, #ffd700, #ffe4b5);
} /* Gold Rare - Bright gold */
.GoldSecretRare.corner-tag {
  color: var(--black);
  background: linear-gradient(135deg, #ffd700, #fff5e1);
} /* Gold Secret Rare - Gold to light cream */
.GhostGoldRare.corner-tag {
  background: linear-gradient(135deg, #fffacd, #f0e68c);
} /* Ghost/Gold Rare - Pale gold */
.PremiumGoldRare.corner-tag {
  background: linear-gradient(135deg, #ffecb3, #ffda79);
} /* Premium Gold Rare - Premium gold tones */

/* Millennium Rarities */
.MillenniumRare.corner-tag {
  background: linear-gradient(135deg, #a020f0, #da70d6);
} /* Millennium Rare - Purple tones */
.MillenniumSuperRare.corner-tag {
  background: linear-gradient(135deg, #9400d3, #dda0dd);
} /* Millennium Super Rare - Deep purple */
.MillenniumUltraRare.corner-tag {
  color: var(--black);
  background: linear-gradient(135deg, #d1c4e9, #b39ddb);
} /* Millennium Ultra Rare - Soft lavender */
.MillenniumSecretRare.corner-tag {
  background: linear-gradient(135deg, #ba55d3, #dda0dd);
} /* Millennium Secret Rare - Lavender purple */
.MillenniumGoldRare.corner-tag {
  background: linear-gradient(135deg, #ffd700, #fffacd);
} /* Millennium Gold Rare - Gold */

/* Quarter Century Secret Rare */
.QuarterCenturySecretRare.corner-tag {
  background: linear-gradient(135deg, #ff8c00, #ffd700);
} /* Quarter Century Secret Rare - Gold-orange */

.corner-tag .rarity {
  display: inline-block;
  transform-origin: left top;
}

@media screen and (max-width: 768px) {
  .binder-cards {
    margin-bottom: 0;
  }

  .binder-cards__dates {
    flex-direction: column;
  }

  .binder-cards__ygo-cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .corner-tag {
    font-size: 12px;
  }
  .edition-tag {
    left: 3rem;
    font-size: 12px;
  }

  .binder-cards__wrapper {
    display: grid;
    grid-template-columns: 1fr;
  }
}
</style>
