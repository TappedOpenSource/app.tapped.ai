"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePurchases } from "@/context/purchases";
import { useAuth } from "@/context/auth";
import { RequestLoginPage } from "@/components/login/RequireLogin";
import Script from "next/script";

// If using TypeScript, add the following snippet to your file as well.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export default function Page() {
  const { state: { currentUser, authUser } } = useAuth();
  const { state: subscribed } = usePurchases();

  if (!currentUser || !authUser) {
    return <RequestLoginPage />;
  }

  if (!subscribed) {
    return (<>
      <Script id="pricing-table-fix">{`const updatePricingTables = () => {
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
      <div className="mx-12 rounded-xl bg-black px-12">
        <stripe-pricing-table
          pricing-table-id="prctbl_1PFJ5XDYybu1wznE3NpaCEH4"
          publishable-key="pk_live_51O7KGuDYybu1wznED6nNmA0HNrCxwycnz5cw7akKUDBKaNmqdMYkOY3vGKFQF8iFfPGHrjPmGRMNxf9iX120sxV8003rBfQKil"
          client-reference-id={authUser.uid}
          customer-email={authUser.email}
        ></stripe-pricing-table>
      </div>
    </>
    );
  }

  return (
    <>
      <ContentLayout title="dashboard">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                billing
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        you are subscribed
      </ContentLayout>
    </>

  );
}
