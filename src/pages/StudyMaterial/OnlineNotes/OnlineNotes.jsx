import SEO from '../../../components/common/SEO';
import PageHeader from '../../../components/common/PageHeader';
import ComingSoon from '../ComingSoon';

export default function OnlineNotes() {
  return (
    <div className="study-material-page">
      <SEO 
        title="Online Study Notes & E-Books"
        description="Explore our online digital library of civil services preparation notes, booklets, and recommended standard reference resources."
      />
      <PageHeader 
        title="Online Notes & Digital Library"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Student Zone' },
          { label: 'Online Notes' }
        ]}
      />
      <ComingSoon />
    </div>
  );
}
