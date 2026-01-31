# Developer Wiki: The Unified Polymorphic Engine

## 1. The Universal Schema
The core of the engine is the `UniversalEntity`—a JSON structure that changes shape based on its `context_token`.

### Schema Definition (`src/core/schemas.json`)

```json
{
  "id": "UUID",
  "context_token": "hospitality | retail",
  "base_traits": {
    "canonical_name": "String",
    "base_price": "Number",
    "assets": { "product_hero": "URL", "model_glb": "URL" }
  },
  "hospitality_traits": {
    "cook_time": "Minutes",
    "mod_groups": [ { "name": "Sides", "max": 2 } ]
  },
  "retail_traits": {
    "sku": "String",
    "weight_unit": "kg | lb",
    "aisle_coordinate": "A1-4"
  }
}
```

## 2. API Reference

### Transaction Engine
**POST** `/api/pos/transaction`

Calculates totals, taxes, and splits for a set of items.

**Request:**
```json
{
  "items": [{ "price": 10, "quantity": 2, "taxable": true }],
  "tip_percentage": 15,
  "split_count": 2
}
```

**Response:**
```json
{
  "subtotal": 20.00,
  "tax": 1.78,
  "tip": 3.00,
  "total": 24.78,
  "per_person_share": 12.39
}
```

### Theme Pipeline
**POST** `/api/theme/update`

Accepts a `ThemeManifest` and updates the active frontend design tokens.

**Request:**
```json
{
  "theme_id": "taco_shop_v1",
  "brand_identity": {
    "colors": { "primary": "#ff5722" },
    "typography": { "font_family_heading": "Roboto" }
  }
}
```

## 3. Component Architecture

### `MenuViewer.tsx`
*   **Role:** The main customer interface.
*   **Behaviors:**
    *   **2D Mode:** Standard grid/list view (responsive).
    *   **3D Mode:** Renders GLB files in a React Three Fiber canvas.
    *   **Logic:** Uses `src/lib/store.ts` to dispatch `addItem` actions to the Cart.

### `AdminLayout.tsx`
*   **Role:** The shell for all `/admin/*` routes.
*   **Features:**
    *   Collapsible sidebar.
    *   Context-aware header.
    *   Authentication guard (Mocked for now, integrate Firebase Auth here).

## 4. Extension Guide

### Adding a New Context (e.g., "Service Industry")
1.  Update `src/core/schemas.json`: Add `service_traits` (e.g., `duration_hours`, `resource_required`).
2.  Update `src/lib/importers.ts`: Add CSV parsing logic for the new fields.
3.  Update `MenuViewer.tsx`: Add a conditional render for the new card type (e.g., "Book Appointment" instead of "Add to Cart").

### Integrating Real Hardware
To connect physical receipt printers:
1.  Use the WebUSB API in `src/pages/admin/pos.tsx`.
2.  Or use a local proxy server to send ESC/POS commands from the browser.
