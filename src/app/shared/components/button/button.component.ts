import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [class]="buttonClasses()"
      (click)="handleClick()"
    >
      <ng-content />
    </button>
  `,
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  readonly onClick = output<void>();

  buttonClasses() {
    const baseClasses = [
      'inline-flex',
      'items-center',
      'justify-center',
      'font-medium',
      'rounded-md',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'transition-colors',
      'duration-200',
    ];

    // Size classes
    const sizeClasses = {
      sm: ['px-3', 'py-1.5', 'text-sm'],
      md: ['px-4', 'py-2', 'text-sm'],
      lg: ['px-6', 'py-3', 'text-base'],
    };

    // Variant classes
    const variantClasses = {
      primary: [
        'bg-blue-600',
        'text-white',
        'hover:bg-blue-700',
        'focus:ring-blue-500',
        'disabled:bg-blue-300',
      ],
      secondary: [
        'bg-gray-200',
        'text-gray-900',
        'hover:bg-gray-300',
        'focus:ring-gray-500',
        'disabled:bg-gray-100',
        'dark:bg-gray-600',
        'dark:text-white',
        'dark:hover:bg-gray-500',
      ],
      danger: [
        'bg-red-600',
        'text-white',
        'hover:bg-red-700',
        'focus:ring-red-500',
        'disabled:bg-red-300',
      ],
      ghost: [
        'bg-transparent',
        'text-gray-700',
        'hover:bg-gray-100',
        'focus:ring-gray-500',
        'dark:text-gray-300',
        'dark:hover:bg-gray-700',
      ],
    };

    // Disabled classes
    const disabledClasses =
      this.disabled() || this.loading()
        ? ['opacity-50', 'cursor-not-allowed']
        : [];

    return [
      ...baseClasses,
      ...sizeClasses[this.size()],
      ...variantClasses[this.variant()],
      ...disabledClasses,
    ].join(' ');
  }

  handleClick() {
    if (!this.disabled() && !this.loading()) {
      this.onClick.emit();
    }
  }
}
