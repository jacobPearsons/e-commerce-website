import { User, ProfileView, Skill, Activity, AnalyticsData } from '../types';

// Mock user data
export const mockUser: User = {
  id: '1',
  email: 'john.doe@example.com',
  name: 'John Doe',
  username: 'johndoe',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  coverUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=200&fit=crop',
  bio: 'Senior Full-Stack Developer with 8+ years of experience building scalable web applications. Passionate about React, TypeScript, and modern web technologies. Always eager to learn and share knowledge with the community.',
  createdAt: new Date('2020-01-15'),
  skills: [],
  profileViews: [],
  activities: [],
};

export const mockSkills: Skill[] = [
  { id: '1', name: 'React', endorsementCount: 47, userId: '1' },
  { id: '2', name: 'TypeScript', endorsementCount: 42, userId: '1' },
  { id: '3', name: 'Node.js', endorsementCount: 38, userId: '1' },
  { id: '4', name: 'Python', endorsementCount: 35, userId: '1' },
  { id: '5', name: 'GraphQL', endorsementCount: 28, userId: '1' },
  { id: '6', name: 'AWS', endorsementCount: 31, userId: '1' },
  { id: '7', name: 'Docker', endorsementCount: 25, userId: '1' },
  { id: '8', name: 'PostgreSQL', endorsementCount: 33, userId: '1' },
];

export const mockProfileViews: ProfileView[] = Array.from({ length: 30 }, (_, i) => ({
  id: `view-${i + 1}`,
  viewedAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
  viewerId: Math.random() > 0.3 ? `viewer-${i + 1}` : undefined,
  userId: '1',
}));

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'profile_update',
    description: 'Updated profile bio and skills',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    userId: '1',
  },
  {
    id: '2',
    type: 'skill_endorsement',
    description: 'Received endorsement for React',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    userId: '1',
    metadata: { skill: 'React', endorser: 'Jane Smith' },
  },
  {
    id: '3',
    type: 'profile_view',
    description: 'Profile viewed by Sarah Johnson',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    userId: '1',
    metadata: { viewer: 'Sarah Johnson' },
  },
  {
    id: '4',
    type: 'document_upload',
    description: 'Uploaded new portfolio document',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    userId: '1',
    metadata: { filename: 'portfolio-2024.pdf' },
  },
];

export const mockAnalyticsData: AnalyticsData = {
  profileViews: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    views: Math.floor(Math.random() * 20) + 5,
  })),
  skillEndorsements: mockSkills.map(skill => ({
    skill: skill.name,
    count: skill.endorsementCount,
  })),
  engagement: Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    interactions: Math.floor(Math.random() * 50) + 10,
  })),
};

// Initialize mock user with related data
mockUser.skills = mockSkills;
mockUser.profileViews = mockProfileViews;
mockUser.activities = mockActivities;