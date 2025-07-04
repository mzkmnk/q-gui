import { Injectable, inject } from '@angular/core';
import { StateService } from './state.service';
import { Notification, NotificationType } from '../interfaces';
import { UI_CONFIG } from '../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly stateService = inject(StateService);

  show(
    type: NotificationType,
    title: string,
    message: string,
    options?: {
      autoClose?: boolean;
      duration?: number;
    }
  ): string {
    const id = this.generateId();
    const notification: Notification = {
      id,
      type,
      title,
      message,
      timestamp: new Date(),
      autoClose: options?.autoClose ?? true,
      duration: options?.duration ?? UI_CONFIG.notifications.defaultDuration,
    };

    this.stateService.addNotification(notification);

    // Auto-remove notification after duration
    if (notification.autoClose && notification.duration) {
      setTimeout(() => {
        this.remove(id);
      }, notification.duration);
    }

    return id;
  }

  success(
    title: string,
    message: string,
    options?: { autoClose?: boolean; duration?: number }
  ): string {
    return this.show('success', title, message, options);
  }

  error(
    title: string,
    message: string,
    options?: { autoClose?: boolean; duration?: number }
  ): string {
    return this.show('error', title, message, { autoClose: false, ...options });
  }

  warning(
    title: string,
    message: string,
    options?: { autoClose?: boolean; duration?: number }
  ): string {
    return this.show('warning', title, message, options);
  }

  info(
    title: string,
    message: string,
    options?: { autoClose?: boolean; duration?: number }
  ): string {
    return this.show('info', title, message, options);
  }

  remove(id: string): void {
    this.stateService.removeNotification(id);
  }

  clear(): void {
    this.stateService.clearNotifications();
  }

  private generateId(): string {
    return `notification-${Date.now()}-${Math.random()
      .toString(36)
      .substring(2, 9)}`;
  }
}
