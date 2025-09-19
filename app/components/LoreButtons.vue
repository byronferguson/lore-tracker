<script lang="ts" setup>
const { playerId } = defineProps<{
  playerId: number;
}>();

const emit = defineEmits<{
  (e: 'change', payload: { playerId: number; lore: number }): void;
  (e: 'undo', payload: { playerId: number }): void;
}>();

const open = ref(false);

function changeLore(amount: number) {
  emit('change', { playerId, lore: amount });
  open.value = false;
}

type Button = {
  label: string;
  value: number;
  color: 'success' | 'error';
};

const addButtons: Button[] = [
  { label: '+1', value: 1, color: 'success' },
  { label: '+2', value: 2, color: 'success' },
  { label: '+3', value: 3, color: 'success' },
  { label: '+4', value: 4, color: 'success' },
  { label: '+5', value: 5, color: 'success' },
  { label: '+6', value: 6, color: 'success' },
  { label: '+7', value: 7, color: 'success' },
  { label: '+8', value: 8, color: 'success' },
  { label: '+9', value: 9, color: 'success' },
  { label: '+10', value: 10, color: 'success' },
  { label: '+11', value: 11, color: 'success' },
  { label: '+12', value: 12, color: 'success' },
  { label: '+13', value: 13, color: 'success' },
  { label: '+14', value: 14, color: 'success' },
  { label: '+15', value: 15, color: 'success' },
  { label: '+16', value: 16, color: 'success' },
  { label: '+17', value: 17, color: 'success' },
  { label: '+18', value: 18, color: 'success' },
  { label: '+19', value: 19, color: 'success' },
];

const subButtons: Button[] = [
  { label: '-1', value: -1, color: 'error' },
  { label: '-2', value: -2, color: 'error' },
];
</script>

<template>
  <div class="flex flex-col gap-4 self-center justify-self-center">
    <UButton
      v-for="button in addButtons.toSpliced(3)"
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

    <UModal v-model:open="open">
      <UButton
        label="+X"
        color="success"
        :ui="{
          base: 'justify-center size-16 rounded-full touch-manipulation',
          label: 'text-3xl',
        }"
      />

      <template #content>
        <div class="flex flex-wrap gap-4 p-4 max-w-md justify-center">
          <UButton
            v-for="button in addButtons.toSpliced(0, 3)"
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
        </div>
      </template>
    </UModal>

    <UButton
      v-for="button in subButtons"
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
