import { Layout, LayoutTitle } from '@/components/layout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Card } from '@/components/ui/card';
import Link from 'next/link';
import type { PageParams } from '@/types/next';
import { prisma } from '@/prisma';
import { requiredCurrentUser } from '@/auth/current-user';

export default async function ProductsPage(props: PageParams<{}>) {
  const user = await requiredCurrentUser();

  const products = await prisma.product.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <Layout>
      <LayoutTitle>Products</LayoutTitle>
      <Card className='p-4'>
        {products.length > 0 ? (
          <Table>
            <TableHeader>
              <TableHead>Name</TableHead>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                return (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <Link
            href='/products/new'
            className='flex w-full items-center justify-center border-2 border-dashed border-primary p-8 transition-colors hover:bg-accent/40'
          >
            Create product
          </Link>
        )}
      </Card>
    </Layout>
  );
}
