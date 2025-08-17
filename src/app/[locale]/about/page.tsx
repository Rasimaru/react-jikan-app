import { JSX } from 'react';
import About from '@/components/about/About';
import { generateStaticParams } from '@/utils/utils';

export { generateStaticParams };

const AboutPage = (): JSX.Element => {
  return <About />;
};

export default AboutPage;
