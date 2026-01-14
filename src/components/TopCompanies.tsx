import { topCompanies } from '@/data';

const TopCompanies = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-12">Top Companies Hiring Now</h2>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {topCompanies.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-[#2563eb]">{category.name}</h3>
              <div className="space-y-4">
                {category.companies.map((company, index) => (
                  <div key={index} className="flex items-center p-3 hover:bg-gray-50 rounded-md">
                    <div className="w-12 h-12 flex-shrink-0 bg-white rounded-md flex items-center justify-center shadow-sm">
                      <img 
                        src={company.logo} 
                        alt={company.name} 
                        className="h-8 w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">{company.name}</h4>
                      <p className="text-sm text-gray-500">{company.jobs} jobs</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCompanies;
