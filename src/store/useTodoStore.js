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
      // 2. اکشن‌ها (Actions)
      // ------------------------------------------------

      // افزودن تسک جدید با عنوان
      addTodo: (title, category = 'عمومی', priority = 'medium') => {
        const newTodo = {
          id: Date.now(),             
          title: title,               // فیلد جدید عنوان
          completed: false,           
          category: category,         
          priority: priority,         
          createdAt: Date.now(),      
        };

        set((state) => ({
          todos: [newTodo, ...state.todos],
        }));
      },

      // حذف، تغییر وضعیت (Toggle) و پاک کردن تکمیل شده‌ها (همانند قبل، فقط از title استفاده می‌شود)
      deleteTodo: (id) => {
        set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) }));
      },

      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
      },

      // ویرایش عنوان، دسته‌بندی و اولویت
      updateTodo: (id, newTitle, newCategory, newPriority) => {
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
    // 3. تنظیمات Persist
    // ------------------------------------------------
    {
      name: 'pro-todo-storage', 
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ todos: state.todos }),
      version: 1,
    }
  )
);

export default useTodoStore;