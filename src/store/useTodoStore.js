import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useTodoStore = create(
  persist(
    (set, get) => ({
      // ------------------------------------------------
      // 1. وضعیت اولیه (State)
      // ------------------------------------------------
      todos: [],
      searchTerm: '',
      filterStatus: 'all',

      // ------------------------------------------------
      // 2. (Actions)
      // ------------------------------------------------
      isModalOpen: false,
      editingTask: null,
      openModal: () => set({ isModalOpen: true }),
      closeModal: () => set({ isModalOpen: false , editingTask:null }),
      openEditModal: task =>
        set({
          editingTask: task,
          isModalOpen: true
        }),
      addTask: newTodo => {
        set(state => ({
          todos: [newTodo, ...state.todos]
        }));
      },
      deleteTask: id => {
        set(state => ({ todos: state.todos.filter(todo => todo.id !== id) }));
      },
      toggleTask: id => {
        set(state => ({
          todos: state.todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
        }));
      },
      updateTask: (id, newTask) => {
        set(state => ({
          todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, ...newTask } : todo
          )
        }));
      },

      // مدیریت فیلترها (Search & Filter)
      setSearchTerm: term => set({ searchTerm: term }),
      setFilterStatus: status => set({ filterStatus: status }),

      clearCompleted: () => {
        set(state => ({ todos: state.todos.filter(todo => !todo.completed) }));
      }
    }),

    // ------------------------------------------------
    // 3.  Persist settings
    // ------------------------------------------------
    {
      name: 'todo-storage',
      // storage: createJSONStorage(() => localStorage),
      partialize: state => ({ todos: state.todos }),
      version: 1
    }
  )
);

export default useTodoStore;
