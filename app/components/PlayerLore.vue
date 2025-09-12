<template>
  <UCard :class="['player-card', isActive ? 'active' : '', 'max-h-[50dvh]', 'overflow-y-auto']">
    <h2>{{ player.name }}</h2>
    <div class="lore-total">Lore: {{ player.lore }}</div>
    <div class="lore-controls">
      <UButton color="primary" size="xl" class="lore-btn lore-btn-large" @click="changeLore(1)"
        >+1</UButton
      >
      <UButton color="primary" size="xl" class="lore-btn lore-btn-large" @click="changeLore(2)"
        >+2</UButton
      >
      <UButton color="primary" size="xl" class="lore-btn" @click="changeLore(3)">+3</UButton>
      <UButton color="primary" size="xl" class="lore-btn" @click="changeLore(5)">+5</UButton>
      <UButton color="secondary" size="xl" class="lore-btn" @click="changeLore(-1)">-1</UButton>
      <UButton color="secondary" size="xl" class="lore-btn" @click="changeLore(-2)">-2</UButton>
    </div>
    <div class="pass-turn-wrapper">
      <UButton
        color="primary"
        size="lg"
        class="pass-btn"
        :disabled="!isActive"
        @click="emit('pass-turn', props.player.id)"
        >Pass Turn</UButton
      >
    </div>
  </UCard>
</template>

<script setup lang="ts">
const props = defineProps({
  player: { type: Object, required: true },
  isActive: { type: Boolean, default: false },
});
const emit = defineEmits(['change-lore', 'pass-turn']);
function changeLore(amount: number) {
  emit('change-lore', { playerId: props.player.id, change: amount });
}
</script>

<style scoped>
.lore-btn-large {
  min-width: 170px;
  min-height: 170px;
  font-size: 5.1rem;
  border-radius: 3.75rem;
  padding: 2.85rem 4.65rem;
}
.pass-turn-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}
.pass-btn {
  font-size: 1.5rem;
  min-width: 160px;
  min-height: 56px;
}
.player-card {
  min-width: 240px;
  min-height: 220px;
  padding: 2rem 1.5rem;
  font-size: 2rem;
  opacity: 0.7;
  transition: opacity 0.2s, box-shadow 0.2s;
}
.player-card.active {
  opacity: 1;
  box-shadow: 0 0 12px var(--ui-primary);
}
.lore-total {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}
.lore-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  font-size: 2rem;
}
.lore-btn {
  min-width: 113px;
  min-height: 113px;
  font-size: 3.4rem;
  border-radius: 2.5rem;
  padding: 1.9rem 3.1rem;
}
</style>
