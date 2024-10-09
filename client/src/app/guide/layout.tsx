import Sidebar from "./components/Sidebar";

export const inlinelayout =
  "relative w-full h-full items-center justify-center";

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full fixed top-10 left-0">
      <div className="w-full flex flex-col">
        <div className="w-full h-screen flex items-center justify-center">
          <Sidebar />
          <main className="w-full overflow-y-auto custom-scrollbar py-12 bg-white">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
