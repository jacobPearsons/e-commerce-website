import TelegramBot from 'node-telegram-bot-api';
import { db } from '../config/database';
import { User, Activity } from '../models/types';
import { v4 as uuidv4 } from 'uuid';

class TelegramService {
  private bot: TelegramBot | null = null;
  private isInitialized = false;

  constructor() {
    this.initializeBot();
  }

  private initializeBot() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    
    if (!token || token === 'demo-bot-token-replace-with-real') {
      console.log('🤖 Telegram bot not configured - using mock mode');
      return;
    }

    try {
      this.bot = new TelegramBot(token, { polling: true });
      this.setupBotCommands();
      this.isInitialized = true;
      console.log('🤖 Telegram bot initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Telegram bot:', error);
    }
  }

  private setupBotCommands() {
    if (!this.bot) return;

    // Start command
    this.bot.onText(/\/start/, async (msg) => {
      const chatId = msg.chat.id;
      const telegramUserId = msg.from?.id.toString();
      
      if (!telegramUserId) return;

      await this.bot?.sendMessage(chatId, `
🎉 Welcome to ProfilePro!

Use /link <your-email> to connect your ProfilePro account with Telegram.
Use /profile to view your profile stats.
Use /help to see all available commands.
      `);
    });

    // Link account command
    this.bot.onText(/\/link (.+)/, async (msg, match) => {
      const chatId = msg.chat.id;
      const email = match?.[1];
      const telegramUserId = msg.from?.id.toString();
      
      if (!email || !telegramUserId) {
        await this.bot?.sendMessage(chatId, '❌ Please provide a valid email address.');
        return;
      }

      try {
        const user = await db.getUserByEmail(email);
        if (!user) {
          await this.bot?.sendMessage(chatId, '❌ No ProfilePro account found with this email.');
          return;
        }

        // Link Telegram account
        await db.updateUser(user.id, {
          telegramId: telegramUserId,
          telegramUsername: msg.from?.username
        });

        // Create activity
        await db.createActivity({
          id: uuidv4(),
          type: 'telegram_sync',
          description: 'Linked Telegram account',
          timestamp: new Date(),
          userId: user.id,
          metadata: {
            telegramUsername: msg.from?.username,
            telegramId: telegramUserId
          }
        });

        await this.bot?.sendMessage(chatId, `✅ Successfully linked your ProfilePro account!
        
🔗 Account: ${user.name} (@${user.username})
📧 Email: ${user.email}

You'll now receive notifications about your profile activity.`);

      } catch (error) {
        console.error('Error linking Telegram account:', error);
        await this.bot?.sendMessage(chatId, '❌ Failed to link account. Please try again.');
      }
    });

    // Profile stats command
    this.bot.onText(/\/profile/, async (msg) => {
      const chatId = msg.chat.id;
      const telegramUserId = msg.from?.id.toString();
      
      if (!telegramUserId) return;

      try {
        // Find user by Telegram ID
        const users = await this.getAllUsers();
        const user = users.find(u => u.telegramId === telegramUserId);
        
        if (!user) {
          await this.bot?.sendMessage(chatId, '❌ No linked ProfilePro account found. Use /link <email> to connect your account.');
          return;
        }

        const skills = await db.getSkillsByUserId(user.id);
        const profileViews = await db.getProfileViewsByUserId(user.id);
        const totalEndorsements = skills.reduce((sum, skill) => sum + skill.endorsementCount, 0);

        await this.bot?.sendMessage(chatId, `
📊 Your ProfilePro Stats:

👤 Profile: ${user.name}
🔗 Username: @${user.username}
👀 Profile Views: ${profileViews.length}
🏆 Skills: ${skills.length}
⭐ Total Endorsements: ${totalEndorsements}

Visit your dashboard: ${process.env.CLIENT_URL}/profile
        `);

      } catch (error) {
        console.error('Error fetching profile stats:', error);
        await this.bot?.sendMessage(chatId, '❌ Failed to fetch profile stats. Please try again.');
      }
    });

    // Help command
    this.bot.onText(/\/help/, async (msg) => {
      const chatId = msg.chat.id;
      
      await this.bot?.sendMessage(chatId, `
🤖 ProfilePro Bot Commands:

/start - Welcome message
/link <email> - Link your ProfilePro account
/profile - View your profile statistics
/unlink - Unlink your Telegram account
/help - Show this help message

Need help? Contact support or visit our website.
      `);
    });

    // Unlink command
    this.bot.onText(/\/unlink/, async (msg) => {
      const chatId = msg.chat.id;
      const telegramUserId = msg.from?.id.toString();
      
      if (!telegramUserId) return;

      try {
        const users = await this.getAllUsers();
        const user = users.find(u => u.telegramId === telegramUserId);
        
        if (!user) {
          await this.bot?.sendMessage(chatId, '❌ No linked ProfilePro account found.');
          return;
        }

        await db.updateUser(user.id, {
          telegramId: undefined,
          telegramUsername: undefined
        });

        await this.bot?.sendMessage(chatId, '✅ Successfully unlinked your ProfilePro account.');

      } catch (error) {
        console.error('Error unlinking account:', error);
        await this.bot?.sendMessage(chatId, '❌ Failed to unlink account. Please try again.');
      }
    });
  }

  // Send notification to user via Telegram
  async sendNotification(userId: string, title: string, message: string, options?: any): Promise<boolean> {
    if (!this.bot || !this.isInitialized) {
      console.log('📱 Mock Telegram notification:', { userId, title, message });
      return true; // Mock success
    }

    try {
      const user = await db.getUserById(userId);
      if (!user?.telegramId) {
        return false;
      }

      const fullMessage = `🔔 ${title}\n\n${message}`;
      await this.bot.sendMessage(user.telegramId, fullMessage, options);
      return true;
    } catch (error) {
      console.error('Failed to send Telegram notification:', error);
      return false;
    }
  }

  // Send profile view notification
  async notifyProfileView(userId: string, viewerName?: string): Promise<void> {
    const title = '👀 Profile View';
    const message = viewerName 
      ? `${viewerName} viewed your profile`
      : 'Someone viewed your profile';
    
    await this.sendNotification(userId, title, message);
  }

  // Send skill endorsement notification
  async notifySkillEndorsement(userId: string, skillName: string, endorserName?: string): Promise<void> {
    const title = '⭐ New Endorsement';
    const message = endorserName
      ? `${endorserName} endorsed your ${skillName} skill`
      : `Someone endorsed your ${skillName} skill`;
    
    await this.sendNotification(userId, title, message);
  }

  // Get all users (helper method)
  private async getAllUsers(): Promise<User[]> {
    // In a real database, this would be a proper query
    // For now, we'll simulate it
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'john.doe@example.com',
        name: 'John Doe',
        username: 'johndoe',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        coverUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=200&fit=crop',
        bio: 'Senior Full-Stack Developer with 8+ years of experience building scalable web applications.',
        createdAt: new Date('2020-01-15'),
        isOnline: true,
        lastSeen: new Date()
      }
    ];
    return mockUsers;
  }

  // Check if bot is ready
  isReady(): boolean {
    return this.isInitialized;
  }

  // Get bot info
  async getBotInfo(): Promise<any> {
    if (!this.bot) return null;
    
    try {
      return await this.bot.getMe();
    } catch (error) {
      console.error('Failed to get bot info:', error);
      return null;
    }
  }
}

export const telegramService = new TelegramService();