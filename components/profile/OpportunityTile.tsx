import { Opportunity } from '@/domain/models/opportunity';
import Link from 'next/link';
import { FaMoneyBill } from 'react-icons/fa';

export default function OpportunityTile({ opportunity }: {
    opportunity: Opportunity;
}) {
  return (
    <>
      <div className='flex flex-col justify-between rounded-xl p-4 bg-gray-900 h-52 w-96 overflow-hidden'>
        <div>
          <h1
            className='text-xl font-bold'
          >{opportunity.title}</h1>
          <div className='h-2' />
          <p
            className=''
          >{opportunity.description}</p>
        </div>
        <div>
          <div
            className='flex flex-row justify-between'
          >
            <Link
              href={`/op/${opportunity.id}`}
              className='bg-blue-500 text-white rounded-lg px-4 py-2'
            >
              more info
            </Link>
            <div className='flex justify-center items-center'>
              {
                !opportunity.isPaid ?
                  <FaMoneyBill
                    color='green'
                    size={20}
                  /> :
                  <FaMoneyBill
                    color='red'
                    size={20}
                  />
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
