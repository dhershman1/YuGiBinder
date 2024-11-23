<script setup>
import { ContextMenuContent, ContextMenuItem, ContextMenuPortal, ContextMenuRoot, ContextMenuTrigger } from 'radix-vue'

defineProps({
  cardId: {
    type: Number,
    required: false
  }
})

const emits = defineEmits(['remove', 'setDetails'])
</script>

<template>
  <context-menu-root>
    <context-menu-trigger>
      <slot name="trigger" />
    </context-menu-trigger>
    <context-menu-portal>
      <context-menu-content
        :side-offset="5"
        class="context__content"
      >
        <context-menu-item
          value="Moving"
          class="context__item"
        >
          Move Card
          <div class="right__slot">
            <vue-feather
              type="move"
              size="16"
            />
          </div>
        </context-menu-item>
        <context-menu-item
          class="context__item"
          @click="emits('setDetails', cardId)"
        >
          Set Details
          <div class="right__slot">
            <vue-feather
              type="edit"
              size="16"
            />
          </div>
        </context-menu-item>
        <context-menu-item
          class="context__item"
          @click="emits('remove', cardId)"
        >
          Remove Card
          <div class="right__slot">
            <vue-feather
              type="trash-2"
              size="16"
            />
          </div>
        </context-menu-item>
      </context-menu-content>
    </context-menu-portal>
  </context-menu-root>
</template>

<style scoped>
:deep(.context__content),
.context__content--sub {
  min-width: 220px;
  background-color: var(--white);
  border-radius: 6px;
  overflow: hidden;
  padding: 5px;
  box-shadow:
    0px 10px 38px -10px rgba(22, 23, 24, 0.35),
    0px 10px 20px -15px rgba(22, 23, 24, 0.2);
}

.context__item {
  font-size: 13px;
  line-height: 1;
  color: var(--black);
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 25px;
  padding: 0 5px;
  position: relative;
  padding-left: 25px;
  user-select: none;
  outline: none;
}

.context__item[data-disabled] {
  background-color: var(--white-dark);
  pointer-events: none;
  cursor: not-allowed;
}

.context__item[data-highlighted] {
  background-color: var(--shadow);
  /* color: var(--); */
}

.right__slot {
  margin-left: auto;
  padding-left: 20px;
  color: var(--black);
}

[data-highlighted] > .right__slot {
  color: var(--accent);
}
[data-disabled] .right__slot {
  color: var(--warmgrey);
}
</style>
