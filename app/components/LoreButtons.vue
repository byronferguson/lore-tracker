<script lang="ts" setup>
const { playerId } = defineProps<{
  playerId: number;
}>();

const emit = defineEmits<{
  (e: 'change', payload: { playerId: number; lore: number }): void;
}>();

function changeLore(amount: number) {
  emit('change', { playerId, lore: amount });
}
</script>

<template>
  <div class="flex flex-col gap-4 self-center justify-self-center">
    <button
      class="rounded-full bg-green-500 px-3 py-3 text-3xl transition duration-300 ease-in-out select-none active:bg-green-700"
      @click="changeLore(1)"
    >
      +1
    </button>
    <button
      class="rounded-full bg-green-500 px-3 py-3 text-3xl transition duration-300 ease-in-out select-none active:bg-green-700"
      @click="changeLore(2)"
    >
      +2
    </button>
    <button
      class="rounded-full bg-green-500 px-3 py-3 text-3xl transition duration-300 ease-in-out select-none active:bg-green-700"
      @click="changeLore(3)"
    >
      +3
    </button>
    <button
      class="rounded-full bg-green-500 px-3 py-3 text-3xl transition duration-300 ease-in-out select-none active:bg-green-700"
      @click="changeLore(5)"
    >
      +5
    </button>
    <button
      class="rounded-full bg-red-500 px-3 py-3 text-3xl select-none active:bg-red-600"
      @click="changeLore(-1)"
    >
      -1
    </button>
    <button
      class="rounded-full bg-red-500 px-3 py-3 text-3xl select-none active:bg-red-600"
      @click="changeLore(-2)"
    >
      -2
    </button>
  </div>
</template>
