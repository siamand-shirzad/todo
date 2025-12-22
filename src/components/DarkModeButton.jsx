import { useThemeStore } from '@/store/useThemeStore';
import { FiMoon, FiSun } from 'react-icons/fi';

const DarkModeButton = ({ className }) => {
  const toggleMode = useThemeStore(state => state.toggleMode);
  const isDarkMode = useThemeStore(state => state.isDarkMode);

  return (
    <button
      onClick={toggleMode}
      title='darkmode'
      className={`
        inline-flex items-center justify-center gap-2 whitespace-nowrap 
        rounded-lg text-sm font-medium transition-all 
        disabled:pointer-events-none disabled:opacity-50
        outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
        border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground
        dark:bg-input/30 dark:border-input dark:hover:bg-input/50
        w-10 h-10 ${className || ''}
      `}
      aria-label="Toggle Dark Mode"
    >
      {isDarkMode ? (
        <FiSun className="size-4.5 " />
      ) : (
        <FiMoon className="size-4.5 " />
      )}
    </button>
  );
};

export default DarkModeButton;
