"use client";

import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Script from "next/script";
import { usePurchases } from "@/context/purchases";
import { Button } from "@/components/ui/button";

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
  const { state: subscribed } = usePurchases();
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
      <ContentLayout title="premium">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">map</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>premium</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
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
          <div className="rounded-xl bg-white flex justify-center items-center py-16 my-4">
            <stripe-pricing-table
              pricing-table-id="prctbl_1PFJ5XDYybu1wznE3NpaCEH4"
              publishable-key="pk_live_51O7KGuDYybu1wznED6nNmA0HNrCxwycnz5cw7akKUDBKaNmqdMYkOY3vGKFQF8iFfPGHrjPmGRMNxf9iX120sxV8003rBfQKil">
            </stripe-pricing-table>
          </div>
        )}
      </ContentLayout>
    </>
  );
}
