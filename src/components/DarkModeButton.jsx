import { useThemeStore } from '@/store/useThemeStore';
import { VscColorMode } from 'react-icons/vsc';

const DarkmodeButton = () => {
  const toggleMode = useThemeStore(state => state.toggleMode);
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  return (
    <div>
      <button
        onClick={toggleMode}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded">
       <VscColorMode />
      </button>
    </div>
  );
};

export default DarkmodeButton;
