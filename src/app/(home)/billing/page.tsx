"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { usePurchases } from "@/context/purchases";
import { useAuth } from "@/context/auth";
import { RequestLoginPage } from "@/components/login/RequireLogin";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { getCustomerInfo } from "@/data/purchases";
import { CustomerInfo } from "@revenuecat/purchases-js";
import { format } from "date-fns";
import UnauthHeader from "@/components/unauth_header";

export default function Page() {
  const {
    state: { currentUser, authUser },
  } = useAuth();
  const { state: subscribed } = usePurchases();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);

  useEffect(() => {
    if (!currentUser || !subscribed) {
      return;
    }

    const getURL = async () => {
      const info = await getCustomerInfo(currentUser.id);
      setCustomerInfo(info);
    };
    getURL();
  }, [currentUser, subscribed]);

  if (!currentUser || !authUser) {
    return <RequestLoginPage />;
  }

  if (!subscribed) {
    return (
      <div className="mx-auto w-[90%] rounded-xl bg-black/5 p-6 md:w-2/3 lg:w-1/2">
        <Card>
          <CardHeader>
            <CardTitle>Choose a Plan</CardTitle>
            <CardDescription>
              Select a plan that fits your needs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Stripe pricing table custom element */}
            {React.createElement("stripe-pricing-table", {
              "pricing-table-id": "prctbl_1PFJ5XDYybu1wznE3NpaCEH4",
              "publishable-key":
                "pk_live_51O7KGuDYybu1wznED6nNmA0HNrCxwycnz5cw7akKUDBKaNmqdMYkOY3vGKFQF8iFfPGHrjPmGRMNxf9iX120sxV8003rBfQKil",
              "client-reference-id": authUser.uid,
              "customer-email": authUser.email,
            })}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <UnauthHeader />
      <div className="flex grow items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>your subscription</CardTitle>
            <CardDescription>
              manage your active subscription details.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {customerInfo && (
              <>
                <div>
                  <span className="font-medium">Next Billing Date:</span>{" "}
                  {customerInfo.allExpirationDatesByProduct[
                    Array.from(customerInfo.activeSubscriptions)[0]
                  ]
                    ? format(
                        customerInfo.allExpirationDatesByProduct[
                          Array.from(customerInfo.activeSubscriptions)[0]
                        ] as Date,
                        "MMMM do, yyyy"
                      )
                    : "N/A"}
                </div>
                <div>
                  <span className="font-medium">Original Purchase Date:</span>{" "}
                  {customerInfo.originalPurchaseDate
                    ? format(customerInfo.originalPurchaseDate, "MMMM do, yyyy")
                    : "N/A"}
                </div>
              </>
            )}
          </CardContent>
          <CardFooter>
            {customerInfo?.managementURL && (
              <Link
                href={customerInfo.managementURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">Manage Subscription</Button>
              </Link>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
