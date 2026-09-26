import { Suspense } from 'react';
import Contact from '@/views/Contact';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('contact', 'contact.intro');

export default function ContactPage() {
  // Contact reads ?type= with useSearchParams; the boundary keeps the rest of the page static.
  return (
    <Suspense>
      <Contact />
    </Suspense>
  );
}
