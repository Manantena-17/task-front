import { ref, watch, onMounted } from "vue";
import { taskApi } from "../api/taskApi";

export function useTasks() {
  const tasks = ref([]);
  const stats = ref({ all: 0, pending: 0, done: 0 });
  const status = ref("all"); // all | pending | done
  const sort = ref("asc");   // asc | desc
  const error = ref("");

  async function load() {
    try {
      const [list, counts] = await Promise.all([
        taskApi.list(status.value, sort.value),
        taskApi.stats(),
      ]);
      tasks.value = list;
      stats.value = counts;
      error.value = "";
    } catch (e) {
      error.value = e.message;
    }
  }

  // Wrapper : exécute une action puis recharge la liste
  async function run(action) {
    try {
      await action();
      await load();
    } catch (e) {
      error.value = e.message;
    }
  }

  const addTask = (task) => run(() => taskApi.create(task));
  const updateTask = (id, task) => run(() => taskApi.update(id, task));
  const toggleTask = (id, done) => run(() => taskApi.setStatus(id, done));
  const deleteTask = (id) => run(() => taskApi.remove(id));

  onMounted(load);
  watch([status, sort], load); // recharge quand le filtre ou le tri change

  return { tasks, stats, status, sort, error, addTask, updateTask, toggleTask, deleteTask };
}