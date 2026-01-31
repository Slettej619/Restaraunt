# Merged Features & Provenance Report

This system is a **Unified Polymorphic Engine** constructed by distilling logic from the following repositories:

## 1. Logistics & Transaction Engine
*   **Source:** `rnshalinda/Restaurant-Bill-Calculator-Cashier-system`, `BryanTheLai/RestaurantProject`
*   **Target:** `src/pages/api/pos/transaction.ts`
*   **Features Kept:**
    *   Split-check logic.
    *   Tax calculation (conditional based on item type).
    *   Gratuity/Tip algorithms.
    *   Rounding logic for currency.

## 2. Adaptive UX Core (The "Volumetric Menu")
*   **Source:** `lovnishverma/digital-restaurant-menu`, `kaje94/menufic`, `danroxha/digital-menu`
*   **Target:** `src/components/MenuViewer.tsx`
*   **Features Kept:**
    *   Carousel view logic (from lovnish).
    *   Grid/List toggle (from kaje94).
    *   Asset handling structure (from danroxha).
    *   **Enhancement:** Upgraded to React Three Fiber (R3F) for 3D model support when `r3f_menu` is enabled in the theme.

## 3. Order Flow Service
*   **Source:** `GreatStackDev/QuickCart`, `yuiyuuuu/snack_website_frontend_remake`, `sergeyCodenameOne/UberEatsClone`
*   **Target:** `src/components/Cart.tsx`, `src/lib/store.ts`
*   **Features Kept:**
    *   Persistent Cart State (migrated Redux logic to Zustand).
    *   Quantity adjustments (+/-).
    *   Price summation.
    *   Glassmorphic UI styling support (via ThemeProvider).

## 4. Management Console & Admin (Architecture Only)
*   **Source:** `pgast/dash-tabs`, `BryanTheLai/RestaurantProject`
*   **Target:** `src/pages/api/theme/update.ts` (Admin Pipeline)
*   **Features Kept:**
    *   The concept of a central dashboard is now driven by the `manifest.json`.
    *   Admin updates are processed via the `update.ts` API, allowing for "Drop-and-Fork" rebranding.

## 5. Intelligence Layer (New)
*   **Implementation:** `src/core/schemas.json`
*   **Features:**
    *   Defined "Universal Entity" schema supporting both Hospitality (cooking temps, sides) and Retail (weight, aisle) traits.
    *   Ready for Vertex AI vector search integration.
