<template>
  <div class="uia-loader">
    <div class="uia-loader__canvas">
      <div class="uia-square-loader"></div>
    </div>
    <div class="uia-loader__caption">Loading</div>
  </div>
</template>

<style scoped>
.uia-loader {
  --_uia-loader-size_default: 5rem;
  --_uia-loader-main-aligment: var(--uia-loader-main-aligment, center);
  /*
	inline-size: var(--uia-loader-main-size, var(--_uia-loader-size_default));
	block-size: var(--uia-loader-extra-size, var(--_uia-loader-size_default));
	*/
  display: var(--uia-loader-display, grid);
  gap: var(--uia-loader-caption-gap, 0.5rem);
  justify-items: var(--_uia-loader-main-aligment);
}

.uia-loader__canvas {
  --_uia-loader-canvas-size: var(--uia-loader-canvas-size, 3rem);

  box-sizing: border-box;
  inline-size: var(--uia-loader-canvas-main-size, var(--_uia-loader-canvas-size));
  block-size: var(--uia-loader-canvas-extra-size, var(--_uia-loader-canvas-size));
  padding: var(--uia-loader-canvas-safe-gap, 0.25rem);

  display: var(--uia-loader-canvas-display, grid);
  justify-items: var(--_uia-loader-main-aligment);
  align-items: var(--uia-loader-canvas-extra-aligment, center);
}

.uia-square-loader {
  --_uia-square-loader-size_default: 2rem;
  --_uia-square-loader-little-size_default: 20%;
  --_uia-square-loader-color: var(--uia-square-loader-color, var(--white));

  box-sizing: border-box;
  inline-size: var(--uia-square-loader-size, var(--_uia-square-loader-size_default));
  block-size: var(--uia-square-loader-size, var(--_uia-square-loader-size_default));
  border: var(--uia-square-loader-border-thickness, 2px) var(--uia-square-loader-border-style, solid)
    var(--uia-square-loader-border-color, var(--_uia-square-loader-color));

  display: grid;
  place-items: center;
}

.uia-square-loader::before {
  content: '';
  inline-size: var(--_uia-square-loader-little-size, var(--_uia-square-loader-little-size_default));
  height: var(--_uia-square-loader-little-size, var(--_uia-square-loader-little-size_default));
  background-color: var(--uia-square-loader-little-background-color, var(--_uia-square-loader-color));

  animation-name: uia-square-loader;
  animation-duration: var(--uia-square-loader-animation-duration, 4s);
  animation-direction: var(--uia-square-loader-animation-direction, alternate);
  animation-fill-mode: var(--uia-square-loader-animation-fill-mode, both);
  animation-timing-function: var(--uia-square-loader-animation-timing-function, ease-out);
  animation-iteration-count: var(--uia-square-loader-animation-iteration-count, infinite);
}

@keyframes uia-square-loader {
  0%,
  10%,
  90%,
  100% {
    transform: translate3d(0, 0, 0) scale(0);
  }

  20% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  30% {
    transform: translate3d(-100%, -100%, 0) scale(1);
  }

  40% {
    transform: translate3d(100%, -100%, 0) scale(1);
  }

  50% {
    transform: translate3d(100%, 100%, 0) scale(1);
  }

  60% {
    transform: translate3d(-100%, 100%, 0) scale(1);
  }

  70% {
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .uia-square-loader {
    --uia-aquare-loader-animation-duration: 14s;
  }
}
</style>
