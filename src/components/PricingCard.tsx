import { FC } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
}

const PricingCard: FC<PricingCardProps> = ({ 
  title, 
  price, 
  description, 
  features,
  popular 
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`p-6 rounded-xl ${
        popular 
          ? 'bg-gradient-to-b from-indigo-500 to-purple-600 text-white' 
          : 'bg-white'
      } shadow-md hover:shadow-xl transition-all duration-300`}
    >
      {popular && (
        <span className="px-3 py-1 text-sm bg-white text-indigo-600 rounded-full mb-4 inline-block">
          Most Popular
        </span>
      )}
      <h3 className={`text-2xl font-bold ${popular ? 'text-white' : 'text-slate-900'}`}>
        {title}
      </h3>
      <div className="mt-4 mb-6">
        <span className={`text-4xl font-bold ${popular ? 'text-white' : 'text-slate-900'}`}>
          {price}
        </span>
        <span className={`text-sm ${popular ? 'text-white/80' : 'text-slate-600'}`}>
          /month
        </span>
      </div>
      <p className={`mb-6 ${popular ? 'text-white/80' : 'text-slate-600'}`}>
        {description}
      </p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            {feature.included ? (
              <Check className={`w-5 h-5 mr-2 ${popular ? 'text-white' : 'text-green-500'}`} />
            ) : (
              <X className={`w-5 h-5 mr-2 ${popular ? 'text-white/50' : 'text-red-500'}`} />
            )}
            <span className={popular ? 'text-white/80' : 'text-slate-600'}>
              {feature.name}
            </span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
          popular
            ? 'bg-white text-indigo-600 hover:bg-gray-100'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        Get Started
      </button>
    </motion.div>
  );
};

export default PricingCard;