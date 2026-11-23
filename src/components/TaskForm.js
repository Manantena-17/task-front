<script setup>
import { ref } from "vue";

const emit = defineEmits(["add"]);
const name = ref("");
const description = ref("");

function submit() {
  if (!name.value.trim()) return;
  emit("add", { name: name.value, description: description.value });
  name.value = "";
  description.value = "";
}
</script>

<template>
  <form class="add" @submit.prevent="submit">
    <input v-model="name" placeholder="Nouvelle tâche" required />
    <button class="btn" type="submit">Ajouter</button>
    <input v-model="description" placeholder="Description (facultatif)" />
  </form>
</template>