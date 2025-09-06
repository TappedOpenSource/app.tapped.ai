import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UnauthHeader from "@/components/unauth_header";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <UnauthHeader />
      <div className="flex flex-col gap-4 py-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-gray-100">tapped developer api</h1>
        <p>for software developers and organizations building custom analytics solutions</p>

        <div className="flex flex-col gap-4 md:flex-row">
          <Card className="p-4">
            <h3 className="py-1 text-lg font-bold text-gray-900 dark:text-gray-100">extensive documentation</h3>
            <p>comprehensive guides and dedicated support ensure smooth api implementation and troubleshooting.</p>
          </Card>
          <Card className="p-4">
            <h3 className="py-1 text-lg font-bold text-gray-900 dark:text-gray-100">scalable access and control</h3>
            <p>scale your api usage with flexible access tiers and robust user management features.</p>
          </Card>
          <Card className="p-4">
            <h3 className="py-1 text-lg font-bold text-gray-900 dark:text-gray-100">
              performance scaling with pricing
            </h3>
            <p>api performance and request speed scale with your chosen pricing tier to match your business needs.</p>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <h2 className="text-lg font-bold">live music data that scales</h2>
          </CardHeader>
          <CardContent className="px-4">
            <div className="overflow-x-auto rounded bg-gray-800 p-4 text-white">
              <pre>
                <code>{`async function findPerformers() {
  const query = "bad bunny";
  const response = await fetch('https://api.tapped.ai/v1/performer/search?q=\${query}');
  const data = await response.json();
  console.log({ data });
}`}</code>
              </pre>
            </div>
          </CardContent>
        </Card>
        <div className="flex flex-col gap-2 md:flex-row">
          <Link href="https://airtable.com/appYRewbrhhuCyBIt/pag8R05c8wpSQ8ltp/form">
            <Button>request access</Button>
          </Link>
          <Link href="https://api.tapped.ai/docs">
            <Button variant="secondary">see api docs</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
