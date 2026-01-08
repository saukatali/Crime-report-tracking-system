# Quick Start Guide

## Getting Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd "E:\BCA PROJECT\frontend"
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The application will open automatically in your browser at `http://localhost:3000`

### Step 3: Login and Explore

Use these demo credentials to login:
- **Email:** saukatmasi@gmail.com
- **Password:** password123

## What You'll See

### 1. Home Page (Landing Page)
- Beautiful hero section
- Feature highlights
- Statistics
- How it works section
- Call-to-action buttons

### 2. After Login - Dashboard
- Welcome message with your name
- 4 statistics cards showing complaint counts
- List of your complaints with status badges
- Quick action button to file new complaint
- Sidebar navigation

### 3. File a Complaint
- Fill in crime details (title, category, location, description)
- Upload evidence files (images, videos, documents)
- See preview of uploaded files
- Submit and get reference ID

### 4. View Complaint Details
- Click "View Details" on any complaint
- See complete information
- View status timeline
- Read police remarks
- See uploaded evidence

### 5. Profile Page
- View your information
- Edit profile details
- Account information

## Features to Try

1. **Dark Mode Toggle** - Click the sun/moon icon in the navbar
2. **File Upload** - Upload images/videos when filing complaint
3. **Form Validation** - Try submitting forms with empty fields
4. **Toast Notifications** - See success/error messages
5. **Responsive Design** - Resize your browser or try on mobile
6. **Navigation** - Use sidebar in dashboard to navigate
7. **Status Badges** - See different colored badges for different statuses

## Keyboard Shortcuts

- Use Tab to navigate between form fields
- Press Enter to submit forms
- Press Escape to close modals (if any)

## Need Help?

Check the README.md file for detailed documentation.

## Troubleshooting

### Port Already in Use
If port 3000 is busy, Vite will automatically use the next available port (3001, 3002, etc.)

### Dependencies Not Installing
Try deleting `node_modules` and `package-lock.json`, then run `npm install` again.

### Build Errors
Make sure you have Node.js version 16 or higher installed.
