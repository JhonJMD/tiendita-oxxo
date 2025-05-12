#!/bin/bash

# Script para extraer archivos importantes de un proyecto React con Vite
# Guarda todos los archivos en una carpeta plana y crea un archivo de rutas

# Colores para mensajes
VERDE='\033[0;32m'
AMARILLO='\033[0;33m'
ROJO='\033[0;31m'
NC='\033[0m' # Sin Color

# Directorio base (por defecto: directorio actual)
DIR_BASE="${1:-$PWD}"
# Directorio destino
FECHA=$(date +"%Y%m%d_%H%M%S")
DIR_DESTINO="react_vite_archivos_${FECHA}"

# Crear directorio destino
mkdir -p "$DIR_DESTINO"

# Archivo para guardar las rutas originales
RUTAS_FILE="$DIR_DESTINO/rutas_originales.txt"
echo "# Rutas originales de los archivos" > "$RUTAS_FILE"
echo "# Formato: NOMBRE_ARCHIVO -> RUTA_ORIGINAL" >> "$RUTAS_FILE"
echo "# Fecha de extracción: $(date)" >> "$RUTAS_FILE"
echo "# Directorio base: $DIR_BASE" >> "$RUTAS_FILE"
echo "" >> "$RUTAS_FILE"

echo -e "${VERDE}Extrayendo archivos de $DIR_BASE a $DIR_DESTINO...${NC}"

# Contador de archivos
CONTADOR=0

# Función para extraer archivos relevantes
extraer_archivos() {
    local patron="$1"
    local descripcion="$2"
    
    echo -e "${VERDE}Buscando $descripcion...${NC}"
    
    find "$DIR_BASE" -type f -name "$patron" \
    -not -path "*/node_modules/*" \
    -not -path "*/dist/*" \
    -not -path "*/build/*" \
    -not -path "*/.git/*" \
    -not -path "*/.vscode/*" \
    -not -path "*/.idea/*" \
    -not -path "*/coverage/*" \
    -not -path "*/.next/*" \
    -not -path "*/out/*" \
    -not -path "*/storybook-static/*" \
    -not -path "*/.cache/*" \
    -not -path "*/public/build/*" \
    -not -path "*/.npm/*" \
    -not -path "*/logs/*" \
    -print0 | while IFS= read -r -d $'\0' archivo; do
        # Obtener solo el nombre del archivo (sin ruta)
        nombre_base=$(basename "$archivo")
        
        # Si ya existe un archivo con el mismo nombre, añadir un sufijo
        if [ -f "$DIR_DESTINO/$nombre_base" ]; then
            # Extraer el directorio padre para usarlo como sufijo
            dir_padre=$(basename "$(dirname "$archivo")")
            nombre_base="${dir_padre}_${nombre_base}"
            
            # Si sigue existiendo, añadir un contador
            if [ -f "$DIR_DESTINO/$nombre_base" ]; then
                nombre_base="$(echo $nombre_base | sed 's/\.[^.]*$//')_${CONTADOR}.${nombre_base##*.}"
            fi
        fi
        
        # Copiar el archivo
        cp "$archivo" "$DIR_DESTINO/$nombre_base"
        
        # Registrar la ruta original
        echo "$nombre_base -> $archivo" >> "$RUTAS_FILE"
        
        # Incrementar el contador
        CONTADOR=$((CONTADOR + 1))
    done
}

# Extraer configuración de Vite
extraer_archivos "vite.config.*" "configuración de Vite"
extraer_archivos "*.config.js" "archivos de configuración JS"
extraer_archivos "*.config.ts" "archivos de configuración TS"

# Extraer archivos principales React
extraer_archivos "*.jsx" "archivos JSX"
extraer_archivos "*.tsx" "archivos TSX"
extraer_archivos "*.js" "archivos JavaScript"
extraer_archivos "*.ts" "archivos TypeScript"

# Extraer archivos de estilo
extraer_archivos "*.css" "archivos CSS"
extraer_archivos "*.scss" "archivos SASS"
extraer_archivos "*.less" "archivos LESS"
extraer_archivos "*.module.css" "archivos CSS modulares"
extraer_archivos "*.module.scss" "archivos SCSS modulares"
extraer_archivos "*.styled.js" "archivos Styled Components"
extraer_archivos "*.styled.ts" "archivos Styled Components TS"

