// src/lib/importers.ts

export interface ImportedProduct {
  name: string;
  price: number;
  description?: string;
  category?: string;
  sku?: string;
}

export function parseCSV(csvText: string): ImportedProduct[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

  // Basic heuristic mapping
  const nameIdx = headers.findIndex(h => h.includes('name') || h.includes('item') || h.includes('title'));
  const priceIdx = headers.findIndex(h => h.includes('price') || h.includes('cost'));
  const descIdx = headers.findIndex(h => h.includes('desc'));
  const catIdx = headers.findIndex(h => h.includes('cat') || h.includes('group'));
  const skuIdx = headers.findIndex(h => h.includes('sku') || h.includes('id'));

  if (nameIdx === -1 || priceIdx === -1) {
    throw new Error("CSV must contain at least 'Name' and 'Price' columns.");
  }

  const products: ImportedProduct[] = [];

  for (let i = 1; i < lines.length; i++) {
    const row = lines[i].split(',').map(c => c.trim()); // Naive split, doesn't handle quoted commas
    if (row.length < headers.length) continue;

    const price = parseFloat(row[priceIdx].replace('$', ''));

    if (row[nameIdx] && !isNaN(price)) {
      products.push({
        name: row[nameIdx],
        price: price,
        description: descIdx > -1 ? row[descIdx] : undefined,
        category: catIdx > -1 ? row[catIdx] : undefined,
        sku: skuIdx > -1 ? row[skuIdx] : undefined,
      });
    }
  }

  return products;
}

export function transformToUniversalSchema(imports: ImportedProduct[], context: 'hospitality' | 'retail') {
    return imports.map((item, index) => ({
        id: item.sku || `gen-${Date.now()}-${index}`,
        context_token: context,
        base_traits: {
            canonical_name: item.name,
            base_price: item.price,
            description: item.description || '',
            assets: {
                product_hero: '/assets/placeholder.png', // Default
                cart_thumbnail: '/assets/placeholder_thumb.png'
            }
        },
        // We'd infer more traits here based on context
        ...(context === 'hospitality' ? {
            hospitality_traits: {
                cook_time: 15,
                prep_station_id: 'default'
            }
        } : {
            retail_traits: {
                sku: item.sku || `SKU-${index}`,
                inventory_buffer: 5
            }
        })
    }));
}
