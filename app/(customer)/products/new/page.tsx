import { Layout, LayoutTitle } from '@/components/layout';

import type { PageParams } from '@/types/next';
import { ProductForm } from '../[productId]/edit/ProductForm';

export default async function NewProductPage(props: PageParams<{}>) {
  return (
    <Layout>
      <LayoutTitle>Create Product</LayoutTitle>
      <ProductForm />
    </Layout>
  );
}
