import OnboardingForm from "@/components/onboarding/OnboardingForm";
import FullFooter from "@/components/Footer";

export default function Page({ searchParams }: {
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
        <FullFooter />
      </footer>
    </>
  );
}
