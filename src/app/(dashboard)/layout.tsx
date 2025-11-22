import { Sidebar } from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-transparent">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 lg:p-8 lg:ml-[18rem] transition-all duration-300">
        {children}
      </main>
    </div>
  );
}
