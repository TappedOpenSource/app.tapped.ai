import OnboardingForm from "@/components/onboarding/OnboardingForm";
import Footer from "@/components/admin-panel/footer";
import UnauthHeader from "@/components/unauth_header";

export default async function Page(props: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const searchParams = await props.searchParams;
  const redirectUrl = searchParams["return_url"];
  const returnUrl = redirectUrl ? decodeURIComponent(redirectUrl) : null;

  return (
    <div className="flex min-h-screen flex-col">
      <UnauthHeader />
      <main className="flex grow items-center justify-center">
        <OnboardingForm returnUrl={returnUrl} />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
