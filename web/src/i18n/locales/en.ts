import type { SiteMessages } from "../types";

export const en: SiteMessages = {
  siteMeta: {
    name: "human",
    projectName: "beHuman",
    org: "ACRC-Zk",
    tagline: "Your real voice, without exposing who you are",
    description:
      "Verify you're a real and unique person, and join a space where opinions matter—people, not bots.",
    htmlTitle: "human · Your real voice, without exposing who you are",
  },
  hero: {
    badge: "Real people · Respectful opinions",
    title: "A real person.",
    accent: "Once. Without giving your name.",
    lead:
      "human verifies you're a unique person without exposing your data. Then you can share opinions, publish, and debate freely.",
    stackLabel: "A space for human voices",
    stackItems: [
      "Honest opinions",
      "Debate without bots",
      "Backed research",
      "Real privacy",
      "One person, one voice",
      "Verified community",
    ],
    ctaVerify: "Verify my identity",
    ctaHowItWorks: "How it works",
  },
  layers: {
    label: "The idea",
    title: "Two steps, one identity",
    lead:
      "First you confirm you're a real person. Then you use that trust to participate on the platform without showing who you are in everyday life.",
    bridge:
      "Your verification opens the door to the platform. What you publish is tied to your pseudonym, not your name or personal data.",
    items: [
      {
        id: "capa-1",
        tag: "Step 1 · Verification",
        title: "Confirm you're human and unique",
        body:
          "You complete a short verification (document and live face). beHuman stores proof that you passed—not your data for public exposure.",
        bullets: [
          "One person can't create multiple accounts",
          "Your personal data isn't published",
          "Verification is recorded securely",
        ],
      },
      {
        id: "capa-2",
        tag: "Step 2 · Participation",
        title: "Share opinions and publish freely",
        body:
          "You enter a space where only verified people can post. You use a persistent pseudonym: your activity has continuity, but your real identity stays protected.",
        bullets: [
          "Opinions, articles, and research from real people",
          "Stable pseudonym: recognized without your name",
          "Content reviewed for quality and respect",
        ],
      },
    ],
  },
  kycFlow: {
    label: "Your journey",
    title: "How you join beHuman",
    lead:
      "The process is designed to be clear and private. Most of it happens on your device—you don't need to repeat it for every post.",
    steps: [
      {
        num: "01",
        title: "Validate your identity",
        body:
          "Upload your document and confirm your face live. It's only used to verify you're a real person—not a bank process and not exposed on the network.",
      },
      {
        num: "02",
        title: "Generate your private proof",
        body:
          "On your phone or computer, a mathematical proof shows you meet the requirements without revealing your document or personal data.",
      },
      {
        num: "03",
        title: "Register once",
        body:
          "That proof is confirmed securely. From then on, the system knows you're a verified and unique person—no need to upload your ID again.",
      },
      {
        num: "04",
        title: "Participate on the platform",
        body:
          "You can share opinions, publish, and debate under your pseudonym. Only verified people get in—bots and fake accounts stay out.",
      },
    ],
  },
  platform: {
    label: "The platform",
    title: "A place to speak freely",
    lead:
      "A space where what you say matters, not who you are in real life. Ideal for sensitive topics, honest debate, and well-supported content.",
    postKindsAria: "Post types",
    features: [
      {
        title: "Verified posts",
        body:
          "Every post comes from a real and unique person. That raises debate quality and reduces spam, bots, and duplicate accounts.",
      },
      {
        title: "Full-length content",
        body:
          "Write short takes, long articles, or share research. The space is built for ideas—not just quick reactions.",
      },
      {
        title: "A pseudonym that protects you",
        body:
          "Your real name doesn't appear by default. Your pseudonym gives you continuity and reputation without forcing you to expose your identity.",
      },
    ],
    postKinds: ["Opinion", "Article", "Research"],
  },
  curation: {
    label: "Content quality",
    title: "Respect without censorship",
    lead:
      "We want a serious, human space: abuse and obvious misinformation are filtered—not legitimate opinions.",
    levelPrefix: "Level",
    levels: [
      {
        title: "Automatic review",
        body:
          "Content passes an initial filter that catches severe incoherence, strong toxicity, or plagiarism signals. Clear content continues; doubtful cases are escalated.",
      },
      {
        title: "Human review",
        body:
          "Ambiguous cases reach moderators. A person evaluates context before deciding. It's not an algorithm that silences by default.",
      },
    ],
    principle:
      "Filter noise and abuse, not ideas. Diversity of opinion is part of the product.",
  },
  sectionDividers: [
    "Verify · Participate · Speak freely",
    "Simple, private, and in your control",
    "For debates that matter",
    "Real people, real conversation",
  ],
  stellarStack: {
    label: "Powered by the Stellar ecosystem",
    lead: "Technologies working together to keep your identity and voice secure.",
    items: [
      { name: "Stellar", hint: "Open global network" },
      { name: "Soroban", hint: "Smart contracts" },
      { name: "ZK proofs", hint: "Verification without exposing data" },
      { name: "DeFindex", hint: "Yield in vaults" },
      { name: "Blend", hint: "Network liquidity" },
      { name: "Trustless Work", hint: "Funds with clear agreements" },
      { name: "Stellar Wallets", hint: "Freighter, xBull, and more" },
    ],
  },
  footer: {
    message:
      "A space to speak freely: real people, honest opinions, and privacy that matters.",
    nav: [
      { label: "The idea", href: "#capas" },
      { label: "How to join", href: "#como-funciona" },
      { label: "Platform", href: "#plataforma" },
      { label: "Quality", href: "#curacion" },
    ],
    external: [{ label: "GitHub", href: "https://github.com/ACRC-Zk/beHuman" }],
    legalPrefix: "©",
    legalSuffix: "human. Made for people, not bots.",
  },
  navLinks: [
    { label: "The idea", href: "#capas" },
    { label: "How to join", href: "#como-funciona" },
    { label: "Platform", href: "#plataforma" },
    { label: "Quality", href: "#curacion" },
  ],
  auth: {
    backToHome: "← Back to home",
    eyebrow: "Platform access",
    loginTitle: "Sign in",
    registerTitle: "Create your account",
    loginSubtitle:
      "No email or password: sign in with the credential on this device or check your on-chain wallet.",
    registerSubtitle:
      "Verify your identity once with ZK. One real person, one anonymous identity.",
    tabLogin: "Sign in",
    tabRegister: "Register",
    tabListLabel: "Access type",
    loginPanelTitle: "Wallet sign-in",
    loginPanelBody:
      "You'll connect your Stellar wallet and use your on-device credential. No email or password.",
    connectWallet: "Connect wallet",
    comingSoon: "Wallet and verification flows are coming soon on this branch.",
    noPassword:
      "beHuman doesn't use email accounts. Your access is cryptographic: Stellar wallet + ZK proof + anonymous platformId identity.",
    registerSteps: [
      {
        title: "Connect wallet",
        body: "Your Stellar address receives the on-chain registration (Layer 1). No email or password.",
      },
      {
        title: "ID + live selfie",
        body: "Matcher validates document and face. Images are not saved to disk.",
      },
      {
        title: "ZK proof on your device",
        body: "The circuit proves you're a unique human without revealing PII.",
      },
      {
        title: "On-chain registration",
        body: "verify_and_register on kyc_verifier → is_verified(address).",
      },
      {
        title: "Anonymous platform identity",
        body: "platformId derived from your secret. Fee paid by ephemeral account.",
      },
    ],
    startVerification: "Start verification",
    legal:
      "By continuing you accept our terms of use and privacy policy. Mock issuer in demo—not a substitute for regulated KYC.",
    brandPanelLabel: "beHuman",
    brandTitle: "A real person.",
    brandTitleAccent: "Once.",
  },
  ui: {
    signIn: "Sign in",
    register: "Register",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    switchToEn: "English",
    switchToEs: "Spanish",
  },
};
