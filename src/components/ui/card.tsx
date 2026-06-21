import { Text, TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { View } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'flex flex-col gap-4 rounded-xl p-card shadow-none',
  {
    variants: {
      variant: {
        default: 'bg-component-card-bg border border-component-card-border',
        elevated: 'bg-white-pure dark:bg-black-main shadow-sm border-0',
        outline: 'bg-transparent border border-border-soft',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface CardProps extends React.ComponentProps<typeof View>, React.RefAttributes<View>, VariantProps<typeof cardVariants> {}

function Card({ className, variant, ...props }: CardProps) {
  return (
    <TextClassContext.Provider value="text-text-main">
      <View
        className={cn(cardVariants({ variant }), className)}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return <View className={cn('flex flex-col gap-1.5 px-6', className)} {...props} />;
}

function CardTitle({
  className,
  ref,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<typeof Text>) {

  return (
    <Text
      ref={ref}
      role="heading"
      aria-level={3}
      className={cn('font-semibold leading-none', className)}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<typeof Text>) {
  return <Text className={cn('text-muted-foreground text-sm', className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return <View className={cn('px-6', className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return <View className={cn('flex flex-row items-center px-6', className)} {...props} />;
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
