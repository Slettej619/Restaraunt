# Unified Polymorphic Engine (Jules-Native)

> A schema-agnostic, multi-tenant commerce operating system built on Google Cloud Platform.

## 🌍 Overview

This project represents the **"Structural Harvest"** of over 10 different open-source repositories. Instead of maintaining fragmented codebases for Restaurants, Grocery Stores, and Retail, this engine uses a **Universal Polymorphic Entity** to adapt its behavior based on context.

It fuses the best "DNA" from:
*   **UberEats Clones** (Logistics & Ordering)
*   **POS Systems** (Transaction Logic & Split-checks)
*   **Digital Menus** (Visual Hierarchy & R3F 3D Models)
*   **Admin Dashboards** (Inventory & Staff Management)

## 🏗 Architecture

*   **Frontend:** Next.js (React) + Tailwind CSS + Framer Motion (Animations)
*   **3D Experience:** React Three Fiber (R3F) for Volumetric Menus
*   **State Management:** Zustand (Cart & User Session)
*   **Backend:** Next.js API Routes (Serverless Functions)
*   **Database:** Firebase Firestore (NoSQL) + Vector Search (Vertex AI ready)
*   **Storage:** Firebase Storage (Assets)
*   **Authentication:** Firebase Auth

## 🚀 Key Features

### 1. The Polymorphic POS (`/admin/pos`)
A unified cashier interface that adapts to the business type.
*   **Source DNA:** `rnshalinda/Bill-Calculator`, `BryanTheLai/RestaurantProject`
*   **Capabilities:** Split-checks, Tax Logic, Gratuity, Table Management.

### 2. Volumetric Menu (`/`)
An interactive menu that toggles between 2D grids and 3D interactive models.
*   **Source DNA:** `lovnishverma/digital-menu`, `kaje94/menufic`
*   **Capabilities:** 3D GLB Model Viewer, Categories (Tabs), Search, Dietary Filters.

### 3. Visual Theme Builder (`/admin/builder`)
A "No-Code" style editor to re-skin the entire application instantly.
*   **Source DNA:** `nicojuhari/1food-menu-v2`
*   **Capabilities:** Live Preview, Color/Font Token injection, JSON Manifest generation.

### 4. QR Engine (`/admin/qr`)
Generates location-aware QR codes for "Order-to-Table" functionality.
*   **Source DNA:** `amratansh12/digital-menu`
*   **Capabilities:** Dynamic URL generation, Printable assets.

### 5. Universal Inventory (`/admin/inventory`)
A single database schema that handles:
*   **Hospitality:** Cook times, Mods (No onions), Stations.
*   **Retail:** SKUs, Weight, Aisle locations.

## 🛠 Installation & Setup

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-org/jules-unified-engine.git
    cd jules-unified-engine
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Firebase**
    *   Create a project at [console.firebase.google.com](https://console.firebase.google.com)
    *   Enable Firestore, Auth, and Storage.
    *   Download your `service-account.json` (for admin) or set up `.env.local`:
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:3000` for the Menu, `http://localhost:3000/admin/dashboard` for the Back Office.

## 📖 Documentation

For deep-dive developer guides, API references, and Schema definitions, please read the [WIKI.md](./WIKI.md).

## 🤝 Provenance

This project adheres to a "Non-Destructive" philosophy. No features were removed; they were translated.
See [MERGED_FEATURES.md](./MERGED_FEATURES.md) for a detailed breakdown of the source logic.

---
*Built with ❤️ by Jules*
