# CLAUDE.md — Contexto del proyecto gitproblem

---

## 1. Visión del proyecto

gitproblem es un TUI (Terminal User Interface) interactivo y educativo para dominar git.
No es una cheatsheet. No es un tutorial pasivo. Es una herramienta donde el usuario
ejecuta comandos git REALES sobre repos REALES (temporales) y ve en tiempo real
cómo cambia el grafo de commits, las ramas, HEAD, el staging area y el working directory.

La filosofía central es: **aprender equivocándose**. Los desafíos están diseñados para
que el usuario cometa errores comunes (force push a main, rebase mal hecho, merge conflicts)
y luego aprenda a recuperarse. No simulamos git, usamos git de verdad.

---

## 2. Stack técnico y por qué

| Tecnología   | Rol                          | Por qué                                                    |
|------------- |------------------------------|------------------------------------------------------------|
| Node.js      | Runtime                      | El dev está en modo JS/TS, consistencia con su stack       |
| TypeScript   | Lenguaje                     | Aprendizaje paralelo, tipado ayuda a entender estructuras  |
| Ink v4       | Framework TUI                | JSX/React en terminal. Refuerza React para luego Next.js   |
| child_process| Ejecución de git             | Ejecuta comandos git reales, sin abstracciones             |
| chalk        | Colores en terminal          | Viene con Ink, colores para el grafo y estados             |
| fs/tmp       | Repos temporales             | Crea y destruye repos sandbox para cada desafío            |

**No usamos:** blessed (bajo nivel, no refuerza React), libgit2/nodegit (queremos
que el usuario vea los mismos comandos que usaría manualmente).

---

## 3. Arquitectura

```
gitproblem/
├── CLAUDE.md                  ← este archivo (contexto para IAs y devs)
├── package.json
├── tsconfig.json
├── src/
│   ├── index.tsx              ← entrada principal, router de pantallas
│   ├── app.tsx                ← componente raíz de Ink
│   │
│   ├── components/            ← componentes visuales del TUI
│   │   ├── Graph.tsx          ← renderiza el grafo de commits (COMPONENTE CENTRAL)
│   │   ├── StatusPanel.tsx    ← muestra git status (staging, working dir, HEAD)
│   │   ├── BranchList.tsx     ← lista de ramas con indicador de actual
│   │   ├── CommandInput.tsx   ← input donde el usuario escribe comandos git
│   │   ├── ExplanationBox.tsx ← panel con explicaciones y tips
│   │   └── Menu.tsx           ← menú principal de navegación
│   │
│   ├── challenges/            ← definición de desafíos educativos
│   │   ├── types.ts           ← interfaces TypeScript para desafíos
│   │   ├── registry.ts        ← registro central de todos los desafíos
│   │   ├── 01-branch-merge/   ← cada desafío en su carpeta
│   │   │   ├── setup.ts       ← crea el repo con el estado inicial
│   │   │   ├── steps.ts       ← pasos del desafío con validaciones
│   │   │   └── explain.ts     ← explicaciones para cada paso
│   │   ├── 02-rebase/
│   │   ├── 03-conflict/
│   │   ├── 04-stash/
│   │   ├── 05-cherry-pick/
│   │   ├── 06-reset-revert/
│   │   ├── 07-reflog/
│   │   └── 08-bisect/
│   │
│   ├── git/                   ← capa de interacción con git
│   │   ├── executor.ts        ← ejecuta comandos git via child_process
│   │   ├── parser.ts          ← parsea output de git (log, status, diff)
│   │   └── graph-builder.ts   ← construye estructura de datos del grafo
│   │
│   ├── sandbox/               ← gestión de repos temporales
│   │   ├── create.ts          ← crea repo temporal con historial predefinido
│   │   ├── destroy.ts         ← limpia repos temporales
│   │   └── validate.ts        ← verifica si el estado del repo es correcto
│   │
│   └── utils/                 ← utilidades generales
│       ├── colors.ts          ← paleta de colores del TUI
│       └── config.ts          ← configuración general
│
└── sandbox-repos/             ← directorio temporal (en .gitignore)
```

---

## 4. Datos: estructura de un desafío

Cada desafío es un objeto TypeScript con esta forma:

