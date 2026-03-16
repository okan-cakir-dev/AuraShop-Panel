@echo off
title AuraShop Yonetim Paneli
echo ===============================================
echo        AURASHOP SISTEM KONTROL MERKEZI
echo ===============================================
echo.

:: 1. Adim: Dosya Kontrolu
if not exist "package.json" (
    color 0C
    echo [HATA] package.json bulunamadi! 
    echo Lutfen run.bat dosyasinin proje ana klasorunde oldugundan emin olun.
    echo.
    pause
    exit
)

:: 2. Adim: Node.js Kontrolu
node -v >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [HATA] Node.js bilgisayarda kurulu degil!
    echo Lutfen https://nodejs.org/ adresinden Node.js kurun.
    echo.
    pause
    exit
)

:: 3. Adim: Paket Kontrolü ve Kurulum
if not exist "node_modules" (
    echo [!] Moduller eksik. Kurulum basliyor...
    echo Bu islem internet hizina gore 1-2 dakika surebilir.
    call npm install
    echo [+] Kurulum tamamlandi.
)

:: 4. Adim: Baslatma
echo [*] AuraShop ayaga kaldiriliyor...
echo.
call npm run dev
pause