import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type InputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'search'
  | 'url'
  | 'tel';
export type InputSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="relative">
      @if (label()) {
      <label
        [for]="inputId"
        class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
        {{ label() }}
        @if (required()) {
        <span class="text-red-500 ml-1">*</span>
        }
      </label>
      }

      <input
        [id]="inputId"
        [type]="type()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [readonly]="readonly()"
        [required]="required()"
        [class]="inputClasses()"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onBlur()"
        (focus)="onFocus.emit()"
      />

      @if (error()) {
      <p class="mt-1 text-sm text-red-600 dark:text-red-400">
        {{ error() }}
      </p>
      } @if (hint() && !error()) {
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {{ hint() }}
      </p>
      }
    </div>
  `,
})
export class InputComponent implements ControlValueAccessor {
  readonly type = input<InputType>('text');
  readonly size = input<InputSize>('md');
  readonly label = input<string>();
  readonly placeholder = input<string>();
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly error = input<string>();
  readonly hint = input<string>();

  readonly onFocus = output<void>();
  readonly onBlurOutput = output<void>();

  readonly inputId = `input-${Math.random().toString(36).substring(2, 9)}`;

  value = '';
  private onChange = (value: string) => {};
  private onTouched = () => {};

  inputClasses() {
    const baseClasses = [
      'block',
      'w-full',
      'border',
      'rounded-md',
      'shadow-sm',
      'focus:ring-2',
      'focus:ring-offset-2',
      'focus:outline-none',
      'transition-colors',
      'duration-200',
      'dark:bg-gray-700',
      'dark:text-white',
      'dark:placeholder-gray-400',
    ];

    // Size classes
    const sizeClasses = {
      sm: ['px-3', 'py-1.5', 'text-sm'],
      md: ['px-3', 'py-2', 'text-sm'],
      lg: ['px-4', 'py-3', 'text-base'],
    };

    // State classes
    const stateClasses = this.error()
      ? [
          'border-red-300',
          'text-red-900',
          'placeholder-red-300',
          'focus:ring-red-500',
          'focus:border-red-500',
          'dark:border-red-600',
          'dark:text-red-100',
        ]
      : [
          'border-gray-300',
          'text-gray-900',
          'placeholder-gray-400',
          'focus:ring-blue-500',
          'focus:border-blue-500',
          'dark:border-gray-600',
          'dark:text-white',
        ];

    // Disabled classes
    const disabledClasses = this.disabled()
      ? [
          'bg-gray-50',
          'text-gray-500',
          'cursor-not-allowed',
          'dark:bg-gray-800',
        ]
      : [];

    return [
      ...baseClasses,
      ...sizeClasses[this.size()],
      ...stateClasses,
      ...disabledClasses,
    ].join(' ');
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
  }

  onBlur() {
    this.onTouched();
    this.onBlurOutput.emit();
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Angular will handle the disabled state via the input
  }
}