```typescript
interface Challenge {
  id: string;                    // "01-branch-merge"
  title: string;                 // "Merge vs Rebase: The Classic Dilemma"
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;         // "15 min"
  description: string;           // contexto del problema
  
  // Setup: comandos git que crean el estado inicial del repo
  setup: GitCommand[];           // ["git init", "git commit...", "git branch..."]
  
  // Pasos del desafío
  steps: ChallengeStep[];
}

interface ChallengeStep {
  instruction: string;           // qué le pedimos al usuario
  hint?: string;                 // pista si se atasca
  validation: {
    type: 'branch' | 'commit' | 'status' | 'log' | 'custom';
    expected: string;            // estado esperado del repo
  };
  onSuccess: string;             // explicación de qué hizo bien
  onFail: string;                // explicación de qué salió mal y por qué
  
  // Modo "error intencional": el paso QUIERE que el usuario se equivoque
  intentionalError?: {
    trapDescription: string;     // por qué este error es común
    recoverySteps: string[];     // cómo recuperarse
  };
}
```

---

## 5. Funcionalidades (roadmap)

### MVP (lo que construimos primero)
- [ ] Menú principal con lista de desafíos
- [ ] Visualizador de grafo de commits en tiempo real
- [ ] Panel de status (staging, working dir, HEAD, branch)
- [ ] Sandbox: crea/destruye repos temporales
- [ ] 1 desafío completo: branching + merge vs rebase
- [ ] Input de comandos git con ejecución real
- [ ] Validación de pasos completados

### Fase 2
- [ ] Desafíos: conflictos, stash, cherry-pick
- [ ] Explicaciones interactivas (se expanden/colapsan)
- [ ] Sistema de progreso (qué desafíos completaste)
- [ ] Animaciones en el grafo al hacer commits/merges

### Fase 3
- [ ] Desafíos: reset/revert, reflog, bisect
- [ ] Modo libre (sandbox sin desafío, solo explora)
- [ ] Exportar tu progreso
- [ ] Desafíos custom (que el usuario cree los suyos)

---

## 6. Idioma

- **Interfaz y desafíos:** inglés (profesional, portafolio, alcance global)
- **CLAUDE.md y comentarios de código:** español (herramienta de aprendizaje personal)
- **Commits de git del propio proyecto:** inglés (buena práctica profesional)

---

## 7. Perfil del desarrollador

- Nivel JS/TS: JS: junior-intermedio, ha hecho 4-6 proyectos pequeños, conoce el lenguaje pero aún se siente en proceso
- Nivel React: principiante (no ha usado React antes)
- Nivel git: comandos básicos OK, necesita dominar operaciones avanzadas
- Objetivo paralelo: aprender React/JSX construyendo este proyecto
- Aprendizaje preferido: hands-on, entiende mejor haciendo que leyendo

---

## 8. Modo de trabajo (pair programming)

**REGLA FUNDAMENTAL: el desarrollador quiere escribir código, no solo leerlo.**

Cuando trabajes con este proyecto:
1. **NO generes archivos completos sin explicar.** Propón la estructura, explica el por qué,
   y deja que el dev escriba las partes que pueda.
2. **Propón mini-retos de React.** Ejemplo: "Ahora crea un componente que reciba una prop
   'branchName' y la muestre en verde. Pista: usa <Text color='green'>".
3. **Explica cada hook y concepto React la primera vez que aparezca.**
   No asumas que sabe qué es useState, useEffect, props, etc.
4. **Si el dev se atasca, no des la respuesta directa.** Da pistas incrementales.
5. **Cada PR/commit es una oportunidad de enseñar git.** Sugiere buenas prácticas
   de commits, branches, y mensajes.
6. **Nivel de complejidad progresivo.** Empezar con componentes simples (texto estático)
   e ir agregando interactividad paso a paso.

---

## 9. Convenciones de código

- Componentes React: PascalCase (Graph.tsx, StatusPanel.tsx)
- Funciones utilitarias: camelCase (parseGitLog, createSandbox)
- Archivos de datos/config: kebab-case (graph-builder.ts, colors.ts)
- Un componente por archivo
- Props tipadas con interfaces (no usar `any`)
- Comentarios en español explicando la lógica compleja
- Commits: conventional commits en inglés (feat:, fix:, docs:, refactor:)

---

## 10. Cómo correr el proyecto

```bash
# Instalar dependencias
npm install

# Modo desarrollo (con hot reload)
npm run dev

# Correr la versión compilada
npm start
```

---

## 11. Notas importantes

- Los repos sandbox se crean en /tmp o en ./sandbox-repos/ y se destruyen al salir
- NUNCA ejecutar comandos git sobre el repo del proyecto por accidente
  (siempre verificar que el cwd sea el sandbox)
- El grafo se actualiza DESPUÉS de cada comando git del usuario
- Ink usa React 18, pero no necesitamos features avanzados (Suspense, etc)
