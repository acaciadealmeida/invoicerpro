import { SideNav } from "@/components/layout/SideNav";
import { TopNav } from "@/components/layout/TopNav";
import { ScenarioLauncher } from "@/components/ScenarioLauncher";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar — hidden on mobile */}
      <div className="hidden md:block">
        <SideNav />
      </div>

      {/* Main area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-page">
          {children}
        </main>
      </div>

      {/* Always-visible scenario launcher */}
      <ScenarioLauncher />
    </div>
  );
}
