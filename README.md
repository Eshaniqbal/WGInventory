# WG Inventory Management

A modern inventory management system for Women's Gallery, built with Next.js, React, and MongoDB Atlas.

## Features

- **Admin Authentication**: Secure login for admin access (username: `womensgallery`, password: `12345`).
- **Inventory Management**: Add, edit, delete, and view products.
- **Bulk Upload**: Upload inventory items via CSV file.
- **Mobile Responsive**: Fully responsive UI for desktop and mobile.
- **Theme Switcher**: Toggle between light and dark mode.
- **Dashboard**: Visual overview of inventory with product quantity chart.
- **MongoDB Atlas**: Cloud database for all inventory data.

## Getting Started

### 1. Clone the repository
```bash
 git clone <repo-url>
 cd WGInventory
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure MongoDB Atlas
Create a `.env.local` file in the project root with your MongoDB URI:
```
MONGODB_URI=mongodb+srv://wginventory:eshan123@cluster0.fi1e69v.mongodb.net/wginventory?retryWrites=true&w=majority
```

### 4. Run the development server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- **Login**: Go to `/login` and use the admin credentials.
- **Inventory**: Add, edit, delete, and bulk upload products.
- **Bulk Upload**: Download the sample CSV, fill in your products, and upload.
- **Theme**: Use the toggle in the sidebar or login page.
- **Logout**: Use the logout button in the sidebar footer.
datastorage is at minmindbill@gmail.com
## Tech Stack
- Next.js (App Router)
- React
- MongoDB Atlas
- Tailwind CSS
- Recharts (for dashboard chart)

## License
MIT
