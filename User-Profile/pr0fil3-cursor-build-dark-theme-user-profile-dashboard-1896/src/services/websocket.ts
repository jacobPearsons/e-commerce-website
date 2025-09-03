import { io, Socket } from 'socket.io-client';

export interface WebSocketEvents {
  'skill-endorsement-received': (data: { skillId: string; skillName: string; timestamp: string }) => void;
  'profile-view-received': (data: { viewerName?: string; timestamp: string }) => void;
  'notification': (data: { type: string; title: string; message: string; timestamp: string }) => void;
}

class WebSocketService {
  private socket: Socket | null = null;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private eventHandlers = new Map<string, Function[]>();

  constructor() {
    this.connect();
  }

  // Connect to WebSocket server
  connect() {
    try {
      this.socket = io('http://localhost:3001', {
        transports: ['websocket', 'polling'],
        timeout: 5000,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: this.maxReconnectAttempts,
      });

      this.setupEventHandlers();
    } catch (error) {
      console.error('Failed to connect to WebSocket server:', error);
    }
  }

  // Setup WebSocket event handlers
  private setupEventHandlers() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('🔌 Connected to WebSocket server');
      this.isConnected = true;
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', (reason) => {
      console.log('🔌 Disconnected from WebSocket server:', reason);
      this.isConnected = false;
      
      if (reason === 'io server disconnect') {
        // Server initiated disconnect, try to reconnect
        this.socket?.connect();
      }
    });

    this.socket.on('connect_error', (error) => {
      console.error('🔌 WebSocket connection error:', error);
      this.isConnected = false;
      this.reconnectAttempts++;
      
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('🔌 Max reconnection attempts reached');
      }
    });

    // Handle real-time events
    this.socket.on('skill-endorsement-received', (data) => {
      console.log('⭐ Skill endorsement received:', data);
      this.emit('skill-endorsement-received', data);
    });

    this.socket.on('profile-view-received', (data) => {
      console.log('👀 Profile view received:', data);
      this.emit('profile-view-received', data);
    });

    this.socket.on('notification', (data) => {
      console.log('🔔 Notification received:', data);
      this.emit('notification', data);
    });
  }

  // Join user's personal room for notifications
  joinUserRoom(userId: string) {
    if (this.socket && this.isConnected) {
      this.socket.emit('join-user-room', userId);
    }
  }

  // Emit skill endorsement event
  emitSkillEndorsed(skillId: string, userId: string, skillName: string) {
    if (this.socket && this.isConnected) {
      this.socket.emit('skill-endorsed', { skillId, userId, skillName });
    }
  }

  // Emit profile view event
  emitProfileViewed(userId: string, viewerName?: string) {
    if (this.socket && this.isConnected) {
      this.socket.emit('profile-viewed', { userId, viewerName });
    }
  }

  // Subscribe to events
  on<K extends keyof WebSocketEvents>(event: K, handler: WebSocketEvents[K]) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event)!.push(handler);
  }

  // Unsubscribe from events
  off<K extends keyof WebSocketEvents>(event: K, handler: WebSocketEvents[K]) {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  // Emit event to subscribers
  private emit(event: string, data: any) {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(data);
        } catch (error) {
          console.error(`Error in ${event} handler:`, error);
        }
      });
    }
  }

  // Check connection status
  isSocketConnected(): boolean {
    return this.isConnected && this.socket?.connected === true;
  }

  // Disconnect from WebSocket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Get connection info
  getConnectionInfo() {
    return {
      connected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      maxReconnectAttempts: this.maxReconnectAttempts,
      socketId: this.socket?.id,
    };
  }
}

export const webSocketService = new WebSocketService();