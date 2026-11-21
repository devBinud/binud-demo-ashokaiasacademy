import SEO from '../../../components/common/SEO';
import PageHeader from '../../../components/common/PageHeader';
import ComingSoon from '../ComingSoon';

export default function PYQ() {
  return (
    <div className="study-material-page">
      <SEO 
        title="UPSC & APSC Previous Year Questions"
        description="Download official UPSC and APSC Prelims and Mains previous years' question papers with answer keys and solution analyses."
      />
      <PageHeader 
        title="Previous Year Questions (PYQ)"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Student Zone' },
          { label: 'PYQ' }
        ]}
      />
      <ComingSoon />
    </div>
  );
}
