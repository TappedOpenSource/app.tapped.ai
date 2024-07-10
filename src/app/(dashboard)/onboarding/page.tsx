import OnboardingForm from "@/components/onboarding/OnboardingForm";
import Footer from "@/components/admin-panel/footer";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const redirectUrl = searchParams["return_url"];
  const returnUrl = redirectUrl ? decodeURIComponent(redirectUrl) : null;

  return (
    <>
      <main>
        <OnboardingForm returnUrl={returnUrl} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
