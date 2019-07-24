import { Subscription } from 'rxjs';

export const removeSubscription = (subscriptions: Subscription[]): void => {
  subscriptions.forEach(subscription => subscription.unsubscribe());
};
