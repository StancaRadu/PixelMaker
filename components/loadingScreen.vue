<template>
  <div class="loading-screen">
    Loading...
  </div>
</template>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  background: var(--warm-beige);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: monospace;
  font-size: 1.5rem;
  z-index: 9999;
}
</style>