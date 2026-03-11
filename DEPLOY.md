# 🚀 Deploy Frontend a GitHub Pages

## Pasos Rápidos

### 1. Actualizar URL del Backend
Edita: `src/environments/environment.prod.ts`
```typescript
apiUrl: 'https://TU-URL-DE-RENDER.onrender.com'
```

### 2. (Opcional) Crear archivo .nojekyll
Este archivo le dice a GitHub Pages que no use Jekyll:
```bash
echo "" > dist/haven-angular/.nojekyll
```

### 3. Hacer commit de los cambios
```bash
git add .
git commit -m "Update production config"
git push origin main
```

### 4. Build y Deploy
```bash
npm run build:deploy
```

### 5. Verificar
Ve a: https://johny2004.github.io/HavenClinic-Angular-Frontend/

---

## Comandos Disponibles

```bash
# Build para producción solamente
npm run build:prod

# Deploy (después de build)
npm run deploy

# Build + Deploy en un comando
npm run build:deploy
```

---

## ⚠️ Nota Importante

**GitHub Pages tarda 2-3 minutos en actualizar** después de hacer deploy.

Si no ves cambios:
1. Espera 2-3 minutos
2. Limpia caché del navegador (Ctrl+Shift+R)
3. Verifica que la rama `gh-pages` exista en GitHub

---

## 🔧 Solución de Problemas

### Error: "gh-pages no instalado"
```bash
npm install --save-dev gh-pages
```

### Error: "Permission denied"
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
```

### No se ve la página en GitHub Pages
1. Ve a Settings → Pages en GitHub
2. Asegúrate que Source sea la rama `gh-pages`
3. Guarda y espera 2 minutos
