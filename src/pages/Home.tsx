import Brands from '@/components/Brands';
import Categories from '@/components/Categories';
import Cta from '@/components/Cta';
import FeaturedJobs from '@/components/FeaturedJobs';
import Hero from '@/components/Hero';
import LatestJobs from '@/components/LatestJobs';
import OptionsSection from '@/components/OptionsSection';
import TopCompanies from '@/components/TopCompanies';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Brands />
      <OptionsSection />
      <Categories />
      <TopCompanies />
      <Cta />
      <FeaturedJobs />
      <LatestJobs />
    </div>
  );
};

export default HomePage;
