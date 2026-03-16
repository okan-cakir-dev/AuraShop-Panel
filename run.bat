@echo off
title NovaStore Yonetim Paneli
color 0A

echo =======================================================
echo       NOVASTORE YONETIM PANELI BASLATILIYOR...
echo =======================================================
echo.
echo Sunucu ayaga kaldiriliyor, lutfen bekleyin...
echo Tarayici otomatik olarak acilacaktir.
echo.

:: Vite sunucusunu başlatır ve tarayıcıyı otomatik açar (--open)
npm run dev -- --open

pause