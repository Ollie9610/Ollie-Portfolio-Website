@echo off
echo 🌐 Starting Portfolio Website
echo =============================
echo.

echo 📦 Installing dependencies (if needed)...
call npm install

echo.
echo 🚀 Starting development server...
echo.
echo ✅ Your site will open at: http://localhost:3000
echo.
echo 💡 Keep this window open while editing
echo    Press Ctrl+C to stop the server
echo.

call npm start
