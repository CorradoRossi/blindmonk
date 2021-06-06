type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

type MonitizeEvent = {
  id: string;
  username: string;
  value: number;
  transactionHash: string;
};

export const pageview = (url: URL) => {
  window.gtag("config", "G-987ZYVWHSD", {
    page_path: url,
  });
};

export const event = ({ action, category, label, value }: GTagEvent) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const donation = ({
  id,
  username,
  value,
  transactionHash,
}: MonitizeEvent) => {
  window.gtag("event", "purchase", {
    currency: "USD",
    transaction_id: transactionHash,
    value: value,
    items: [
      {
        item_id: id,
        item_name: username,
        price: value,
        currency: "USD",
        quantity: 1,
      },
    ],
  });
};