"use client";

import Link from "next/link";
import Script from "next/script";
import { usePurchases } from "@/context/purchases";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { redirect, useSearchParams } from "next/navigation";

// If using TypeScript, add the following snippet to your file as well.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export default function Page() {
  const { state: { authUser } } = useAuth();
  const { state: subscribed } = usePurchases();

  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("return_url") ?? "/dashboard";

  if (!authUser) {
    return (
      <div className="flex flex-col justify-center items-center mt-16">
        <p>please sign up first</p>
        <Button onClick={() => redirect("/signup")}>
          sign in
        </Button>
      </div>
    );
  }

  return (
    <>
      <Script id="pricing-table-fix">{
        `const updatePricingTables = () => {
  var stripePricingTables = document.querySelectorAll("stripe-pricing-table");
  if (window.tolt_referral !== null && stripePricingTables.length > 0) {
    stripePricingTables.forEach(stripePricingTable => {
      stripePricingTable.setAttribute("client-reference-id", window.tolt_referral);
    })
  }
}
setTimeout(updatePricingTables, 1000);
setTimeout(updatePricingTables, 2200);
setTimeout(updatePricingTables, 3200);
window.addEventListener("tolt_referral_ready", () => {
if (window.tolt_referral) {
  updatePricingTables()
}
})
`}</Script>

      {subscribed ? (
        <div className="flex flex-col justify-center items-center mt-16">
          <p>you&apos;re already subscribed</p>
          <Button variant="secondary">
            <Link
              href="https://tapped.tolt.io"
              target="_blank"
              rel="noopener noreferrer"
            >
                share with a friend
            </Link>
          </Button>
        </div>
      ) : (
        <div className="px-12 mx-12 bg-black rounded-xl">
          <stripe-pricing-table
            pricing-table-id="prctbl_1PFJ5XDYybu1wznE3NpaCEH4"
            publishable-key="pk_live_51O7KGuDYybu1wznED6nNmA0HNrCxwycnz5cw7akKUDBKaNmqdMYkOY3vGKFQF8iFfPGHrjPmGRMNxf9iX120sxV8003rBfQKil"
            client-reference-id={authUser.uid}
            customer-email={authUser.email}>
          </stripe-pricing-table>
        </div>
      )}
    </>
  );
}
