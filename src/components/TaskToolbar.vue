<script setup>
const status = defineModel("status");
const sort = defineModel("sort");
</script>

<template>
  <div class="toolbar">
    <label>Filtrer
      <select v-model="status">
        <option value="all">Toutes</option>
        <option value="pending">En cours</option>
        <option value="done">Terminées</option>
      </select>
    </label>
    <label>Trier par nom
      <select v-model="sort">
        <option value="asc">A → Z</option>
        <option value="desc">Z → A</option>
      </select>
    </label>
  </div>
</template>