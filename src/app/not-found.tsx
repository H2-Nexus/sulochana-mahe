import Home from '@/views/Home';

// Unknown URLs show the home page (as the Vite app's catch-all route did), with a 404 status.
export default function NotFound() {
  return <Home />;
}
