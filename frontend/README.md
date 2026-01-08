# Crime Reporting & Tracking System - Frontend

A modern, responsive web application built with React and Tailwind CSS for reporting and tracking criminal activities online.

## Features

### 🔐 Authentication
- User registration with validation
- Login with email and password
- Session persistence
- Protected routes

### 📝 Complaint Management
- File new complaints with detailed information
- Upload evidence (images, videos, documents)
- Real-time preview of uploaded files
- Track complaint status
- View detailed complaint information
- Status timeline with police remarks

### 👤 User Dashboard
- Welcome message with user info
- Statistics cards (Total, Pending, Under Investigation, Resolved)
- List of all user complaints
- Quick access to file new complaint
- Profile management

### 🎨 UI/UX Features
- Fully responsive design (Desktop, Tablet, Mobile)
- Dark/Light mode toggle
- Modern card-based layout
- Status badges with color coding:
  - Pending (Yellow)
  - Under Investigation (Blue)
  - Resolved (Green)
  - Rejected (Red)
- Toast notifications for user feedback
- Smooth animations and transitions
- Clean and professional design

### 🛠️ Technical Features
- React 18 with functional components and hooks
- React Router v6 for navigation
- Context API for state management (Auth, Theme, Toast)
- Tailwind CSS for styling
- Lucide React for icons
- Vite for fast development
- No backend required (uses dummy data)

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Sidebar.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       ├── TextArea.jsx
│   │       ├── Select.jsx
│   │       ├── Card.jsx
│   │       ├── Badge.jsx
│   │       └── FileUpload.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── FileComplaint.jsx
│   │   ├── ComplaintDetails.jsx
│   │   └── Profile.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   └── ToastContext.jsx
│   ├── utils/
│   │   ├── constants.js
│   │   └── dummyData.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Installation

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Demo Credentials

For testing the application, use these credentials:

- **Email:** saukatmasi@gmail.com
- **Password:** password123

## Pages Overview

### 1. Home Page
- Hero section with call-to-action
- Feature highlights
- Statistics display
- How it works section
- Responsive navigation

### 2. Login Page
- Email and password fields
- Form validation
- Remember me option
- Link to registration
- Demo credentials display

### 3. Register Page
- Name, Email, Phone, Address, Password fields
- Confirm password validation
- Terms and conditions checkbox
- Link to login

### 4. Dashboard
- Welcome message
- Statistics cards
- List of user complaints
- Status badges
- Quick action button
- Sidebar navigation

### 5. File Complaint Page
- Crime title input
- Category dropdown
- Location field
- Detailed description textarea
- Evidence file upload with preview
- Form validation
- Important information section

### 6. Complaint Details Page
- Complete complaint information
- Status badge
- Evidence files list
- Status timeline with dates
- Police remarks section
- Back to dashboard button

### 7. Profile Page
- User information display
- Edit profile functionality
- Account information
- Danger zone (delete account)

## Component Documentation

### Reusable UI Components

#### Button
```jsx
<Button variant="primary" size="md">Click Me</Button>
```
Variants: primary, secondary, outline, danger, success
Sizes: sm, md, lg

#### Input
```jsx
<Input label="Email" type="email" error={error} />
```

#### Card
```jsx
<Card hover={true}>Content</Card>
```

#### Badge
```jsx
<Badge status="Pending" />
```

#### FileUpload
```jsx
<FileUpload multiple={true} accept="image/*,video/*" onChange={handleFileChange} />
```

## Features Implementation

### Dark Mode
- Toggle button in navbar
- Persists in localStorage
- Smooth transitions
- Tailwind's dark mode class strategy

### Toast Notifications
- Success/Error/Info types
- Auto-dismiss after 4 seconds
- Positioned top-right
- Slide-in animation
- Manual dismiss option

### File Upload
- Multiple file support
- Image preview
- Video preview
- Document display
- Remove functionality
- Drag and drop support

### Form Validation
- Real-time validation
- Error messages
- Field-level validation
- Submit prevention on errors

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Lazy loading for routes (can be added)
- Optimized images
- Minimal re-renders with React hooks
- Tailwind CSS purge in production

## Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Real-time notifications
- [ ] Admin panel
- [ ] Search and filter complaints
- [ ] Export complaints to PDF
- [ ] Multi-language support
- [ ] Push notifications
- [ ] Chat with police officers

## License

This project is created for educational purposes.

## Support

For any queries or support, contact: support@crimereport.gov.in
