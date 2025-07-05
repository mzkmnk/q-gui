import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

export type IconName =
  | 'menu'
  | 'moon'
  | 'chat'
  | 'settings'
  | 'history'
  | 'attachment'
  | 'send'
  | 'document'
  | 'close';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'app-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIcon],
  template: ` <ng-icon [name]="iconName()" [class]="iconClasses()" /> `,
})
export class IconComponent {
  readonly name = input.required<IconName>();
  readonly size = input<IconSize>('md');
  readonly className = input<string>('');

  private readonly iconMap: Record<IconName, string> = {
    menu: 'tablerMenu2',
    moon: 'tablerMoon',
    chat: 'tablerMessage',
    settings: 'tablerSettings',
    history: 'tablerHistory',
    attachment: 'tablerPaperclip',
    send: 'tablerSend',
    document: 'tablerFile',
    close: 'tablerX',
  };

  iconClasses(): string {
    const sizeClasses = {
      xs: 'h-3 w-3',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
      xl: 'h-8 w-8',
    };

    const baseClasses = [
      'inline-block',
      'flex-shrink-0',
      sizeClasses[this.size()],
    ];

    if (this.className()) {
      baseClasses.push(this.className());
    }

    return baseClasses.join(' ');
  }

  iconName(): string {
    return this.iconMap[this.name()];
  }
}
