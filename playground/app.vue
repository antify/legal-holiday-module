<script setup lang="ts">
import {
  ref,
  useFetch,
  computed,
} from '#imports';

const year = ref<string | null>(null);
const augsburg = ref<boolean>(false);
const state = ref<string | null>(null);
const stateOptions = [
  {
    label: 'all_states',
    value: 'all_states',
  },
  {
    label: 'bw',
    value: 'bw',
  },
  {
    label: 'by',
    value: 'by',
  },
  {
    label: 'be',
    value: 'be',
  },
  {
    label: 'bb',
    value: 'bb',
  },
  {
    label: 'hb',
    value: 'hb',
  },
  {
    label: 'hh',
    value: 'hh',
  },
  {
    label: 'he',
    value: 'he',
  },
  {
    label: 'mv',
    value: 'mv',
  },
  {
    label: 'ni',
    value: 'ni',
  },
  {
    label: 'nw',
    value: 'nw',
  },
  {
    label: 'rp',
    value: 'rp',
  },
  {
    label: 'sl',
    value: 'sl',
  },
  {
    label: 'sn',
    value: 'sn',
  },
  {
    label: 'st',
    value: 'st',
  },
  {
    label: 'sh',
    value: 'sh',
  },
  {
    label: 'th',
    value: 'th',
  },
];

const {
  execute,
  data,
} = useFetch('/api/pages/app', {
  immediate: false,
  watch: false,
  query: computed(() => ({
    year: year.value || 2025,
    augsburg: augsburg.value,
    state: state.value,
  })),
});
</script>

<template>
  <div class="inline-flex flex-col gap-2 p-2 h-screen">
    <div class="flex gap-2 items-center">
      <div class="w-[200px]">
        <AntNumberInput
          v-model="year"
          placeholder="Year"
        />
      </div>

      <div class="w-[200px]">
        <AntSelect
          v-model="state"
          :options="stateOptions"
          placeholder="State"
          nullable
        />
      </div>

      <AntSwitch v-model="augsburg">
        Augsburg
      </AntSwitch>

      <AntButton
        class="w-max"
        @click="execute"
      >
        Get data
      </AntButton>
    </div>

    <div class="border border-base-300 rounded-md bg-base-100 w-[500px] h-full overflow-y-auto p-2">
      <pre>{{ data }}</pre>
    </div>
  </div>
</template>
