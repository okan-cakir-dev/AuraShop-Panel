@echo off
title AuraShop Yonetim Paneli
echo =========================================
echo    AuraShop Yonetim Paneli Baslatiliyor
echo =========================================
echo.

if not exist "node_modules" (
    echo [!] Sistem altyapisi (node_modules) bulunamadi.
    echo [!] Otomatik kurulum basliyor, lutfen bekleyin...
    npm install
    echo.
    echo [+] Kurulum tamamlandi!
)

echo [*] Panel ayaga kaldiriliyor...
npm run dev
pause