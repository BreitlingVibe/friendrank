export type HubBenefit = {
  title: string;
  description: string;
};

export type HubFaqItem = {
  question: string;
  answer: string;
};

export type HubPageContent = {
  heroParagraphs: string[];
  featuredSectionTitle: string;
  featuredSectionIntro?: string;
  liveSectionTitle: string;
  liveSectionIntro?: string;
  comingSoonIntro: string;
  benefitsTitle: string;
  benefits: HubBenefit[];
  faqTitle: string;
  faq: HubFaqItem[];
  metaDescription: string;
  schemaDescription: string;
};
