import { LoadingSpinner } from '@/components/LoadingSpinner';

export default function Page() {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    </>
  );
}
