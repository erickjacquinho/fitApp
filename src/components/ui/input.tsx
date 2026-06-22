import { cn } from '@/lib/utils';
import { Platform, TextInput } from 'react-native';

function Input({ className, ...props }: React.ComponentProps<typeof TextInput> & React.RefAttributes<TextInput>) {
  return (
    <TextInput
      className={cn(
        'flex h-input-md w-full min-w-0 flex-row items-center rounded-sm border border-component-input-border bg-component-input-bg px-4 py-2 font-sans text-text leading-body text-text-main shadow-none transition-all duration-base',
        'focus:border-thin focus:border-component-input-focus',
        props.editable === false &&
        cn(
          'opacity-50',
          Platform.select({ web: 'disabled:pointer-events-none disabled:cursor-not-allowed' })
        ),
        Platform.select({
          web: cn(
            'placeholder:text-text-muted selection:bg-accent-main selection:text-text-inverse outline-none',
            'focus-visible:border-component-input-focus focus-visible:ring-2 focus-visible:ring-accent-main/30',
            'aria-invalid:ring-tomato-main/20 aria-invalid:border-tomato-main'
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
