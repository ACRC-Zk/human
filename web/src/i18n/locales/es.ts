import type { SiteMessages } from "../types";

export const es: SiteMessages = {
  siteMeta: {
    name: "human",
    projectName: "beHuman",
    org: "ACRC-Zk",
    tagline: "Tu voz real, sin exponer quién sos",
    description:
      "Verificá que sos una persona real y única, y participá en un espacio donde las opiniones cuentan personas, no bots.",
    htmlTitle: "human · Tu voz real, sin exponer quién sos",
  },
  hero: {
    badge: "Personas reales · Opinión con respeto",
    title: "Una persona real.",
    accent: "Una sola vez. Sin dar tu nombre.",
    lead:
      "human verifica que eres una persona única sin exponer tus datos. Luego puedes opinar, publicar y debatir con libertad.",
    stackLabel: "Un espacio para voces humanas",
    stackItems: [
      "Opiniones sinceras",
      "Debate sin bots",
      "Estudios con respaldo",
      "Privacidad real",
      "Una persona, una voz",
      "Comunidad verificada",
    ],
    ctaVerify: "Validar mi identidad",
    ctaHowItWorks: "Cómo funciona",
  },
  layers: {
    label: "La idea",
    title: "Dos pasos, una sola identidad",
    lead:
      "Primero confirmás que sos una persona real. Después usás esa confianza para participar en la plataforma sin mostrar quién sos en la vida cotidiana.",
    bridge:
      "Tu verificación te abre la puerta a la plataforma. Lo que publicás queda asociado a tu seudónimo, no a tu nombre ni a tus datos personales.",
    items: [
      {
        id: "capa-1",
        tag: "Paso 1 · Verificación",
        title: "Confirmá que sos humano y único",
        body:
          "Completás un proceso breve de verificación (documento y rostro en vivo). beHuman guarda la prueba de que pasaste el control, no tus datos para exponerlos.",
        bullets: [
          "Una sola persona no puede crear varias cuentas",
          "Tus datos personales no se publican",
          "La verificación queda registrada de forma segura",
        ],
      },
      {
        id: "capa-2",
        tag: "Paso 2 · Participación",
        title: "Opiná y publicá con libertad",
        body:
          "Entrás a un espacio donde solo personas verificadas pueden publicar. Usás un seudónimo persistente: tu actividad tiene continuidad, pero tu identidad real queda protegida.",
        bullets: [
          "Opiniones, artículos y estudios de personas reales",
          "Seudónimo estable: te reconocen sin saber tu nombre",
          "Contenido revisado para mantener calidad y respeto",
        ],
      },
    ],
  },
  kycFlow: {
    label: "Tu recorrido",
    title: "Cómo entrás a beHuman",
    lead:
      "El proceso está diseñado para ser claro y privado. La mayor parte ocurre en tu dispositivo; no necesitás repetirlo en cada publicación.",
    steps: [
      {
        num: "01",
        title: "Validás tu identidad",
        body:
          "Subís tu documento y confirmás tu rostro en vivo. Solo se usa para verificar que sos una persona real; no es un trámite bancario ni queda expuesto en la red.",
      },
      {
        num: "02",
        title: "Generás tu prueba privada",
        body:
          "En tu teléfono o computadora se crea una prueba matemática que demuestra que cumplís los requisitos sin revelar tu documento ni tus datos personales.",
      },
      {
        num: "03",
        title: "Te registrás una sola vez",
        body:
          "Esa prueba se confirma de forma segura. Desde ahí, el sistema sabe que sos una persona verificada y única, sin necesidad de volver a subir tu DNI.",
      },
      {
        num: "04",
        title: "Participás en la plataforma",
        body:
          "Podés opinar, publicar y debatir bajo tu seudónimo. Solo entran personas verificadas; los bots y las cuentas falsas quedan fuera.",
      },
    ],
  },
  platform: {
    label: "La plataforma",
    title: "Un lugar para hablar con libertad",
    lead:
      "Un espacio donde importa lo que decís, no quién sos en la vida real. Ideal para temas sensibles, debates honestos y contenido con respaldo.",
    postKindsAria: "Tipos de publicación",
    features: [
      {
        title: "Publicaciones verificadas",
        body:
          "Cada post viene de una persona real y única. Eso eleva la calidad del debate y reduce spam, bots y cuentas duplicadas.",
      },
      {
        title: "Contenido completo",
        body:
          "Podés escribir opiniones cortas, artículos largos o compartir estudios. El espacio está pensado para ideas, no solo para reacciones rápidas.",
      },
      {
        title: "Seudónimo que te protege",
        body:
          "Tu nombre real no aparece por defecto. Tu seudónimo te da continuidad y reputación sin obligarte a exponer tu identidad.",
      },
    ],
    postKinds: ["Opinión", "Artículo", "Estudio"],
  },
  curation: {
    label: "Calidad del contenido",
    title: "Respeto sin censura",
    lead:
      "Queremos un espacio serio y humano: se filtra el abuso y la desinformación evidente, no las opiniones legítimas.",
    levelPrefix: "Nivel",
    levels: [
      {
        title: "Revisión automática",
        body:
          "El contenido pasa por un primer filtro que detecta incoherencias graves, toxicidad fuerte o señales de plagio. Lo claro sigue; lo dudoso se escala.",
      },
      {
        title: "Revisión humana",
        body:
          "Los casos ambiguos llegan a moderadores. Una persona evalúa el contexto antes de tomar una decisión. No es una algoritmo que calla por defecto.",
      },
    ],
    principle:
      "Filtrar ruido y abuso, no silenciar ideas. La diversidad de opinión es parte del producto.",
  },
  sectionDividers: [
    "Verificar · Participar · Opinar con libertad",
    "Simple, privado y en tu control",
    "Para debates que importan",
    "Personas reales, conversación real",
  ],
  stellarStack: {
    label: "Respaldado por el ecosistema Stellar",
    lead: "Tecnologías que trabajan en conjunto para que tu identidad y tu voz sean seguras.",
    items: [
      { name: "Stellar", hint: "Red global abierta" },
      { name: "Soroban", hint: "Contratos inteligentes" },
      { name: "Pruebas ZK", hint: "Verificación sin revelar datos" },
      { name: "DeFindex", hint: "Rendimiento en vaults" },
      { name: "Blend", hint: "Liquidez en la red" },
      { name: "Trustless Work", hint: "Fondos con acuerdos claros" },
      { name: "Wallets Stellar", hint: "Freighter, xBull y más" },
    ],
  },
  footer: {
    message:
      "Un espacio para hablar con libertad: personas reales, opiniones sinceras y privacidad que importa.",
    nav: [
      { label: "La idea", href: "#capas" },
      { label: "Cómo entrar", href: "#como-funciona" },
      { label: "Plataforma", href: "#plataforma" },
      { label: "Calidad", href: "#curacion" },
    ],
    external: [{ label: "GitHub", href: "https://github.com/ACRC-Zk/beHuman" }],
    legalPrefix: "©",
    legalSuffix: "human. Hecho para personas, no para bots.",
  },
  navLinks: [
    { label: "La idea", href: "#capas" },
    { label: "Cómo entrar", href: "#como-funciona" },
    { label: "Plataforma", href: "#plataforma" },
    { label: "Calidad", href: "#curacion" },
  ],
  auth: {
    backToHome: "← Volver al inicio",
    eyebrow: "Acceso a la plataforma",
    loginTitle: "Iniciar sesión",
    registerTitle: "Creá tu cuenta",
    loginSubtitle:
      "Sin email ni contraseña: entrás con la credencial de este dispositivo o consultás tu wallet on-chain.",
    registerSubtitle:
      "Verificás tu identidad una vez con ZK. Una persona real, una sola identidad anónima.",
    tabLogin: "Iniciar sesión",
    tabRegister: "Registrarse",
    tabListLabel: "Tipo de acceso",
    loginPanelTitle: "Inicio con wallet",
    loginPanelBody:
      "Vas a conectar tu wallet Stellar y usar la credencial en este dispositivo. Sin email ni contraseña.",
    connectWallet: "Conectar wallet",
    comingSoon: "Los flujos de wallet y verificación llegan pronto en esta rama.",
    noPassword:
      "beHuman no usa cuentas con email. Tu acceso es criptográfico: wallet Stellar + prueba ZK + identidad anónima platformId.",
    registerSteps: [
      {
        title: "Conectar wallet",
        body: "Tu dirección Stellar recibe el registro on-chain (Capa 1). Sin email ni contraseña.",
      },
      {
        title: "DNI + selfie en vivo",
        body: "Matcher valida documento y cara. Las imágenes no se guardan en disco.",
      },
      {
        title: "Prueba ZK en tu dispositivo",
        body: "El circuito demuestra que sos humano único sin revelar PII.",
      },
      {
        title: "Registro on-chain",
        body: "verify_and_register en kyc_verifier → is_verified(address).",
      },
      {
        title: "Identidad anónima de plataforma",
        body: "platformId derivado de tu secreto. Fee pagado por cuenta efímera.",
      },
    ],
    startVerification: "Comenzar verificación",
    legal:
      "Al continuar aceptás nuestros términos de uso y política de privacidad. Issuer mock en demo — no sustituye KYC regulado.",
    brandPanelLabel: "beHuman",
    brandTitle: "Una persona real.",
    brandTitleAccent: "Una sola vez.",
  },
  ui: {
    signIn: "Iniciar sesión",
    register: "Registrarse",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    language: "Idioma",
    switchToEn: "Inglés",
    switchToEs: "Español",
  },
};
