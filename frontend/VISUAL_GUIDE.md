# Visual Guide - UI Overview

## 🎨 Page Previews (Text Description)

### 1. Home Page (Landing Page)

**Header Section:**
- Blue gradient background (primary-600 to primary-800)
- Large heading: "Report Crimes Online With Confidence"
- Subheading explaining the platform
- Two CTA buttons: "Get Started" and "Login"
- Large shield icon on the right

**Stats Section:**
- 4 statistics in a row
  - 10,000+ Complaints Filed
  - 8,500+ Cases Resolved
  - 95% Success Rate
  - 24/7 Support Available

**Features Section:**
- 6 feature cards in a 3-column grid
- Each card has:
  - Icon in a colored circle
  - Feature title
  - Description text
- Features: Easy Reporting, 24/7 Availability, Real-time Tracking, Secure & Confidential, Community Safety, Quick Response

**How It Works:**
- 4 numbered steps in a horizontal flow
- Step 01: Register
- Step 02: File Complaint
- Step 03: Track Status
- Step 04: Get Resolution
- Connected with lines

**Final CTA:**
- Blue background
- Large heading
- Call to action button

---

### 2. Login Page

**Layout:**
- Centered card on light background
- Shield icon at top
- "Welcome Back" heading
- Email input field with icon
- Password input field with icon
- Remember me checkbox
- Forgot password link
- Login button (full width, blue)
- "Don't have an account?" link to register
- Demo credentials box (blue background)

---

### 3. Register Page

**Layout:**
- Centered card (wider than login)
- Shield icon at top
- "Create Account" heading
- 2-column grid of inputs:
  - Full Name | Email
  - Phone | Address
  - Password | Confirm Password
- Terms checkbox
- Create Account button (full width, blue)
- "Already have an account?" link to login

---

### 4. Dashboard

**Left Sidebar:**
- White background with shadow
- Navigation items with icons:
  - Dashboard (house icon)
  - File Complaint (plus icon)
  - Profile (user icon)
- Active item highlighted in blue

**Main Content:**
- Welcome message: "Welcome back, [Name]!"
- 4 stat cards in a row:
  - Total Complaints (blue)
  - Pending (yellow)
  - Under Investigation (blue)
  - Resolved (green)
- File New Complaint button
- Complaints list:
  - Each complaint in a card
  - Title, ID, date at top
  - Status badge (colored)
  - Category and location
  - Description preview
  - "View Details" button

---

### 5. File Complaint Page

**Layout:**
- Sidebar on left
- Main form area:
  - Page title and description
  - Crime Title input
  - Category dropdown | Location input (2 columns)
  - Description textarea (large, 6 rows)
  - File upload area with drag-drop
    - Shows previews of uploaded files
    - Remove button on each file
  - Important information box (blue background)
  - Submit and Cancel buttons

---

### 6. Complaint Details Page

**Layout:**
- Sidebar on left
- Back button at top
- Header card:
  - Title with status badge
  - Complaint ID
  - 3 info items: Date | Category | Location
- Description card:
  - Full complaint description
- Evidence card (if files exist):
  - List of files with view buttons
- Status Timeline card:
  - Vertical timeline with dots
  - Each entry shows:
    - Status badge
    - Date/time
    - Remarks
  - Color-coded dots
- Police Remarks card:
  - Blue background
  - Full remarks text

---

### 7. Profile Page

**Layout:**
- Sidebar on left
- Page title
- Profile card:
  - Avatar circle (top left)
  - Name and User ID
  - Edit Profile button (top right)
  - 2-column grid of info:
    - Name | Email
    - Phone | Address
  - When editing: Input fields appear
  - Save and Cancel buttons
- Account Information card:
  - Account Status: Active
  - Member Since
  - Last Login
- Danger Zone card:
  - Red border
  - Delete Account button

---

## 🎨 Color Scheme

### Primary Colors
- Primary Blue: #3b82f6 (buttons, links, accents)
- Primary Blue Dark: #1d4ed8 (hover states)

### Status Colors
- Pending: Yellow (#fef3c7 background, #92400e text)
- Under Investigation: Blue (#dbeafe background, #1e40af text)
- Resolved: Green (#d1fae5 background, #065f46 text)
- Rejected: Red (#fee2e2 background, #991b1b text)

### Neutral Colors
- Background Light: #f9fafb
- Background Dark: #111827
- Text Light: #1f2937
- Text Dark: #f9fafb
- Border Light: #e5e7eb
- Border Dark: #374151

---

## 📐 Layout Patterns

### Card Style
- Background: White (light) / Gray-800 (dark)
- Border radius: 12px
- Shadow: Medium
- Padding: 24px
- Hover: Slight lift + stronger shadow

### Button Style
- Border radius: 8px
- Padding: 8px 16px (medium)
- Font weight: 500
- Transition: All properties 200ms
- Shadow on primary buttons

### Input Style
- Border: 1px solid gray-300
- Border radius: 8px
- Padding: 8px 16px
- Focus: 2px ring in primary color
- Transitions: All properties

### Badge Style
- Border radius: 9999px (pill)
- Padding: 4px 12px
- Font size: 12px
- Font weight: 500
- Status-based colors

---

## 🔤 Typography

### Headings
- H1: 3xl (30px), Bold
- H2: 2xl (24px), Bold
- H3: xl (20px), Semibold

### Body Text
- Regular: Base (16px), Regular
- Small: sm (14px), Regular
- Tiny: xs (12px), Regular

### Font Family
- Default: System fonts (sans-serif)

---

## 📱 Responsive Breakpoints

### Mobile (< 768px)
- Single column layouts
- Hamburger menu
- Stacked form fields
- Hidden sidebar (can add mobile menu)

### Tablet (768px - 1024px)
- 2-column grids
- Side-by-side layouts
- Visible navbar

### Desktop (> 1024px)
- 3-4 column grids
- Sidebar + main content
- Maximum width: 1280px (7xl)

---

## ✨ Animations & Transitions

### Toast Notification
- Slide in from right
- Duration: 300ms
- Ease out timing

### Hover Effects
- Cards: Lift up 4px + stronger shadow
- Buttons: Darken color
- Links: Underline

### Page Transitions
- Smooth color transitions (200ms)
- Theme toggle smooth

### Loading States
- Opacity changes
- Disabled states with reduced opacity

---

## 🌓 Dark Mode

### Toggle Location
- Navbar (top right)
- Sun icon (light mode)
- Moon icon (dark mode)

### Color Changes
- Backgrounds invert
- Text inverts
- Borders adjust
- Cards become darker
- Shadows adjust
- All status colors have dark variants

---

## 🎯 Interactive Elements

### Forms
- Real-time validation
- Error messages below fields
- Red borders on errors
- Green checkmarks on success

### File Upload
- Drag and drop zone
- Dashed border
- Upload icon
- Preview grid (2-3 columns)
- Remove buttons on hover

### Navigation
- Active links highlighted
- Hover effects
- Smooth transitions
- Breadcrumbs (can be added)

### Buttons
- Hover states
- Active states
- Disabled states
- Loading states (can be added)

---

## 📋 Component Patterns

### Empty States
- Large icon (gray)
- Heading
- Description
- Call to action button

### Error States
- Red alert icon
- Error message
- Retry button

### Success States
- Green checkmark
- Success message
- Next action button

### Loading States
- Spinner (can be added)
- Skeleton screens (can be added)
- Disabled buttons

---

This visual guide describes the complete UI/UX of the application. All designs follow modern web design principles with clean layouts, proper spacing, and professional aesthetics.
