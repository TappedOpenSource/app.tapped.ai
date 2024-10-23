"use client";

import { useAuth } from "@/context/auth";
import { getContactedVenues } from "@/data/database";
import { ContactVenueRequest } from "@/domain/types/contact_venue_request";
import { useEffect, useState } from "react";
import VenueCard from "../location/VenueCard";

export default function ContactedVenuesSlider() {
  const {
    state: { currentUser },
  } = useAuth();
  const [contactRequests, setContactRequests] = useState<ContactVenueRequest[]>([]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const fetchVenues = async () => {
      const res = await getContactedVenues(currentUser.id, { limit: 50 });
      setContactRequests(res);
    };
    fetchVenues();
  }, [currentUser]);

  return (
    <div>
      <h3 className="font-bold text-gray-500">venues contacted</h3>
      <div className="py-1" />
      <div className="flex flex-row overflow-y-scroll gap-3">
        {contactRequests.map((request) => (
          <VenueCard venue={request.venue} key={request.originalMessageId} />
        ))}
      </div>
    </div>
  );
}
