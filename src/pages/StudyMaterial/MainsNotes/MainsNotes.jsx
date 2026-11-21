import SEO from '../../../components/common/SEO';
import PageHeader from '../../../components/common/PageHeader';
import ComingSoon from '../ComingSoon';

export default function MainsNotes() {
  return (
    <div className="study-material-page">
      <SEO 
        title="APSC & UPSC Mains Study Material"
        description="Access structured study materials, value-added topics, and answer templates for General Studies and optional papers in Civil Services Mains."
      />
      <PageHeader 
        title="Mains Notes & Resources"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Student Zone' },
          { label: 'Mains Notes' }
        ]}
      />
      <ComingSoon />
    </div>
  );
}
