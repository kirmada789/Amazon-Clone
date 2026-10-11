import React from 'react';
import { Tag, CreditCard, Percent } from 'lucide-react';

const defaultOffers = [
  {
    type: 'Bank Offer',
    title: 'Upto ₹3,000.00 discount on SBI Credit Cards',
    description: '10% Instant Discount up to ₹3,000 on SBI Credit Card Non-EMI and EMI transactions. Min purchase ₹15,000.',
    icon: CreditCard
  },
  {
    type: 'No Cost EMI',
    title: 'Upto ₹1,621.19 EMI interest savings',
    description: 'No Cost EMI available on SBI and HDFC Bank Credit Cards. Interest cost waived as upfront discount.',
    icon: Percent
  },
  {
    type: 'Cashback',
    title: 'Upto ₹1,499 cashback as Pay Balance',
    description: 'Get 5% back with Amazon Pay ICICI Bank Credit Card for Prime members, 3% back for others.',
    icon: Tag
  }
];

const ProductOffers = ({ offers }) => {
  const offerList = offers && offers.length > 0 ? offers : defaultOffers;

  return (
    <div className="space-y-2 mt-4">
      <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
        <Tag className="w-4 h-4 text-[#ff9900]" />
        <span>Offers</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {offerList.map((offer, idx) => (
          <div
            key={idx}
            className="p-3 bg-white rounded-md border border-gray-200 hover:border-gray-400 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
          >
            <div>
              <span className="font-bold text-xs text-gray-900 block mb-1">
                {offer.type}
              </span>
              <p className="text-[11px] font-semibold text-gray-800 line-clamp-2 leading-tight">
                {offer.title}
              </p>
            </div>
            <span className="text-[10px] font-medium text-[#007185] hover:underline mt-2 cursor-pointer">
              {idx + 1} offers &gt;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductOffers;
