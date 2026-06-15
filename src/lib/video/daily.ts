import { env } from "../env";

// Daily.co — рекомендованный в ТЗ провайдер. Интеграция оформлена за интерфейсом
// VideoProvider, чтобы можно было заменить на Whereby/Vonage без правок логики.

export interface VideoProvider {
  createRoom(opts: { name: string; expiresAt: Date }): Promise<{ name: string; url: string }>;
  issueToken(opts: {
    roomName: string;
    userName: string;
    isOwner: boolean;
    expiresAt: Date;
    enableRecording?: boolean;
  }): Promise<string>;
  deleteRoom(roomName: string): Promise<void>;
}

class DailyProvider implements VideoProvider {
  private base = "https://api.daily.co/v1";
  private get headers() {
    return {
      Authorization: `Bearer ${env.daily.apiKey}`,
      "Content-Type": "application/json",
    };
  }
  async createRoom(opts: { name: string; expiresAt: Date }) {
    if (!env.daily.apiKey) {
      return {
        name: opts.name,
        url: `https://${env.daily.domain || "example"}.daily.co/${opts.name}`,
      };
    }
    const res = await fetch(`${this.base}/rooms`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: opts.name,
        privacy: "private",
        properties: {
          exp: Math.floor(opts.expiresAt.getTime() / 1000),
          enable_chat: true,
          enable_screenshare: true,
          enable_recording: "cloud", // активируется только при согласии (см. issueToken)
        },
      }),
    });
    if (!res.ok) throw new Error(`Daily.createRoom failed: ${res.status}`);
    const data = (await res.json()) as { name: string; url: string };
    return data;
  }
  async issueToken(opts: {
    roomName: string;
    userName: string;
    isOwner: boolean;
    expiresAt: Date;
    enableRecording?: boolean;
  }) {
    if (!env.daily.apiKey) return `dev-token-${opts.roomName}-${opts.isOwner ? "owner" : "guest"}`;
    const res = await fetch(`${this.base}/meeting-tokens`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        properties: {
          room_name: opts.roomName,
          user_name: opts.userName,
          is_owner: opts.isOwner,
          exp: Math.floor(opts.expiresAt.getTime() / 1000),
          enable_recording: opts.enableRecording ? "cloud" : false,
        },
      }),
    });
    if (!res.ok) throw new Error(`Daily.issueToken failed: ${res.status}`);
    const data = (await res.json()) as { token: string };
    return data.token;
  }
  async deleteRoom(roomName: string) {
    if (!env.daily.apiKey) return;
    await fetch(`${this.base}/rooms/${roomName}`, { method: "DELETE", headers: this.headers });
  }
}

export const videoProvider: VideoProvider = new DailyProvider();
