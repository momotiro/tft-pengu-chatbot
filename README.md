# 🐧 TFT Pengu Chatbot

An AI-powered chatbot featuring Pengu, the adorable mascot of Teamfight Tactics! Get strategy tips, meta insights, and team composition advice in Pengu's signature style.

## ✨ Features

- 🎯 **Pengu Personality**: Cute and enthusiastic TFT companion
- 💬 **Real-time Chat**: Interactive conversation with Claude AI
- 📝 **Session History**: Persistent chat sessions with MongoDB
- 🎨 **Beautiful UI**: Gradient design with smooth animations
- 📱 **Responsive**: Works on desktop and mobile
- 🚀 **Fast**: Built with Next.js 16 and Tailwind CSS 4

## 🛠 Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **AI**: Anthropic Claude 3.5 Sonnet
- **Database**: MongoDB with Prisma ORM
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 20+
- MongoDB Atlas account (free tier works)
- Anthropic API key

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd tft-pengu-chatbot
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/tft-pengu-chatbot?retryWrites=true&w=majority"
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set up the database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app!

## 📦 Project Structure

```
tft-pengu-chatbot/
├── app/
│   ├── api/
│   │   ├── chat/route.ts      # Chat API endpoint
│   │   └── session/route.ts   # Session management API
│   ├── globals.css            # Global styles
│   └── page.tsx               # Main chat page
├── components/
│   └── chat/
│       ├── ChatContainer.tsx  # Chat history display
│       ├── ChatMessage.tsx    # Message bubble component
│       └── MessageInput.tsx   # Input form
├── lib/
│   ├── mastra/
│   │   ├── index.ts          # Anthropic AI setup
│   │   └── chat.ts           # Chat logic
│   └── prisma.ts             # Prisma client
├── prisma/
│   └── schema.prisma         # Database schema
└── types/                    # TypeScript types
```

## 🌐 Deploy to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/tft-pengu-chatbot)

### Manual Deploy

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `ANTHROPIC_API_KEY`
   - `DATABASE_URL`
   - `NEXT_PUBLIC_APP_URL` (your Vercel URL)
4. Deploy!

## 🔑 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key | `sk-ant-api03-...` |
| `DATABASE_URL` | MongoDB connection string | `mongodb+srv://...` |
| `NEXT_PUBLIC_APP_URL` | Your app URL | `http://localhost:3000` |

## 📝 API Endpoints

### POST `/api/chat`
Send a message to Pengu

**Request:**
```json
{
  "message": "What's the best comp for this patch?",
  "sessionId": "session_123" // optional
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Squawk! Let me tell you about...",
    "sessionId": "session_123"
  }
}
```

### GET `/api/chat?sessionId=xxx`
Get chat history for a session

### POST `/api/session`
Create a new session

### GET `/api/session?sessionId=xxx`
Get session details

## 🎮 Usage

1. Open the app in your browser
2. Start chatting with Pengu about TFT strategies!
3. Ask about:
   - Team compositions
   - Item builds
   - Current meta
   - Champion synergies
   - Positioning strategies

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for your own purposes!

## 🙏 Acknowledgments

- Pengu character © Riot Games
- Built with [Next.js](https://nextjs.org)
- AI powered by [Anthropic Claude](https://anthropic.com)

---

Made with ❤️ and 🐧
