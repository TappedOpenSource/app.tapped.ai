
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
  return (
    <>
      <div className="min-h-screen bg-white flex justify-center items-center">
        <stripe-pricing-table pricing-table-id="prctbl_1PFJ5XDYybu1wznE3NpaCEH4"
          publishable-key="pk_live_51O7KGuDYybu1wznED6nNmA0HNrCxwycnz5cw7akKUDBKaNmqdMYkOY3vGKFQF8iFfPGHrjPmGRMNxf9iX120sxV8003rBfQKil">
        </stripe-pricing-table>
      </div>
    </>
  );
}
