<script setup>
import { useTasks } from "./composables/useTasks";
import TaskStats from "./components/TaskStats.vue";
import TaskForm from "./components/TaskForm.vue";
import TaskToolbar from "./components/TaskToolbar.vue";
import TaskItem from "./components/TaskItem.vue";

const { tasks, stats, status, sort, error, addTask, updateTask, toggleTask, deleteTask } = useTasks();
</script>

<template>
  <main>
    <h1>Ma todolist</h1>

    <TaskStats :stats="stats" v-model:status="status" />
    <TaskForm @add="addTask" />
    <p class="error" role="alert">{{ error }}</p>
    <TaskToolbar v-model:status="status" v-model:sort="sort" />

    <ul>
      <TaskItem
        v-for="t in tasks"
        :key="t._id"
        :task="t"
        @toggle="toggleTask"
        @update="updateTask"
        @remove="deleteTask"
      />
      <li v-if="!tasks.length" class="empty">Aucune tâche ici. Ajoutez-en une ci-dessus.</li>
    </ul>
  </main>
</template>