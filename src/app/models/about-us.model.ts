export interface TeamMember {
    id: string;
    name: string;
    position: string;
    photoUrl: string;
    description: string;
    socialLinks?: {
      linkedin?: string;
      twitter?: string;
      github?: string;
      instagram?: string;
    };
  }
  
  export interface CoreValue {
    id: string;
    title: string;
    description: string;
    icon: string;
  }
  
  export interface MissionVisionValues {
    mission: string;
    vision: string;
    values: CoreValue[];
  }
  
  export interface ContentSection {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    alignment?: 'left' | 'right' | 'center'; // Como a imagem será alinhada em relação ao texto
  }
  
  export interface AboutUsData {
    pageTitle: string;
    pageSubtitle: string;
    teamSection: {
      title: string;
      subtitle: string;
      members: TeamMember[];
    };
    missionVisionValuesSection: {
      title: string;
      subtitle: string;
      data: MissionVisionValues;
    };
    contentSections: {
      title: string;
      subtitle: string;
      sections: ContentSection[];
    };
  }