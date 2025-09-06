"use client";

import React from "react";
import Link from "next/link";
import Script from "next/script";
import { usePurchases } from "@/context/purchases";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";

// If using TypeScript, add the following snippet to your file as well.

export default function Page() {
  const {
    state: { authUser },
  } = useAuth();
  const { state: subscribed } = usePurchases();

  if (!authUser) {
    return (
      <div className="mt-16 flex flex-col items-center justify-center">
        <p>please sign up first</p>
        <Link
          href={{
            pathname: "/sign-up",
            query: { redirect: "/premium" },
          }}
        >
          <Button>sign in</Button>
        </Link>
      </div>
    );
  }

  if (subscribed) {
    return (
      <div className="mt-16 flex flex-col items-center justify-center">
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
    );
  }

  return (
    <>
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
        {/* Stripe pricing table custom element */}
        {React.createElement("stripe-pricing-table", {
          "pricing-table-id": "prctbl_1PFJ5XDYybu1wznE3NpaCEH4",
          "publishable-key":
            "pk_live_51O7KGuDYybu1wznED6nNmA0HNrCxwycnz5cw7akKUDBKaNmqdMYkOY3vGKFQF8iFfPGHrjPmGRMNxf9iX120sxV8003rBfQKil",
          "client-reference-id": authUser.uid,
          "customer-email": authUser.email,
        })}
      </div>
    </>
  );
}
