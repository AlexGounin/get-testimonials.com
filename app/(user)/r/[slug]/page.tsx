import type { PageParams } from '@/types/next';
import { ProcessReviewsStep } from './ProcessReviewsStep';
/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils';
import { prisma } from '@/prisma';
import { notFound } from 'next/navigation';

export default async function ReviewProductPage(
  props: PageParams<{ slug: string }>
) {
  const product = await prisma.product.findFirst({
    where: {
      slug: props.params.slug,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <div
      className={cn(
        'size-full flex flex-col items-center py-4',
        product.backgroundColors
      )}
    >
      <div className='flex items-center gap-2'>
        {product.image ? (
          <img className='size-8' src={product.image} alt={product.name} />
        ) : null}
        <h1 className='text-lg font-bold'>{product.name}</h1>
      </div>
      <div className='flex-1'>
        <ProcessReviewsStep product={product} />
      </div>
    </div>
  );
}
