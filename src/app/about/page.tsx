import About from '@/views/About';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('about', 'about.intro');

export default function AboutPage() {
  return <About />;
}
