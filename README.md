# 🩺 HealOps Next.js Demo Application

A professional, enterprise-ready demonstration of the **HealOps OpenTelemetry SDK** (`@sourabhkumawat0105/healops-opentelemetry`) integrated into a Next.js 14 application.

This demo showcases how to automatically capture and monitor errors in a real-world Next.js application using HealOps' powerful observability platform.

![HealOps Demo](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🔍 **Automatic Error Capture** - JavaScript errors are automatically captured and sent to HealOps
- 🚨 **API Error Monitoring** - Track failed API requests, database errors, and timeouts
- 📊 **Real-time Telemetry** - All errors sent to HealOps with full context, stack traces, and metrics
- 🎨 **Modern UI** - Clean, professional dark theme with smooth animations
- 🧪 **Interactive Demo** - Trigger sample errors with one click to see HealOps in action

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- HealOps API key (sign up at [healops.ai](https://healops.ai))

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd healops-sample-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_HEALOPS_API_KEY=your_healops_api_key_here
NEXT_PUBLIC_HEALOPS_ENDPOINT=https://engine.healops.ai/otel/errors
```

> **Note:** You can copy `env.example` as a template:
> ```bash
> cp env.example .env.local
> ```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
healops-sample-app/
├── app/
│   ├── layout.tsx              # Root layout with OTel initialization
│   ├── page.tsx                # Main landing page
│   ├── globals.css             # Global styles with dark theme
│   └── api/
│       ├── error/route.ts      # JS error endpoint
│       ├── db-error/route.ts   # DB error simulation
│       └── timeout/route.ts    # Timeout error simulation
├── components/
│   ├── DemoCard.tsx            # Reusable card component
│   ├── ErrorButtons.tsx        # Error trigger buttons
│   └── ui/
│       ├── card.tsx            # Shadcn Card component
│       ├── button.tsx          # Shadcn Button component
│       └── badge.tsx           # Shadcn Badge component
├── lib/
│   ├── tracing.ts              # HealOps OTel SDK initialization
│   └── utils.ts                # Utility functions
├── package.json
├── tailwind.config.ts
└── README.md
```

## 🔧 How It Works

### 1. HealOps SDK Initialization

The HealOps OpenTelemetry SDK is initialized in [`lib/tracing.ts`](./lib/tracing.ts):

```typescript
import { initHealOpsOTel } from "@sourabhkumawat0105/healops-opentelemetry";

initHealOpsOTel({
  apiKey: process.env.NEXT_PUBLIC_HEALOPS_API_KEY!,
  serviceName: "healops-nextjs-demo",
  endpoint: process.env.NEXT_PUBLIC_HEALOPS_ENDPOINT || "https://engine.healops.ai/otel/errors"
});
```

### 2. Server-Side Activation

The SDK is automatically loaded on the server-side in [`app/layout.tsx`](./app/layout.tsx):

```typescript
// Initialize HealOps OpenTelemetry on server-side
if (typeof window === "undefined") {
  require("../lib/tracing");
}
```

This ensures that all server-side errors, API route errors, and unhandled exceptions are captured.

### 3. Error Demonstration

The demo includes three types of errors you can trigger:

#### **JavaScript Error** (`/api/error`)
Throws an unhandled exception that's automatically captured by HealOps.

#### **Database Error** (`/api/db-error`)
Simulates a database connection failure with a 500 status response.

#### **Timeout Error** (`/api/timeout`)
Simulates a slow API request that times out after 6 seconds.

## 🎨 UI Components

### DemoCard
A reusable card component with Framer Motion animations for smooth fade-in effects.

### ErrorButtons
Interactive buttons that trigger API calls to the error endpoints. Includes:
- Loading states
- Error/success feedback
- Smooth hover and tap animations
- Real-time result display

## 🧪 Testing the Demo

1. **Start the development server** (`npm run dev`)
2. **Open the application** in your browser
3. **Click any error button** to trigger a sample error
4. **Check your HealOps dashboard** to see the captured error with full context

## 📊 What Gets Captured

When you trigger an error, HealOps captures:

- ✅ **Error message** and type
- ✅ **Stack trace** with line numbers
- ✅ **Request context** (URL, method, headers)
- ✅ **Service name** and version
- ✅ **Timestamp** and duration
- ✅ **Environment** information

## 🎯 Use Cases

This demo is perfect for:

- **Enterprise presentations** - Show clients how HealOps works in a real application
- **Developer onboarding** - Help teams understand HealOps integration
- **Testing** - Validate your HealOps configuration
- **Learning** - Understand OpenTelemetry and error monitoring

## 🛠️ Built With

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[TailwindCSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Shadcn/UI](https://ui.shadcn.com/)** - Beautiful, accessible components
- **[Framer Motion](https://www.framer.com/motion/)** - Smooth animations
- **[HealOps SDK](https://www.npmjs.com/package/@sourabhkumawat0105/healops-opentelemetry)** - OpenTelemetry integration

## 📝 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_HEALOPS_API_KEY` | Your HealOps API key | ✅ Yes | - |
| `NEXT_PUBLIC_HEALOPS_ENDPOINT` | HealOps ingestion endpoint | ❌ No | `https://engine.healops.ai/otel/errors` |

## 🚨 Troubleshooting

### Errors not appearing in HealOps?

1. **Check your API key** - Ensure `NEXT_PUBLIC_HEALOPS_API_KEY` is set correctly
2. **Verify the endpoint** - Confirm `NEXT_PUBLIC_HEALOPS_ENDPOINT` is correct
3. **Check the console** - Look for initialization messages in the terminal
4. **Restart the server** - Environment variables require a server restart

### Build errors?

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

## 📄 License

This demo application is provided as-is for demonstration purposes.

## 🤝 Support

For questions or issues:
- 📧 Email: support@healops.ai
- 🌐 Website: [healops.ai](https://healops.ai)
- 📚 Documentation: [docs.healops.ai](https://docs.healops.ai)

---

**Made with ❤️ by the HealOps Team**
