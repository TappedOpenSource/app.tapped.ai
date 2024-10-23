import TappedSheet from "@/components/TappedSheet";
import UnauthHeader from "@/components/unauth_header";

export default function UnauthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TappedSheet />
      <div className="fixed z-50 top-0">
        <UnauthHeader />
      </div>
      <div className="h-[4rem] transparent" />
      {children}
    </>
  );
}
