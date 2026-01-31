import type { NextApiRequest, NextApiResponse } from 'next';

type TransactionItem = {
  price: number;
  quantity: number;
  taxable: boolean;
};

type TransactionRequest = {
  items: TransactionItem[];
  tip_percentage: number;
  split_count: number;
};

type TransactionResponse = {
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  per_person_share: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TransactionResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { items, tip_percentage, split_count } = req.body as TransactionRequest;

  if (!items || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid items array' });
  }

  // Logic extracted from Bill-Calculator / Cashier repositories
  // Calculates subtotal, conditional tax (some items might be non-taxable groceries), and gratuity

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Simple tax logic (e.g. 8.875% NYC sales tax) - in prod this comes from tax service
  const taxable_amount = items
    .filter(i => i.taxable)
    .reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = taxable_amount * 0.08875;

  const tip = subtotal * (tip_percentage / 100);
  const total = subtotal + tax + tip;

  const per_person_share = split_count > 0 ? total / split_count : total;

  res.status(200).json({
    subtotal: Number(subtotal.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    tip: Number(tip.toFixed(2)),
    total: Number(total.toFixed(2)),
    per_person_share: Number(per_person_share.toFixed(2)),
  });
}
