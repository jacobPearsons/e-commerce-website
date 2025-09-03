// Mock Database Implementation
// In a real application, this would connect to a proper database like PostgreSQL, MongoDB, etc.

import { User, Skill, Activity, ProfileView } from '../models/types';

// In-memory database for demo purposes
class MockDatabase {
  private users: Map<string, User> = new Map();
  private skills: Map<string, Skill> = new Map();
  private activities: Map<string, Activity> = new Map();
  private profileViews: Map<string, ProfileView> = new Map();

  // User operations
  async createUser(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const user = this.users.get(id);
    if (!user) return null;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  // Skill operations
  async createSkill(skill: Skill): Promise<Skill> {
    this.skills.set(skill.id, skill);
    return skill;
  }

  async getSkillsByUserId(userId: string): Promise<Skill[]> {
    return Array.from(this.skills.values()).filter(skill => skill.userId === userId);
  }

  async updateSkill(id: string, updates: Partial<Skill>): Promise<Skill | null> {
    const skill = this.skills.get(id);
    if (!skill) return null;
    
    const updatedSkill = { ...skill, ...updates };
    this.skills.set(id, updatedSkill);
    return updatedSkill;
  }

  async deleteSkill(id: string): Promise<boolean> {
    return this.skills.delete(id);
  }

  // Activity operations
  async createActivity(activity: Activity): Promise<Activity> {
    this.activities.set(activity.id, activity);
    return activity;
  }

  async getActivitiesByUserId(userId: string): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .filter(activity => activity.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  // Profile View operations
  async createProfileView(profileView: ProfileView): Promise<ProfileView> {
    this.profileViews.set(profileView.id, profileView);
    return profileView;
  }

  async getProfileViewsByUserId(userId: string): Promise<ProfileView[]> {
    return Array.from(this.profileViews.values())
      .filter(view => view.userId === userId)
      .sort((a, b) => b.viewedAt.getTime() - a.viewedAt.getTime());
  }

  // Analytics operations
  async getProfileViewsAnalytics(userId: string, days: number = 30): Promise<any[]> {
    const views = await this.getProfileViewsByUserId(userId);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const dailyViews = new Map<string, number>();
    
    views
      .filter(view => view.viewedAt >= cutoffDate)
      .forEach(view => {
        const dateKey = view.viewedAt.toISOString().split('T')[0];
        dailyViews.set(dateKey, (dailyViews.get(dateKey) || 0) + 1);
      });

    return Array.from(dailyViews.entries()).map(([date, count]) => ({
      date,
      views: count
    }));
  }
}

export const db = new MockDatabase();