import withAuth from '@/domain/auth/withAuth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { InferenceJob } from '@/domain/models/inference_job';
import api from '../data/api';

const ResultsPage: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<InferenceJob | null>(null);
  const inferenceId = router.query.inferenceId as string;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!inferenceId) return;

    const fetchResults = async () => {
      try {
        const results = await api.getAvatarInferenceJob(inferenceId);
        if (results && results.job.state === 'finished') {
          setData(results.job);
          clearInterval(interval);
        }
      } catch (error) {
        console.error('Error fetching results:', error);
        setError('Failed to fetch results. Please try again later.');
      }
    };

    const interval = setInterval(fetchResults, 5000);

    return () => clearInterval(interval);
  }, [inferenceId]);

  return (
    <div className="min-h-screen bg-[#63b2f2] flex flex-col items-center justify-center">
      <header className="text-2xl font-bold mb-8">
        {data ? 'Generated Images' : 'Generating Images'}
      </header>

      {error ? (
        <div className='text-red-500'>{error}</div>
      ) : data ? (
        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
            {data.images.map((image, idx) => (
              <div key={idx} className="p-2">
                {image.uri && (
                  <img
                    src={image.uri}
                    alt={`Generated Avatar ${idx + 1}`}
                    className="w-full h-auto border-2 rounded-md"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-16 h-16 border-t-4 border-white rounded-full animate-spin"></div>
      )}
    </div>
  );
};

export default withAuth(ResultsPage);
