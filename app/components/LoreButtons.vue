<script lang="ts" setup>
const { playerId } = defineProps<{
  playerId: number;
}>();

const emit = defineEmits<{
  (e: 'change', payload: { playerId: number; lore: number }): void;
  (e: 'undo', payload: { playerId: number }): void;
}>();

function changeLore(amount: number) {
  emit('change', { playerId, lore: amount });
}

type Button = {
  label: string;
  value: number;
  color: 'success' | 'error';
};

const buttons: Button[] = [
  { label: '+1', value: 1, color: 'success' },
  { label: '+2', value: 2, color: 'success' },
  { label: '+3', value: 3, color: 'success' },
  { label: '+5', value: 5, color: 'success' },
  { label: '-1', value: -1, color: 'error' },
  { label: '-2', value: -2, color: 'error' },
];
</script>

<template>
  <div class="flex flex-col gap-4 self-center justify-self-center">
    <UButton
      v-for="button in buttons"
      :key="button.label"
      :ui="{
        base: 'justify-center size-16 rounded-full touch-manipulation',
        label: 'text-3xl',
      }"
      :label="button.label"
      :color="button.color"
      square
      @click="changeLore(button.value)"
    />
    <UButton
      icon="mdi:undo"
      variant="outline"
      color="neutral"
      :ui="{
        base: 'justify-center size-16 rounded-full touch-manipulation',
        leadingIcon: 'size-8',
      }"
      @click="emit('undo', { playerId })"
    />
  </div>
</template>
