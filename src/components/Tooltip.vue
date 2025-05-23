<script setup>
import { TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger } from 'radix-vue'

defineProps({
  content: String,
  position: {
    type: String,
    default: 'top'
  }
})
</script>

<template>
  <tooltip-provider>
    <tooltip-root :delay-duration="0">
      <tooltip-trigger>
        <slot />
      </tooltip-trigger>
      <tooltip-portal>
        <tooltip-content
          as-child
          class="tooltip__content"
          :side-offset="5"
        >
          {{ content }}
          <tooltip-arrow
            class="tooltip__arrow"
            :width="8"
          />
        </tooltip-content>
      </tooltip-portal>
    </tooltip-root>
  </tooltip-provider>
</template>

<style scoped>
.tooltip__content {
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 15px;
  line-height: 1;
  color: var(--black);
  background-color: var(--white);
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  user-select: none;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}
.tooltip__content[data-state='delayed-open'][data-side='top'] {
  animation-name: slideDownAndFade;
}
.tooltip__content[data-state='delayed-open'][data-side='right'] {
  animation-name: slideLeftAndFade;
}
.tooltip__content[data-state='delayed-open'][data-side='bottom'] {
  animation-name: slideUpAndFade;
}
.tooltip__content[data-state='delayed-open'][data-side='left'] {
  animation-name: slideRightAndFade;
}

.tooltip__arrow {
  fill: var(--white);
}

@keyframes slideUpAndFade {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRightAndFade {
  from {
    opacity: 0;
    transform: translateX(-2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideDownAndFade {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideLeftAndFade {
  from {
    opacity: 0;
    transform: translateX(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
