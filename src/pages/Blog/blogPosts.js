/**
 * BLOG POSTS — add a new post by copying one object below.
 *
 * slug     → URL: /blog/<slug>   (lowercase, words-joined-by-dashes, unique)
 * date     → 'YYYY-MM-DD'
 * content  → list of blocks, shown in order:
 *            { type: 'p',  text: '...' }            paragraph
 *            { type: 'h2', text: '...' }            sub-heading
 *            { type: 'ul', items: ['...', '...'] }  bullet list
 *            { type: 'quote', text: '...' }         highlighted note
 * Newest posts are shown first automatically.
 */
/** Set to true when the blog is ready to go live. While false, /blog shows
 *  an "Under construction" message and post links redirect to /blog. */
export const BLOG_LIVE = false;

const BLOG_POSTS = [
  {
    slug: 'how-to-start-upsc-preparation',
    title: 'How to Start UPSC Preparation: A Simple Roadmap for Beginners',
    category: 'UPSC Strategy',
    date: '2026-11-21',
    readTime: '5 min read',
    author: 'Ashoka IAS Academy',
    excerpt:
      'Starting UPSC preparation can feel overwhelming. Here is a clear, step-by-step way to begin, from understanding the exam to building a daily routine.',
    content: [
      {
        type: 'p',
        text: 'Every year lakhs of aspirants decide to attempt the Civil Services Examination, and almost all of them ask the same first question: where do I begin? The good news is that a calm, structured start matters far more than how many books you buy.',
      },
      { type: 'h2', text: '1. Understand the three stages' },
      {
        type: 'p',
        text: 'The Civil Services Examination has three stages: the Preliminary examination (objective), the Main examination (descriptive) and the Personality Test (interview). Prelims is a screening stage; your final rank depends on your Mains and interview marks.',
      },
      { type: 'h2', text: '2. Read the official syllabus first' },
      {
        type: 'p',
        text: 'Download the syllabus from the official UPSC notification and keep a printed copy on your desk. Every book, class and newspaper article you read should map back to a line in that syllabus.',
      },
      { type: 'h2', text: '3. Build your foundation with NCERTs' },
      {
        type: 'ul',
        items: [
          'Start with NCERT textbooks for History, Geography, Polity, Economy and Science.',
          'Read for understanding first; make short notes on the second reading.',
          'Move to standard reference books only after the basics are clear.',
        ],
      },
      { type: 'h2', text: '4. Make current affairs a daily habit' },
      {
        type: 'p',
        text: 'Spend a fixed 60–90 minutes every day on a good newspaper or a reliable daily current affairs summary. Link each news item to a syllabus topic instead of trying to memorise everything.',
      },
      { type: 'h2', text: '5. Practise from day one' },
      {
        type: 'p',
        text: 'Solve previous year questions (PYQs) early. They show you what UPSC actually asks and stop you from over-reading low-value topics. Begin answer writing in small doses, even one answer a day builds the habit.',
      },
      {
        type: 'quote',
        text: 'Consistency beats intensity. Six focused hours every day for a year will take you further than fourteen-hour days that last two weeks.',
      },
    ],
  },
  {
    slug: 'daily-current-affairs-smart-way',
    title: 'Reading Current Affairs the Smart Way',
    category: 'Current Affairs',
    date: '2026-11-18',
    readTime: '4 min read',
    author: 'Ashoka IAS Academy',
    excerpt:
      'Current affairs can eat up hours of your day. Learn how to read the news selectively, make crisp notes and revise them so they actually help in the exam.',
    content: [
      {
        type: 'p',
        text: 'Current affairs connect the static syllabus to the real world, and both Prelims and Mains questions increasingly reward aspirants who can make that connection. But reading everything is neither possible nor necessary.',
      },
      { type: 'h2', text: 'What to read' },
      {
        type: 'ul',
        items: [
          'Government policies, schemes and their objectives.',
          'Constitutional and legal developments, including important judgements.',
          'Economy: budget, RBI decisions, major reports and indices.',
          'Environment, science & technology and international relations.',
          'For APSC: Assam and North-East specific news, schemes and events.',
        ],
      },
      { type: 'h2', text: 'What to skip' },
      {
        type: 'p',
        text: 'Political statements, crime reports, celebrity news and day-to-day developments without a policy angle rarely add value. If a news item does not connect to the syllabus, let it go.',
      },
      { type: 'h2', text: 'How to make notes' },
      {
        type: 'p',
        text: 'Keep notes topic-wise, not date-wise. Under each syllabus heading, add two or three lines per news item: what happened, why it matters, and one data point. This makes monthly revision quick.',
      },
      {
        type: 'quote',
        text: 'Revise your current affairs notes every weekend and once again at the end of the month. Notes you never revise are notes you never made.',
      },
    ],
  },
  {
    slug: 'why-previous-year-questions-matter',
    title: 'Why Previous Year Questions Are Your Best Study Guide',
    category: 'Exam Tips',
    date: '2026-11-14',
    readTime: '3 min read',
    author: 'Ashoka IAS Academy',
    excerpt:
      'PYQs reveal the examiner’s mind. Here is how to use previous year questions to decide what to study, how deep to go and how to practise.',
    content: [
      {
        type: 'p',
        text: 'Previous year questions (PYQs) are the most reliable guide to what the examination values. Toppers often say they used PYQs not just for practice, but to decide what to study in the first place.',
      },
      { type: 'h2', text: 'Use PYQs before you study a topic' },
      {
        type: 'p',
        text: 'Before starting a chapter, look at the questions asked from it in the last few years. You will immediately see which sub-topics repeat and how deep the questions go.',
      },
      { type: 'h2', text: 'Use PYQs after you study a topic' },
      {
        type: 'p',
        text: 'Once you finish a topic, attempt the related PYQs under time limits. Mark the ones you got wrong and revisit the concept, not just the answer.',
      },
      { type: 'h2', text: 'Look for patterns' },
      {
        type: 'ul',
        items: [
          'Which subjects get the most questions year after year?',
          'Are questions factual, conceptual or analytical?',
          'How are current affairs linked to static topics?',
        ],
      },
      {
        type: 'quote',
        text: 'You can find topic-wise PYQs for free in our Student Zone. Start with one subject this week.',
      },
    ],
  },
];

export const getSortedPosts = () =>
  [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPostBySlug = (slug) => BLOG_POSTS.find((p) => p.slug === slug);

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

export default BLOG_POSTS;
