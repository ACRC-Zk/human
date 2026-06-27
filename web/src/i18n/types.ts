export type Locale = "en" | "es";

export type NavLink = { label: string; href: string };

export type LayerItem = {
  id: string;
  tag: string;
  title: string;
  body: string;
  bullets: string[];
};

export type FlowStep = {
  num: string;
  title: string;
  body: string;
};

export type FeatureItem = {
  title: string;
  body: string;
};

export type CurationLevel = {
  title: string;
  body: string;
};

export type StellarItem = {
  name: string;
  hint: string;
};

export type RegisterStep = {
  title: string;
  body: string;
};

export interface SiteMessages {
  siteMeta: {
    name: string;
    projectName: string;
    org: string;
    tagline: string;
    description: string;
    htmlTitle: string;
  };
  hero: {
    badge: string;
    title: string;
    accent: string;
    lead: string;
    stackLabel: string;
    stackItems: string[];
    ctaVerify: string;
    ctaHowItWorks: string;
  };
  layers: {
    label: string;
    title: string;
    lead: string;
    bridge: string;
    items: LayerItem[];
  };
  kycFlow: {
    label: string;
    title: string;
    lead: string;
    steps: FlowStep[];
  };
  platform: {
    label: string;
    title: string;
    lead: string;
    postKindsAria: string;
    features: FeatureItem[];
    postKinds: string[];
  };
  curation: {
    label: string;
    title: string;
    lead: string;
    levelPrefix: string;
    levels: CurationLevel[];
    principle: string;
  };
  sectionDividers: string[];
  stellarStack: {
    label: string;
    lead: string;
    items: StellarItem[];
  };
  footer: {
    message: string;
    nav: NavLink[];
    external: NavLink[];
    legalPrefix: string;
    legalSuffix: string;
  };
  navLinks: NavLink[];
  auth: {
    backToHome: string;
    eyebrow: string;
    loginTitle: string;
    registerTitle: string;
    loginSubtitle: string;
    registerSubtitle: string;
    tabLogin: string;
    tabRegister: string;
    tabListLabel: string;
    loginPanelTitle: string;
    loginPanelBody: string;
    connectWallet: string;
    comingSoon: string;
    noPassword: string;
    registerSteps: RegisterStep[];
    startVerification: string;
    legal: string;
    brandPanelLabel: string;
    brandTitle: string;
    brandTitleAccent: string;
  };
  ui: {
    signIn: string;
    register: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    switchToEn: string;
    switchToEs: string;
  };
}
