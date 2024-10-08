import Sidebar from "./components/sidebar";

export const inlinelayout =
  "relative w-full h-full items-center justify-center";

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="">
        <main className="h-screen p-4 rounded-lg shadowp-6 bg-[linear-gradient(to_bottom_right,#f5f5f5,#F4F4F5,#f1f1ff),linear-gradient(to_top_right,#f5f5f5,#F4F4F5,#f1f1ff)]">
          {children}
        </main>
      </div>
    </div>
  );
}
