export interface faqItem {
    id: string;
    question: string;
    answer: string;
    isExpanded?: boolean;
  }
  
  export interface faqSection {
    id: string;
    title: string;
    items: faqItem[];
  }
  
  export interface faqResponse {
    title: string;
    sections: faqSection[];
  }