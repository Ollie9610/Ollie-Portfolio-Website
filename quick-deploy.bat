@echo off
echo 🚀 Quick Deploy - Portfolio Website
echo ===================================
echo.

echo 📦 Building website...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed! Check for errors above.
    echo.
    echo 💡 Try running 'npm start' first to check for errors
    pause
    exit /b 1
)

echo ✅ Build successful!
echo.

echo 📁 Opening build folder...
start explorer build

echo.
echo 🎉 Ready to upload!
echo.
echo 📋 Upload to cPanel:
echo 1. Select all files in the build folder
echo 2. Copy them to your cPanel file manager
echo 3. Paste into your public_html directory
echo 4. Replace existing files when prompted
echo.
echo ✨ Your website will be updated!
echo.
pause
