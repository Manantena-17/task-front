<script setup>
import { ref, computed } from "vue";

const props = defineProps({ task: Object });
const emit = defineEmits(["toggle", "update", "remove"]);

const editing = ref(false);
const name = ref("");
const description = ref("");
const isDone = computed(() => props.task.status === "terminée");

function startEdit() {
  name.value = props.task.name;
  description.value = props.task.description || "";
  editing.value = true;
}

function save() {
  if (!name.value.trim()) return;
  emit("update", props.task._id, { name: name.value, description: description.value });
  editing.value = false;
}

function remove() {
  if (confirm("Supprimer cette tâche ?")) emit("remove", props.task._id);
}
</script>

<template>
  <li v-if="editing" class="editing">
    <div class="row">
      <input v-model="name" aria-label="Nom" />
      <input v-model="description" placeholder="Description" aria-label="Description" />
    </div>
    <div class="row">
      <button class="btn" @click="save">Enregistrer</button>
      <button class="btn ghost" @click="editing = false">Annuler</button>
    </div>
  </li>

  <li v-else :class="{ done: isDone }">
    <input
      type="checkbox"
      :checked="isDone"
      aria-label="Terminer la tâche"
      @change="emit('toggle', task._id, $event.target.checked)"
    />
    <div>
      <div class="name">{{ task.name }}</div>
      <div v-if="task.description" class="desc">{{ task.description }}</div>
    </div>
    <div class="actions">
      <button @click="startEdit">Modifier</button>
      <button class="del" @click="remove">Supprimer</button>
    </div>
  </li>
</template>