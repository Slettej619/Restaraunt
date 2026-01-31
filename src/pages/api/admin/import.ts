import type { NextApiRequest, NextApiResponse } from 'next';
import { parseCSV, transformToUniversalSchema } from '../../../lib/importers';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
      const { csv_data, context = 'hospitality' } = req.body;

      if (!csv_data) {
          return res.status(400).json({ error: 'Missing csv_data' });
      }

      // 1. Parse Raw CSV
      const rawProducts = parseCSV(csv_data);
      console.log(`[Import] Parsed ${rawProducts.length} items from CSV.`);

      // 2. Transform to Universal Schema
      const universalEntities = transformToUniversalSchema(rawProducts, context);
      console.log(`[Import] Transformed to ${context} schema.`);

      // 3. (Mock) Batch Write to Firestore
      // await firestore.collection('restaurants/{id}/menu').batchWrite(universalEntities);

      res.status(200).json({
          success: true,
          count: universalEntities.length,
          preview: universalEntities.slice(0, 3)
      });
  } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message || 'Import failed' });
  }
}
