import { Button } from "../ui/button";

export default function BuyPremium() {
  return (
    <>
      <div className="w-full bg-blue-500 rounded-xl flex p-8">
        <div className="flex-1">
          <h3 className="text-xl font-bold">
                tapped premium
          </h3>
          <p>
            you should get tapped premium
          </p>
        </div>
        <Button>
                upgrade
        </Button>
      </div>
    </>
  );
}
