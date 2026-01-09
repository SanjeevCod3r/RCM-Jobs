import Brands from '@/components/Brands';
import Categories from '@/components/Categories';
import Cta from '@/components/Cta';
import FeaturedJobs from '@/components/FeaturedJobs';
import Hero from '@/components/Hero';
import LatestJobs from '@/components/LatestJobs';
import OptionsSection from '@/components/OptionsSection';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Brands />
      <OptionsSection />
      <Categories />
      <Cta />
      <FeaturedJobs />
      <LatestJobs />
    </div>
  );
};

export default HomePage;
