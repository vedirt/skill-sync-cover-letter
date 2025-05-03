
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

interface ApiKeyInputProps {
  onApiKeySubmit: (key: string) => void;
}

const ApiKeyInput = ({ onApiKeySubmit }: ApiKeyInputProps) => {
  const [key, setKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!key.trim()) {
      toast.error("Please enter a valid Gemini API key");
      return;
    }
    onApiKeySubmit(key.trim());
    toast.success("API key saved successfully");
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Enter your Gemini API Key</h2>
      <p className="text-gray-600 mb-6">
        To use SkillSync, you need to provide a Google Gemini API key. This key is used to power the AI
        features of the application and is never stored on our servers.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="api-key" className="text-sm font-medium">
            Gemini API Key
          </label>
          <Input
            id="api-key"
            type="password"
            placeholder="Enter your Gemini API key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="pt-2">
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </div>
      </form>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>
          Don't have a Gemini API key?{" "}
          <a
            href="https://ai.google.dev/tutorials/setup"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Learn how to get one here
          </a>
        </p>
      </div>
    </Card>
  );
};

export default ApiKeyInput;
