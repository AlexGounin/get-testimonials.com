'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { Product } from '@prisma/client';
import { useState } from 'react';
import RatingSelector from './RatingSelector';
import { SocialSelector } from './SocialSelector';

type Data = {
  review: null | number;
  name: string;
  socialLink: string;
};

export const ReviewsStep = ({ product }: { product: Product }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>({
    review: null,
    name: '',
    socialLink: '',
  });

  const updateData = (partial: Partial<Data>) => {
    setData((prev) => ({
      ...prev,
      ...partial,
    }));
  };

  return (
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
              setStep(1);
              updateData({ review });
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
              setStep(2);
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
          <SocialSelector
            onSelect={(name, url) => {
              setStep(2);
              updateData({
                name: name,
                socialLink: url,
              });
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
