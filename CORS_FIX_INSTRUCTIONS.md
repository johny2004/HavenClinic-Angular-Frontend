# Solución al Error 415: Unsupported Media Type

## Problema
El backend está rechazando las peticiones del frontend porque:
1. ❌ La configuración CORS del backend tiene un placeholder `[TU-USUARIO]` sin reemplazar
2. ✅ El frontend YA fue actualizado para enviar JSON con los headers correctos

## Solución: Actualizar Backend

### Paso 1: Actualizar CorsConfig.java

Abre el archivo: `HavenClinic-Backend/src/main/java/puj/web/clinicahaven/security/CorsConfig.java`

Reemplaza la línea 24:
```java
config.addAllowedOrigin("https://[TU-USUARIO].github.io");
```

Con tu URL real de GitHub Pages. Basado en tu configuración, debería ser algo como:
```java
config.addAllowedOrigin("https://[TU-GITHUB-USERNAME].github.io");
```

**Ejemplo:** Si tu usuario de GitHub es "jonat", la línea quedaría:
```java
config.addAllowedOrigin("http://localhost:4200");
config.addAllowedOrigin("https://jonat.github.io");
```

### Configuración CORS Completa Recomendada:

```java
@Bean
public CorsFilter corsFilter() {
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    CorsConfiguration config = new CorsConfiguration();

    config.setAllowCredentials(true);
    
    // Permitir localhost para desarrollo
    config.addAllowedOrigin("http://localhost:4200");
    
    // Permitir GitHub Pages para producción - REEMPLAZA [TU-GITHUB-USERNAME]
    config.addAllowedOrigin("https://[TU-GITHUB-USERNAME].github.io");
    
    // Alternativamente, si quieres aceptar cualquier origen en desarrollo:
    // config.addAllowedOriginPattern("*");
    
    config.setAllowedHeaders(Arrays.asList(
        HttpHeaders.AUTHORIZATION,
        HttpHeaders.CONTENT_TYPE,
        HttpHeaders.ACCEPT
    ));
    
    config.setAllowedMethods(Arrays.asList(
        HttpMethod.GET.name(),
        HttpMethod.POST.name(),
        HttpMethod.PUT.name(),
        HttpMethod.DELETE.name(),
        HttpMethod.OPTIONS.name()
    ));
    
    config.setExposedHeaders(Arrays.asList(HttpHeaders.AUTHORIZATION));
    config.setMaxAge(3600L); // Cache preflight por 1 hora

    source.registerCorsConfiguration("/**", config);
    return new CorsFilter(source);
}
```

### Paso 2: Verificar PageController.java

Abre: `HavenClinic-Backend/src/main/java/puj/web/clinicahaven/controller/PageController.java`

La anotación `@CrossOrigin` en la línea 31 debería actualizarse o eliminarse (ya que CorsConfig maneja todo):

```java
@Controller
@CrossOrigin(origins = {"http://localhost:4200", "https://[TU-GITHUB-USERNAME].github.io"})
public class PageController {
    // ... resto del código
}
```

O simplemente eliminar `@CrossOrigin` ya que CorsConfig.java lo maneja globalmente.

### Paso 3: Redesplegar Backend

Después de hacer los cambios:

```bash
# En la carpeta del backend
git add .
git commit -m "Fix: Update CORS configuration for production"
git push
```

Render redesplegará automáticamente tu backend.

## Cambios YA Realizados en el Frontend ✅

El archivo `cliente.service.ts` fue actualizado para:
1. ✅ Enviar `Content-Type: application/json` explícitamente
2. ✅ Enviar datos en el formato correcto: `{ email, psw, userType }`
3. ✅ Incluir header `Accept: application/json`

## Cómo Probar

### Opción 1: Localmente (Desarrollo)
```bash
# Terminal 1: Backend
cd HavenClinic-Backend
mvn spring-boot:run

# Terminal 2: Frontend
cd HavenClinic-Angular-Frontend
npm start
```

Abre: `http://localhost:4200`

### Opción 2: Producción (GitHub Pages)
Después de actualizar el backend, accede a tu app desde:
`https://[TU-GITHUB-USERNAME].github.io/HavenClinic-Angular-Frontend/`

## ¿Cuál es tu usuario de GitHub?

Para darte la configuración exacta, necesito saber tu usuario de GitHub. Responde con tu usuario y actualizaré los archivos automáticamente.

## Verificación del URL del Frontend

Tu frontend desplegado debería estar en:
- **URL esperada:** `https://[TU-USUARIO].github.io/HavenClinic-Angular-Frontend/`

Puedes verificarlo en tu repositorio de GitHub:
1. Ve a Settings → Pages
2. Busca la sección "GitHub Pages"
3. El URL estará visible allí
