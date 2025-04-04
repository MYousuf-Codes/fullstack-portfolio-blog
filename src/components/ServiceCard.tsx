import { FC } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const ServiceCard: FC<ServiceCardProps> = ({ title, description, icon, link }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
    >
      <div className="w-12 h-12 mb-4 text-indigo-600">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-600 mb-4">{description}</p>
      <Link 
        href={link}
        className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
      >
        Learn more <ArrowRight className="ml-2 w-4 h-4" />
      </Link>
    </motion.div>
  );
};

export default ServiceCard;