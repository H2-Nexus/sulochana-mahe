import Services from '@/views/Services';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('services', 'home.typesIntro');

export default function ServicesPage() {
  return <Services />;
}
