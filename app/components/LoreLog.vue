<script setup lang="ts">
// Accept log entries that may be either lore changes or turn records
import { computed } from 'vue';
const props = defineProps<{
  log: Array<{ player: number; change?: number; total?: number; turn?: number; type?: string }>;
}>();

const displayLog = computed(() => [...props.log].reverse());
</script>

<template>
  <div class="max-h-[50dvh] overflow-y-auto">
    <h2 class="text-xl font-bold mb-2">Lore Change Log</h2>
    <ul class="w-full">
      <li v-for="(entry, idx) in displayLog" :key="idx" class="text-base py-1">
        <template v-if="entry.type === 'turn'">
          <span class="font-semibold"
            >Turn {{ entry.turn }}: Player {{ entry.player }}'s turn begins</span
          >
        </template>
        <template v-else>
          Player {{ entry.player }}: {{ entry.change > 0 ? '+' : '' }}{{ entry.change }} (Total:
          {{ entry.total }})
        </template>
      </li>
    </ul>
  </div>
</template>
