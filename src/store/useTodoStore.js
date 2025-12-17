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

      addTask: (newTodo) => {

        set((state) => ({
          todos: [newTodo, ...state.todos],
        }));
      },
      deleteTask: (id) => {
        set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) }));
      },
      toggleTask: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
      },
      updateTask: (id, newTitle, newCategory, newPriority) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id 
              ? { ...todo, title: newTitle, category: newCategory, priority: newPriority } 
              : todo
          ),
        }));
      },

      // مدیریت فیلترها (Search & Filter)
      setSearchTerm: (term) => set({ searchTerm: term }),
      setFilterStatus: (status) => set({ filterStatus: status }),
      
      clearCompleted: () => {
        set((state) => ({ todos: state.todos.filter((todo) => !todo.completed) }));
      },
    }),

    // ------------------------------------------------
    // 3.  Persist settings
    // ------------------------------------------------
    {
      name: 'todo-storage', 
      // storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ todos: state.todos }),
      version: 1,
    }
  )
);

export default useTodoStore;