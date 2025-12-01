"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Database, Clock, Loader2 } from "lucide-react";

type ErrorType = "js-error" | "db-error" | "timeout";

interface ErrorState {
  loading: boolean;
  result: string | null;
  isError: boolean;
}

export function ErrorButtons() {
  const [states, setStates] = useState<Record<ErrorType, ErrorState>>({
    "js-error": { loading: false, result: null, isError: false },
    "db-error": { loading: false, result: null, isError: false },
    timeout: { loading: false, result: null, isError: false },
  });

  const triggerError = async (type: ErrorType, endpoint: string) => {
    setStates((prev) => ({
      ...prev,
      [type]: { loading: true, result: null, isError: false },
    }));

    try {
      const response = await fetch(endpoint);
      const data = await response.json().catch(() => ({ error: "Unknown error" }));

      if (!response.ok) {
        setStates((prev) => ({
          ...prev,
          [type]: {
            loading: false,
            result: data.error || data.message || "Error occurred",
            isError: true,
          },
        }));
      } else {
        setStates((prev) => ({
          ...prev,
          [type]: {
            loading: false,
            result: "Success (unexpected)",
            isError: false,
          },
        }));
      }
    } catch (error) {
      setStates((prev) => ({
        ...prev,
        [type]: {
          loading: false,
          result: error instanceof Error ? error.message : "Network error",
          isError: true,
        },
      }));
    }
  };

  const buttonConfig = [
    {
      type: "js-error" as ErrorType,
      label: "Trigger JS Error",
      endpoint: "/api/error",
      icon: AlertCircle,
      variant: "destructive" as const,
    },
    {
      type: "db-error" as ErrorType,
      label: "Trigger DB Error",
      endpoint: "/api/db-error",
      icon: Database,
      variant: "destructive" as const,
    },
    {
      type: "timeout" as ErrorType,
      label: "Trigger Timeout",
      endpoint: "/api/timeout",
      icon: Clock,
      variant: "destructive" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {buttonConfig.map(({ type, label, endpoint, icon: Icon, variant }, index) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant={variant}
              size="lg"
              className="w-full h-auto py-4 flex flex-col gap-2"
              onClick={() => triggerError(type, endpoint)}
              disabled={states[type].loading}
            >
              {states[type].loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <Icon className="h-6 w-6" />
              )}
              <span className="text-sm font-semibold">{label}</span>
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Results Display */}
      <div className="space-y-3">
        {Object.entries(states).map(([type, state]) => {
          if (!state.result) return null;
          return (
            <motion.div
              key={type}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-start gap-3 p-4 rounded-lg bg-zinc-900 border border-zinc-800"
            >
              <Badge variant={state.isError ? "destructive" : "success"}>
                {state.isError ? "ERROR" : "SUCCESS"}
              </Badge>
              <div className="flex-1">
                <p className="text-sm text-zinc-300 font-mono">{state.result}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
