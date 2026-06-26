import { useState } from "react";
import { HeroSection } from "./components/hero/HeroSection";
import { SiteFooter } from "./components/layout/SiteFooter";
import { SiteNav } from "./components/layout/SiteNav";
import { CompareSection } from "./components/sections/CompareSection";
import { CurationSection } from "./components/sections/CurationSection";
import { HowItWorksSection } from "./components/sections/HowItWorksSection";
import { LayersSection } from "./components/sections/LayersSection";
import { PlatformSection } from "./components/sections/PlatformSection";
import { StatsSection } from "./components/sections/StatsSection";
import { KycFlow } from "./kyc/KycFlow";
import { Status } from "./kyc/Status";
import { Moderation } from "./platform/Moderation";
import { Platform } from "./platform/Platform";
import "./App.css";

type Mode = "home" | "validate" | "status" | "platform" | "moderation";

function App() {
  const [mode, setMode] = useState<Mode>("home");

  if (mode === "validate") return <KycFlow />;
  if (mode === "status") return <Status onBack={() => setMode("home")} />;
  if (mode === "platform") return <Platform onBack={() => setMode("home")} />;
  if (mode === "moderation") return <Moderation onBack={() => setMode("home")} />;

  return (
    <>
      <SiteNav />
      <main>
        <HeroSection
          onStartVerify={() => setMode("validate")}
          onViewStatus={() => setMode("status")}
          onOpenPlatform={() => setMode("platform")}
          onOpenModeration={() => setMode("moderation")}
        />
        <LayersSection />
        <HowItWorksSection />
        <PlatformSection />
        <CurationSection />
        <StatsSection />
        <CompareSection />
      </main>
      <SiteFooter />
    </>
  );
}

export default App;
