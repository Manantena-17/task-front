<script setup>
defineProps({ stats: Object });
const status = defineModel("status");
</script>

<template>
  <div class="stats">
    <button :class="{ active: status === 'all' }" @click="status = 'all'">
      <strong>{{ stats.all }}</strong><span>Tout</span>
    </button>
    <button :class="{ active: status === 'pending' }" @click="status = 'pending'">
      <strong>{{ stats.pending }}</strong><span>En cours</span>
    </button>
    <button :class="{ active: status === 'done' }" @click="status = 'done'">
      <strong>{{ stats.done }}</strong><span>Terminées</span>
    </button>
  </div>
</template>