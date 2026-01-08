# Refresh environment variables and start dev server
Write-Host "Refreshing environment variables..." -ForegroundColor Cyan
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host "Checking Node.js and npm..." -ForegroundColor Cyan
node --version
npm --version

Write-Host ""
Write-Host "Starting development server..." -ForegroundColor Green
Write-Host "The app will open at http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Demo Credentials:" -ForegroundColor Cyan
Write-Host "Email: saukatmasi@gmail.com" -ForegroundColor White
Write-Host "Password: password123" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm run dev
