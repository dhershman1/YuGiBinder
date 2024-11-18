<script setup>
import { onMounted, ref, computed, nextTick } from 'vue'
import { useWindowSize } from '@vueuse/core'
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import { useRouter } from 'vue-router'
import { useBindersStore } from '@/stores/binders'
import { useCardsStore } from '@/stores/cards'
import { useRarityStore } from '@/stores/rarity'
import { useToastStore } from '@/stores/toasts'
import Loader from '@/components/Loader.vue'
import FiltersSidebar from '@/components/FiltersSidebar.vue'
import BinderPanel from '@/components/Panels/BinderPanel.vue'
import ActionPanel from '@/components/Panels/ActionPanel.vue'

const props = defineProps({
  id: String,
  isRandom: Boolean
})
const binderStore = useBindersStore()
const cardsStore = useCardsStore()
const rarityStore = useRarityStore()
const { width } = useWindowSize()

const router = useRouter()
const toastStore = useToastStore()

const loading = ref(true)
const showFullDescription = ref(false)
const pageSizing = ref(9)
const showReadMore = ref(false)
const parsedContent = computed(() => {
  return DOMPurify.sanitize(marked(binderStore.currentBinder.description))
})
const description = computed(() => {
  if (parsedContent.value.length < 255) {
    return parsedContent.value
  }

  return showFullDescription.value ? parsedContent.value : parsedContent.value.slice(0, 255) + '...'
})

function toggleDescription() {
  showFullDescription.value = !showFullDescription.value
}

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

onMounted(async () => {
  if (width.value < 768) {
    pageSizing.value = 6
  } else if (width.value < 1024) {
    pageSizing.value = 9
  } else {
    pageSizing.value = 12
  }

  try {
    if (props.isRandom) {
      await binderStore.retrieveRandomBinder()
      if (!binderStore.currentBinder) {
        return
      }
      await cardsStore.retrieveCardsInBinder(binderStore.currentBinder.id, {
        limit: pageSizing.value,
        offset: 0
      })
    } else {
      await binderStore.retrieveBinderById(props.id)
      if (!binderStore.currentBinder) {
        return
      }
      await cardsStore.retrieveCardsInBinder(props.id, {
        limit: pageSizing.value,
        offset: 0
      })
    }
  } catch (error) {
    if (error.status === 404) {
      toastStore.addToast('No Binders Found', 'error', 3000)
      return router.replace('/')
    }

    toastStore.addToast('Something went wrong, if the issue persists please open a issue about it!', 'error', 5000)
  } finally {
    loading.value = false
  }

  await nextTick()
  const descriptionElement = document.querySelector('.description-content')
  console.log(descriptionElement)
  if (descriptionElement && descriptionElement.scrollHeight > descriptionElement.clientHeight) {
    showReadMore.value = true
  }
})
</script>

<template>
  <div
    class="binder-cards"
    v-if="!loading && binderStore.currentBinder"
  >
    <filters-sidebar class="sidebar" />
    <section class="binder-cards__content">
      <div class="panel__wrapper">
        <binder-panel />
        <action-panel />
      </div>
      <div
        v-if="parsedContent"
        class="binder-cards__description"
      >
        <div
          v-html="description"
          class="description-content"
          :class="{ 'show-full': showFullDescription }"
        />
        <div
          v-if="showReadMore"
          class="text-center"
        >
          <button
            @click="toggleDescription"
            class="btn btn__default desc__btn"
          >
            {{ showFullDescription ? 'Read Less' : 'Read More' }}
          </button>
        </div>
      </div>
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
.desc__btn {
  margin: auto;
  margin-top: 1rem;
}

.binder-cards {
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: 1fr 6fr;
  height: 100%;
}

.binder-cards__sidebar {
  border-right: 1px solid var(--accent);
}

.binder-cards__description {
  background: var(--dark);
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 5px 5px -5px var(--shadow);
}

.description-content {
  max-height: 100px; /* Set the initial max-height */
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.description-content.show-full {
  max-height: none; /* Remove the max-height to show full content */
}

.binder-cards__content {
  padding-left: 1rem;
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
  .sidebar {
    display: none;
  }

  .binder-cards {
    margin-bottom: 0;
    display: flex;
    flex-direction: column;
  }

  .binder-cards__content {
    padding-left: 0;
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

  .binder-cards__description {
    max-width: fit-content;
  }

  .description-content {
    word-wrap: break-word; /* Ensure long words break and wrap to the next line */
    word-break: break-word; /* Ensure long words break and wrap to the next line */
    white-space: normal; /* Allow normal wrapping of text */
  }
}
</style>
