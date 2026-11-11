# Convexa

Convexa es un comunicador visual accesible que puede instalarse como aplicación web progresiva (PWA) y utilizarse sin conexión después de la primera visita. No requiere cuenta ni dependencias externas.

## Contenido del paquete

- `index.html`, `app.js`, `manifest.webmanifest`, `sw.js` e `icon.svg`: archivos del sitio web y de la PWA.
- `windows/Convexa.exe`: ejecutable autónomo para Windows x64; incluye la interfaz y no requiere Go ni una instalación adicional.
- `windows/install-windows.ps1` y `windows/uninstall-windows.ps1`: instalador y desinstalador por usuario para Windows.

## Instalar en Windows

1. Descomprime el ZIP en una carpeta de tu elección.
2. Abre PowerShell en esa carpeta y ejecuta:

   ```powershell
   powershell -NoProfile -ExecutionPolicy Bypass -File .\windows\install-windows.ps1
   ```

3. Usa el acceso directo **Convexa** del menú Inicio. La aplicación se instala en `%LOCALAPPDATA%\Programs\Convexa`; no requiere permisos de administrador.

Para quitarla, abre el acceso directo **Desinstalar Convexa** del menú Inicio o ejecuta:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\windows\uninstall-windows.ps1
```

La desinstalación elimina la aplicación y sus accesos directos. No elimina los datos que la PWA pudiera guardar por separado en un navegador; esos datos se gestionan desde la configuración del navegador. Antes de borrar datos del navegador, exporta un respaldo desde Convexa.

## Publicar el sitio web

Los archivos del sitio están en la raíz del paquete. Publícalos en un alojamiento de sitios estáticos con HTTPS:

- **GitHub Pages:** crea o usa un repositorio, sube los archivos del sitio a la raíz, y en **Settings → Pages** elige desplegar desde la rama principal y la carpeta `/(root)`. Espera a que termine el despliegue y abre la dirección HTTPS que proporciona GitHub.
- **Netlify:** crea un sitio mediante despliegue manual y arrastra la carpeta que contiene `index.html` al área de publicación. Usa la dirección HTTPS que proporciona Netlify.

Para la web basta con `index.html`, `app.js`, `manifest.webmanifest`, `sw.js` e `icon.svg`. El ejecutable de Windows no es necesario para publicar la página. No publiques información privada ni respaldos personales. Después de publicar, abre el sitio una vez con conexión para que la PWA guarde su interfaz y pueda funcionar sin conexión.

## Probar localmente

El service worker requiere HTTPS o `localhost`. Con Python 3 instalado, desde la raíz del proyecto ejecuta:

```sh
python3 -m http.server 8000
```

Abre `http://localhost:8000`.

## Instalar como PWA en otros dispositivos

La PWA requiere que el sitio esté publicado mediante HTTPS:

- **Android:** abre el sitio en Chrome y elige **Instalar aplicación** o **Añadir a pantalla de inicio**. Para desinstalarla, mantén pulsado el icono o usa **Ajustes → Aplicaciones**.
- **iPhone/iPad:** abre el sitio en Safari y pulsa **Compartir → Añadir a pantalla de inicio**. Para quitarla, elimínala desde la pantalla de inicio.
- **Mac:** en Safari, usa **Archivo → Añadir al Dock** (macOS Sonoma o posterior); en Chrome, usa **Instalar página como aplicación**. Para quitarla, elimínala desde el Dock, Aplicaciones o Chrome.
- **Windows:** también puedes instalar la web desde el menú de Edge o Chrome. Para quitar esa PWA, desinstálala desde la configuración de aplicaciones del navegador o de Windows.

La PWA y el ejecutable de Windows son instalaciones separadas. El ejecutable local deja de servir la aplicación al cerrar su ventana; la PWA se abre desde el navegador.

## Datos y pictogramas

Los tableros, preferencias e imágenes que agregues se guardan en el dispositivo y pueden perderse al borrar los datos del navegador. Usa la opción **Respaldo** para exportarlos o restaurarlos. La voz depende de las voces instaladas en el sistema.

Convexa no descarga pictogramas automáticamente. Para usar recursos de ARASAAC, descárgalos desde [ARASAAC](https://arasaac.org/) e impórtalos en la biblioteca; revisa las condiciones vigentes de atribución y uso de cada recurso.
