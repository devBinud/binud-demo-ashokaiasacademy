import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import './App.css';

function App() {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => e.preventDefault();
    // Disable common copy/cut keyboard shortcuts
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        ['c', 'u', 's', 'a', 'p'].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
