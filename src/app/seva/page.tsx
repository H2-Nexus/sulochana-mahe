import Seva from '@/views/Seva';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata('seva', 'seva.intro');

export default function SevaPage() {
  return <Seva />;
}