# Extraer archivos de configuración
extraer_archivos "package.json" "archivo package.json"
extraer_archivos "package-lock.json" "archivo package-lock.json"
extraer_archivos "yarn.lock" "archivo yarn.lock"
extraer_archivos "pnpm-lock.yaml" "archivo pnpm-lock.yaml"
extraer_archivos ".env*" "archivos de entorno"
extraer_archivos "tsconfig.json" "archivo tsconfig.json"
extraer_archivos ".eslintrc*" "configuración ESLint"
extraer_archivos ".prettierrc*" "configuración Prettier"
extraer_archivos "tailwind.config.*" "configuración Tailwind"
extraer_archivos "postcss.config.*" "configuración PostCSS"

# Extraer archivos de documentación
extraer_archivos "*.md" "archivos Markdown"
extraer_archivos "README*" "archivo README"

# Extraer archivos HTML
extraer_archivos "*.html" "archivos HTML"

# Extraer archivos de pruebas
extraer_archivos "*.test.*" "archivos de test"
extraer_archivos "*.spec.*" "archivos de spec"

# Extraer archivos Docker
extraer_archivos "Dockerfile" "Dockerfile"
extraer_archivos "docker-compose*" "docker-compose"

# Extraer archivos relacionados con API/servidor
extraer_archivos "*.api.*" "archivos de API"
extraer_archivos "api/*" "archivos en carpeta API"
extraer_archivos "server/*" "archivos en carpeta server"

# Extraer archivos de tipos
extraer_archivos "*.d.ts" "archivos de definición de tipos"

# Extraer archivos JSON de datos
extraer_archivos "*.json" "archivos JSON"

# Archivos SVG que podrían ser componentes importantes
extraer_archivos "*.svg" "archivos SVG"

# Crear un archivo de información adicional
echo "# Información sobre el proyecto React/Vite" > "$DIR_DESTINO/info.txt"
echo "Fecha de extracción: $(date)" >> "$DIR_DESTINO/info.txt"
echo "Directorio base: $DIR_BASE" >> "$DIR_DESTINO/info.txt"
echo "Total de archivos: $CONTADOR" >> "$DIR_DESTINO/info.txt"

# Intentar determinar información adicional sobre el proyecto
if [ -f "$DIR_BASE/package.json" ]; then
    echo "# Dependencias y scripts (extraídos de package.json):" >> "$DIR_DESTINO/info.txt"
    
    # Si jq está instalado, usarlo para extraer información más detallada
    if command -v jq &> /dev/null; then
        echo "## Versiones principales:" >> "$DIR_DESTINO/info.txt"
        echo "React: $(jq -r '.dependencies.react // "No especificado"' "$DIR_BASE/package.json")" >> "$DIR_DESTINO/info.txt"
        echo "React DOM: $(jq -r '.dependencies."react-dom" // "No especificado"' "$DIR_BASE/package.json")" >> "$DIR_DESTINO/info.txt"
        echo "Vite: $(jq -r '.devDependencies.vite // "No especificado"' "$DIR_BASE/package.json")" >> "$DIR_DESTINO/info.txt"
        
        echo "## Scripts disponibles:" >> "$DIR_DESTINO/info.txt"
        jq -r '.scripts | to_entries | .[] | "- " + .key + ": " + .value' "$DIR_BASE/package.json" >> "$DIR_DESTINO/info.txt"
    else
        # Si jq no está disponible, usar grep para extraer información básica
        echo "Para obtener información más detallada, instale jq: sudo apt install jq" >> "$DIR_DESTINO/info.txt"
        echo "Contenido básico del package.json:" >> "$DIR_DESTINO/info.txt"
        grep -A 5 "\"dependencies\"" "$DIR_BASE/package.json" >> "$DIR_DESTINO/info.txt"
    fi
fi

# Comprimir todos los archivos
ZIP_ARCHIVO="${DIR_DESTINO}.zip"
echo -e "${VERDE}Comprimiendo archivos en $ZIP_ARCHIVO...${NC}"
zip -r "$ZIP_ARCHIVO" "$DIR_DESTINO" > /dev/null

# Resumen
echo ""
echo -e "${VERDE}¡Proceso completado!${NC}"
echo "Se han extraído $CONTADOR archivos"
echo "Carpeta de archivos: $DIR_DESTINO"
echo "Archivo ZIP: $ZIP_ARCHIVO"
echo "Archivo con rutas originales: $RUTAS_FILE"
echo ""
echo "Consejo: Al cargar estos archivos a una IA, menciona que es un proyecto React con Vite"
echo "y explica brevemente la funcionalidad principal de la aplicación."