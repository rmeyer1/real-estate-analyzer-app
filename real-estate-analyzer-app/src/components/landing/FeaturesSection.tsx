import { BoltIcon, ChartBarIcon, CloudIcon, UsersIcon } from '@heroicons/react/24/outline';

const features = [
  {
    icon: <BoltIcon className="h-8 w-8 text-blue-500" />,
    title: 'Lightning-fast scenario analysis',
    description: 'Run complex investment scenarios instantly and compare results side by side.'
  },
  {
    icon: <ChartBarIcon className="h-8 w-8 text-blue-500" />,
    title: 'Professional-grade dashboards',
    description: 'Visualize your data with beautiful, interactive dashboards and charts.'
  },
  {
    icon: <CloudIcon className="h-8 w-8 text-blue-500" />,
    title: 'Secure cloud storage',
    description: 'Your models and data are safely stored and accessible from anywhere.'
  },
  {
    icon: <UsersIcon className="h-8 w-8 text-blue-500" />,
    title: 'Collaboration tools',
    description: 'Work with your team in real time and share insights effortlessly.'
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-slate-900 py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-slate-800 rounded-lg border border-slate-700 p-6 flex flex-col items-center text-center shadow">
              {feature.icon}
              <h3 className="mt-4 text-lg font-semibold text-slate-50">{feature.title}</h3>
              <p className="mt-2 text-slate-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 