<template>
    <Transition name="fade">
        <LoadingScreen v-if="!ready" />
    </Transition>
	<div id="app">
		<topStrip />
		<rightStrip />
		<bottomStrip />
		<leftStrip />

    <workArea />
    </div>
</template>

<style>
@import url('~/assets/css/main.css');

#app{
    width: 100%;
    min-height: 100%;
    display: grid;
    grid-template-areas: 
        "topStrip topStrip topStrip"
        "leftStrip main rightStrip"
        "leftStrip bottomStrip bottomStrip";
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 200px 1fr auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup>
const ready = ref(false)

onMounted(() => {
  requestAnimationFrame(() => { ready.value = true })
})
</script>