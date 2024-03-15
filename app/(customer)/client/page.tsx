import { Layout } from '@/components/layout';
import type { PageParams } from '@/types/next';

export default async function ClientPage(props: PageParams<{}>) {
  return (
    <Layout>
      <p>Hello world</p>
    </Layout>
  );
}
