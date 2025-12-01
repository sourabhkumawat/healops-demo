import { initHealOpsOTel } from "@sourabhkumawat0105/healops-opentelemetry";

// Initialize HealOps OpenTelemetry SDK
initHealOpsOTel({
  apiKey: process.env.NEXT_PUBLIC_HEALOPS_API_KEY!,
  serviceName: "healops-nextjs-demo",
  endpoint: process.env.NEXT_PUBLIC_HEALOPS_ENDPOINT || "https://engine.healops.ai/otel/errors"
});

console.log("✅ HealOps OpenTelemetry SDK initialized");
