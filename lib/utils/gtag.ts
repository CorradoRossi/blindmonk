import { GTagEvent, MonitizeEvent } from '@lib/types';

export const pageview = (url: URL) => {
  // @ts-ignore
  window.gtag('config', 'G-98XXXXXXXX', {
    page_path: url
  });
};

export const event = ({ action, category, label, value }: GTagEvent) => {
  // @ts-ignore
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value
  });
};

export const donation = ({ id, username, value, transactionHash }: MonitizeEvent) => {
  // @ts-ignore
  window.gtag('event', 'purchase', {
    currency: 'USD',
    transaction_id: transactionHash,
    value: value,
    items: [
      {
        item_id: id,
        item_name: username,
        price: value,
        currency: 'USD',
        quantity: 1
      }
    ]
  });
};
