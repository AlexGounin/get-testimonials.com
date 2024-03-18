import { Layout, LayoutTitle } from '@/components/layout';

import type { PageParams } from '@/types/next';
import { ProductForm } from './ProductForm';
import { notFound } from 'next/navigation';
import { prisma } from '@/prisma';
import { requiredCurrentUser } from '@/auth/current-user';

export default async function ProductEditPage(
  props: PageParams<{ productId: string }>
) {
  const user = await requiredCurrentUser();

  const product = await prisma.product.findUnique({
    where: {
      id: props.params.productId,
      userId: user.id,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <Layout>
      <LayoutTitle>Create Product</LayoutTitle>
      <ProductForm defaultValues={product} productId={props.params.productId} />
    </Layout>
  );
}
