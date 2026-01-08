# Troubleshooting Guide

## Common Issues and Solutions

### Installation Issues

#### Problem: npm install fails
**Solutions:**
1. Check your Node.js version:
   ```bash
   node --version
   ```
   Must be v16.0.0 or higher

2. Clear npm cache:
   ```bash
   npm cache clean --force
   npm install
   ```

3. Delete node_modules and package-lock.json:
   ```bash
   Remove-Item -Recurse -Force node_modules, package-lock.json
   npm install
   ```

#### Problem: "Cannot find module" errors
**Solution:**
Make sure you're in the correct directory:
```bash
cd "E:\BCA PROJECT\frontend"
npm install
```

---

### Development Server Issues

#### Problem: Port 3000 already in use
**Solution:**
Vite will automatically use the next available port (3001, 3002, etc.)
Or manually kill the process using port 3000:
```bash
# Find process on port 3000
netstat -ano | findstr :3000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

#### Problem: Browser doesn't open automatically
**Solution:**
Manually open: http://localhost:3000
Or check the terminal for the actual port being used.

#### Problem: Hot reload not working
**Solution:**
1. Save the file again
2. Restart the dev server (Ctrl+C, then npm run dev)
3. Hard refresh browser (Ctrl+Shift+R)

---

### Build Issues

#### Problem: Build fails with Tailwind errors
**Solution:**
1. Check tailwind.config.js exists
2. Check postcss.config.js exists
3. Reinstall Tailwind:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

#### Problem: "Cannot resolve module" during build
**Solution:**
Check all import paths are correct and files exist.

---

### Runtime Issues

#### Problem: Login doesn't work
**Checklist:**
- [ ] Using correct demo credentials?
  - Email: saukatmasi@gmail.com
  - Password: password123
- [ ] Check browser console for errors
- [ ] Clear localStorage:
  ```javascript
  // In browser console
  localStorage.clear()
  ```

#### Problem: Dark mode not persisting
**Solution:**
Check localStorage is enabled in your browser:
```javascript
// In browser console
localStorage.setItem('test', 'value')
console.log(localStorage.getItem('test'))
```

#### Problem: Routes not working (404 on refresh)
**Solution:**
This is normal in development. The dev server handles this automatically.
For production, you need server configuration for SPA routing.

#### Problem: Images/Files not uploading
**Solution:**
This is a frontend-only app. Files show preview but don't actually upload to a server.
This is expected behavior.

---

### UI/Display Issues

#### Problem: Styles not applying
**Solutions:**
1. Check Tailwind CSS is installed:
   ```bash
   npm list tailwindcss
   ```

2. Check index.css imports Tailwind:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

3. Hard refresh browser (Ctrl+Shift+R)

#### Problem: Dark mode looks broken
**Solution:**
Check HTML has dark mode class:
```javascript
// In browser console
document.documentElement.classList.contains('dark')
```

#### Problem: Icons not showing
**Solution:**
Check lucide-react is installed:
```bash
npm list lucide-react
npm install lucide-react
```

#### Problem: Mobile menu not working
**Solution:**
1. Check browser console for errors
2. Try resizing browser window
3. Hard refresh

---

### Data Issues

#### Problem: No complaints showing in dashboard
**Solution:**
The dummy data is filtered by userId. The demo user (USER001) has 3 complaints.
Make sure you're logged in with the demo account.

#### Problem: Can't see complaint details
**Solution:**
Only complaints for the logged-in user are accessible.
Use complaint IDs: CMP001, CMP002, or CMP003

---

### Performance Issues

#### Problem: App is slow
**Solutions:**
1. Check if dev server is running in development mode
2. Close other browser tabs
3. Clear browser cache
4. Check browser console for errors

#### Problem: Large bundle size
**Solution:**
For production, run:
```bash
npm run build
```
Vite will optimize and tree-shake the code.

---

### Browser Compatibility

#### Problem: App doesn't work in older browsers
**Solution:**
This app requires a modern browser:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Update your browser to the latest version.

---

### Context/State Issues

#### Problem: User state not persisting
**Solution:**
1. Check localStorage in browser DevTools
2. Clear localStorage and login again:
   ```javascript
   localStorage.clear()
   ```

#### Problem: Toast notifications not showing
**Solution:**
1. Check ToastProvider wraps the app
2. Check browser console for errors
3. Try different notification types

---

### Form Issues

#### Problem: Form validation not working
**Solution:**
1. Check all required fields are filled
2. Check error messages below fields
3. Check browser console for validation errors

#### Problem: Can't submit form
**Checklist:**
- [ ] All required fields filled?
- [ ] Email format correct?
- [ ] Phone number format correct?
- [ ] Passwords match?
- [ ] Description long enough (50 characters)?

---

### Development Tips

#### Debugging
1. Open Browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for failed requests
4. Check Application tab for localStorage

#### Best Practices
1. Always check terminal for build errors
2. Clear browser cache when making config changes
3. Use React DevTools extension for debugging
4. Check mobile view using DevTools device emulation

---

## Getting Help

If you still have issues:

1. **Check the README.md** - Complete documentation
2. **Check the FEATURES.md** - See what's implemented
3. **Check browser console** - Look for error messages
4. **Clear everything and reinstall**:
   ```bash
   Remove-Item -Recurse -Force node_modules, package-lock.json
   npm cache clean --force
   npm install
   npm run dev
   ```

---

## Emergency Reset

If nothing works, complete reset:

```bash
# Navigate to frontend folder
cd "E:\BCA PROJECT\frontend"

# Remove everything except source files
Remove-Item -Recurse -Force node_modules, package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall
npm install

# Start fresh
npm run dev
```

Clear browser data:
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

---

## System Requirements

### Minimum Requirements
- Node.js 16.0.0+
- npm 7.0.0+
- 2GB RAM
- Modern browser
- Internet connection (for initial install)

### Recommended
- Node.js 18.0.0+
- npm 9.0.0+
- 4GB RAM
- Latest Chrome/Firefox
- Fast internet connection

---

## Error Messages Explained

### "Module not found"
- Missing dependency - run `npm install`

### "Cannot read property of undefined"
- Data not loaded - check dummy data
- Component not mounted - check routing

### "Failed to fetch"
- No backend (expected for this app)
- This is a frontend-only application

### "localStorage is not defined"
- Using SSR (not applicable here)
- Browser doesn't support localStorage

### "Unexpected token"
- Syntax error in code
- Check the file mentioned in error
- Run `npm run build` to see detailed errors

---

## Still Stuck?

The application is fully functional as delivered. If you're experiencing issues:

1. Compare your files with the original
2. Check you haven't modified any core files
3. Make sure all files from FILES.md are present
4. Verify Node.js and npm versions
5. Try on a different browser
6. Try on a different computer (to rule out environment issues)
