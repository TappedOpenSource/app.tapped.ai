import VenueMap from "../map";
import { Card, CardContent } from "../ui/card";

export default function DashboardMap() {
  return (
    <>
      <Card className="rounded-lg border-none">
        <CardContent className="p-2">
          <div className="rounded-xl flex justify-center items-center">
            <VenueMap />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
