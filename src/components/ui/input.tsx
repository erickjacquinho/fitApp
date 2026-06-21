import { cn } from '@/lib/utils';
import { Platform, TextInput } from 'react-native';

function Input({ className, ...props }: React.ComponentProps<typeof TextInput> & React.RefAttributes<TextInput>) {
  return (
    <TextInput
      className={cn(
        'bg-surface-app border-border-strong text-text-main flex h-input-md w-full min-w-0 flex-row items-center rounded-md border px-4 py-2 font-sans text-text leading-body shadow-none',
        props.editable === false &&
        cn(
          'opacity-50',
          Platform.select({ web: 'disabled:pointer-events-none disabled:cursor-not-allowed' })
        ),
        Platform.select({
          web: cn(
            'placeholder:text-text-muted selection:bg-primary-main selection:text-white-pure outline-none transition-all',
            'focus-visible:border-primary-main focus-visible:ring-primary-main/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-tomato-main/20 dark:aria-invalid:ring-tomato-main/40 aria-invalid:border-tomato-main'
          ),
          native: 'placeholder:text-text-muted',
        }),
        className
      )}
      {...props}
    />
  );
}

export { Input };
