"use client";

import { useMemo, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Handshake, Mailbox, Theater, Bitcoin } from "lucide-react";
import type { Booking } from "@/domain/types/booking";
import type { ContactVenueRequest } from "@/domain/types/contact_venue_request";
import { useAuth } from "@/context/auth";
import { getBookingsByRequestee, getBookingsByRequester, getContactedVenues, getUserById } from "@/data/database";
import type { UserModel } from "@/domain/types/user_model";

export default function StatsSection() {
  const {
    state: { currentUser },
  } = useAuth();
  const [venuesContacted, setVenuesContacted] = useState<ContactVenueRequest[]>([]);
  //   const [totalGigsApplied, setTotalGigsApplied] = useState(0);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [topVenue, setTopVenue] = useState<UserModel | null>(null);
  const venuesContactedThisMonth = useMemo(() => {
    return venuesContacted.filter((venue) => {
      return venue.timestamp.toDate().getMonth() === new Date().getMonth();
    });
  }, [venuesContacted]);
  //   const venuesContactedLastMonth = useMemo(() => {
  //     return venuesContacted.filter((venue) => {
  //       return venue.timestamp.toDate().getMonth() === new Date().getMonth() - 1;
  //     });
  //   }, [venuesContacted]);
  const venuesRespondedThisMonth = useMemo(() => {
    return venuesContactedThisMonth.filter((venue) => {
      return venue.originalMessageId !== venue.latestMessageId;
    });
  }, [venuesContactedThisMonth]);
  //   const venuesRespondedLastMonth = useMemo(() => {
  //     return venuesContactedLastMonth.filter((venue) => {
  //       return venue.originalMessageId !== venue.latestMessageId;
  //     });
  //   }, [venuesContactedLastMonth]);
  //   const responseRatioDiff = useMemo(() => {
  //     return ((venuesRespondedThisMonth.length - venuesRespondedLastMonth.length) / venuesRespondedLastMonth.length) * 100;
  //   }, [venuesRespondedThisMonth, venuesRespondedLastMonth]);
  const showsThisMonth = useMemo(() => {
    return bookings.filter((booking) => {
      return booking.startTime.getMonth() === new Date().getMonth();
    });
  }, [bookings]);
  const showsLastMonth = useMemo(() => {
    return bookings.filter((booking) => {
      return booking.startTime.getMonth() === new Date().getMonth() - 1;
    }).length;
  }, [bookings]);
  const bookingsRatio = useMemo(() => {
    return ((showsThisMonth.length - showsLastMonth) / showsLastMonth) * 100;
  }, [showsThisMonth, showsLastMonth]);

  const moneyMadeThisMonth = useMemo(() => {
    return bookings.reduce((acc, booking) => {
      return acc + booking.rate;
    }, 0);
  }, [bookings]);
  const percentDiffFromLastMonth = useMemo(() => {
    return ((showsThisMonth.length - showsLastMonth) / showsLastMonth) * 100;
  }, [showsThisMonth, showsLastMonth]);

  const respondContactRatio = useMemo(() => {
    if (venuesRespondedThisMonth.length === 0) {
      return 0;
    }

    return (venuesContactedThisMonth.length / venuesRespondedThisMonth.length) * 100;
  }, [venuesContactedThisMonth, venuesRespondedThisMonth]);
  const topVenueId = useMemo(() => {
    if (bookings.length === 0) {
      return null;
    }

    const venueBookings = bookings.reduce((acc, booking) => {
      if (booking.requesterId === undefined || booking.requesterId === null) {
        return acc;
      }

      if (acc[booking.requesterId]) {
        acc[booking.requesterId] += 1;
      } else {
        acc[booking.requesterId] = 1;
      }

      return acc;
    }, {});

    return Object.keys(venueBookings).reduce((a, b) => {
      return venueBookings[a] > venueBookings[b] ? a : b;
    }, "");
  }, [bookings]);

  useEffect(() => {
    if (currentUser === null) {
      return;
    }

    if (topVenueId === null) {
      return;
    }

    getUserById(topVenueId).then((venue) => {
      if (venue) {
        setTopVenue(venue);
      }
    });
  }, [currentUser, topVenueId]);

  useEffect(() => {
    const fetchVenuesContacted = async () => {
      if (currentUser === null) {
        return;
      }

      const res = await getContactedVenues(currentUser.id, { limit: 250 });
      setVenuesContacted(res);
    };
    const fetchBookings = async () => {
      if (currentUser === null) {
        return;
      }

      // fetch latest booking
      const latestRequesteeBookings = await getBookingsByRequestee(currentUser.id, { limit: 40 });
      const latestRequesterBookings = await getBookingsByRequester(currentUser.id, { limit: 40 });
      const latestBookings = latestRequesteeBookings.concat(latestRequesterBookings).sort((a, b) => {
        return b.startTime.getTime() - a.startTime.getTime();
      });

      setBookings(latestBookings);
    };
    // const fetchGigsApplied = async () => {
    //   if (currentUser === null) {
    //     return;
    //   }

    //   const res = getOpportunitiesApplied(currentUser.id);
    //   setGigsApplied(res);
    // };
    fetchVenuesContacted();
    fetchBookings();
    // fetchGigsApplied();
  }, [currentUser]);

  if (currentUser === null) {
    return null;
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">responded / contacted</CardTitle>
            <Handshake className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {venuesRespondedThisMonth.length} / {venuesContactedThisMonth.length}
            </div>
            <p className="text-muted-foreground text-xs">{respondContactRatio}% response rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">shows this month</CardTitle>
            <Theater className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{showsThisMonth.length}</div>
            <p className="text-muted-foreground text-xs">{bookingsRatio}% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">top venue</CardTitle>
            <Mailbox className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topVenue?.artistName ?? topVenue?.username}</div>
            <p className="text-muted-foreground text-xs">
              {bookings.filter((b) => b.requesterId === topVenueId).length} shows booked
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">payouts earned</CardTitle>
            <Bitcoin className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${moneyMadeThisMonth}</div>
            <p className="text-muted-foreground text-xs">{percentDiffFromLastMonth}% from last month</p>
          </CardContent>
        </Card>
      </div>
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
                      You made 265 sales this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div> */}
    </>
  );
}
