import TappedSheet from "@/components/TappedSheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TappedSheet />
      {children}
    </>
  );
}
