import { Navbar } from "../admin-panel/navbar";
import VenueMap from "../map";
import { Card, CardContent } from "../ui/card";

export default function DashboardMap() {
  return (
    <>
      <Navbar title="map" />
      <Card className="rounded-lg border-none">
        <CardContent className="p-0">
          <div className="rounded-xl flex justify-center items-center">
            <VenueMap />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
