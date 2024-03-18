'use client';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createProductAction, updateProductAction } from './product.action';
import {
  GRADIENTS_CLASSES,
  ProductSchema,
  ProductType,
} from './product.schema';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { uploadImageAction } from '@/features/upload/upload.action';
import { cn } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export type ProductFormProps = {
  defaultValues?: ProductType;
  productId?: string;
};

export const ProductForm = (props: ProductFormProps) => {
  const form = useZodForm({
    schema: ProductSchema,
    defaultValues: props.defaultValues,
  });

  const isCreate = !Boolean(props.defaultValues);

  const routeur = useRouter();
  const mutation = useMutation({
    mutationFn: async (values: ProductType) => {
      const { data, serverError } = isCreate
        ? await createProductAction(values)
        : await updateProductAction({
            id: props.productId ?? '-',
            data: values,
          });

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }

      if (isCreate) {
        toast.success('Product created');
      } else {
        toast.success('Product updated');
      }

      routeur.push(`/products/${data?.id}`);
    },
  });

  const submitImage = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.set('file', file);
      const { data, serverError } = await uploadImageAction(formData);

      if (serverError || !data) {
        toast.error(serverError);
        return;
      }

      const url = data.url;
      form.setValue('image', url);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isCreate
            ? 'Create product'
            : `Edit product ${props.defaultValues?.name}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form
          className='flex flex-col gap-4'
          form={form}
          onSubmit={async (values) => {
            await mutation.mutateAsync(values);
          }}
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='iPhone 15' {...field} />
                </FormControl>
                <FormDescription>
                  The name of the product to review
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='slug'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    placeholder='iPhone15'
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value
                        .replaceAll(' ', '-')
                        .toLowerCase();

                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormDescription>
                  The slug is used in the URL of the review page.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='image'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <div className='flex items-center gap-4'>
                  <FormControl className='flex'>
                    <Input
                      placeholder='iPhone15'
                      type='file'
                      onChange={async (e) => {
                        const file = e.target.files?.[0];

                        if (!file) {
                          return;
                        }

                        if (file.size > 1024 * 1024) {
                          toast.error('File is too big');
                          return;
                        }

                        if (!file.type.includes('image')) {
                          toast.error('Fils is not an image');
                          return;
                        }
                        submitImage.mutate(file);
                      }}
                    />
                  </FormControl>
                  {field.value ? (
                    <Avatar>
                      <AvatarImage src={field.value} />
                    </Avatar>
                  ) : null}
                </div>
                <FormDescription>
                  The slug is used in the URL of the review page.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='backgroundColors'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background color</FormLabel>
                <FormControl>
                  <Select
                    value={field.value ?? ''}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {GRADIENTS_CLASSES.map((gradient: string) => {
                        return (
                          <SelectItem
                            value={gradient}
                            key={gradient}
                            className='flex'
                          >
                            <div
                              className={cn(
                                gradient,
                                'block w-80 h-8 rounded-md'
                              )}
                            ></div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  The review page background color
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button>
            {isCreate
              ? 'Create product'
              : `Edit product ${props.defaultValues?.name}`}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
};
