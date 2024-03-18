'use client';

import { Product, Review } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { getReviewAction, updateReviewAction } from './review.action';

import { cn } from '@/lib/utils';
import { useLocalStorage } from 'react-use';
import { toast } from 'sonner';
import RatingSelector from './RatingSelector';
import { ReviewTextSelector } from './ReviewTextSelector';
import { SocialSelector } from './SocialSelector';
import { ReviewType } from './review.schema';

export const ProcessReviewsStep = ({ product }: { product: Product }) => {
  const [reviewId, setReviewId, removeReviewId] = useLocalStorage<
    null | string
  >(`review-id-${product.id}`, null);

  const reviewData = useQuery({
    queryKey: ['review', reviewId, 'product', product.id],
    enabled: Boolean(reviewId),
    queryFn: async () => {
      const { data, serverError } = await getReviewAction({
        id: reviewId ?? '',
        productId: product.id,
      });

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }

      return data;
    },
  });

  const queryClient = useQueryClient();
  const mutateReview = useMutation({
    mutationFn: async (data: Partial<ReviewType>) => {
      const { data: actionData, serverError } = await updateReviewAction({
        ...data,
        productId: product.id,
        id: reviewId ?? undefined,
      });

      if (!actionData || serverError) {
        toast.error(serverError || 'Failed to save review');

        return;
      }

      setReviewId(actionData.id);
      await queryClient.invalidateQueries({
        queryKey: ['review', actionData.id, 'product', product.id],
      });
    },
  });

  const updateData = (partial: Partial<ReviewType>) => {
    mutateReview.mutate(partial);
  };

  const step = getCurrentStep(reviewData.data);

  return (
    <div
      className={cn('h-full', {
        'animate-pulse': mutateReview.isPending,
      })}
    >
      <AnimatePresence mode='wait'>
        {step == 0 && (
          <motion.div
            key='step-0'
            exit={{ opacity: 0, x: -100 }}
            className='flex h-full flex-col items-center justify-center'
          >
            <h2 className='text-lg font-bold'>
              {product.noteTest ?? `How much did you like ${product.name}`}
            </h2>
            <RatingSelector
              onSelect={(review) => {
                updateData({
                  rating: review,
                });
              }}
            />
          </motion.div>
        )}
        {step == 1 && (
          <motion.div
            key='step-1'
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{ opacity: 0, x: -100 }}
            initial={{ opacity: 0, x: 100 }}
            className='flex h-full flex-col items-center justify-center'
          >
            <h2 className='text-lg font-bold'>
              {product.informationText ?? `I need more information about you`}
            </h2>
            <SocialSelector
              onSelect={(name, url) => {
                updateData({
                  name: name,
                  socialLink: url,
                });
              }}
            />
          </motion.div>
        )}
        {step == 2 && (
          <motion.div
            key='step-2'
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{ opacity: 0, x: -100 }}
            initial={{ opacity: 0, x: 100 }}
            className='flex h-full flex-col items-center justify-center'
          >
            <h2 className='text-lg font-bold'>
              {product.reviewText ??
                `Tell me what you liked or what you disliked`}
            </h2>
            <ReviewTextSelector />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const getCurrentStep = (data?: Review) => {
  if (!data) return 0;

  if (data.rating === undefined) {
    return 0;
  }

  if (!data.name || !data.socialLink) {
    return 1;
  }

  if (!data.text) {
    return 2;
  }

  return 3;
};