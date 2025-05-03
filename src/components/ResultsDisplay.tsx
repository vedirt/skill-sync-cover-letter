import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { AgentResults } from "@/pages/Index";
import ElevenLabsWidget from "./ElevenLabsWidget";

interface ResultsDisplayProps {
  results: AgentResults;
  userData: {
    name: string;
    email: string;
    phone: string;
  };
}

const ResultsDisplay = ({ results, userData }: ResultsDisplayProps) => {
  const [activeTab, setActiveTab] = useState("resume");

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
  };

  const formatScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-amber-600";
    return "text-red-600";
  };

  const renderMarkdown = (text: string) => {
    return { __html: formatMarkdown(text) };
  };

  const formatMarkdown = (text: string) => {
    // Basic markdown formatting
    let formatted = text
      // Headers
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold my-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold my-3">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold my-2">$1</h3>')
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      // Lists
      .replace(/^\s*\* (.*$)/gim, '<li class="ml-5 list-disc">$1</li>')
      .replace(/^\s*\d+\. (.*$)/gim, '<li class="ml-5 list-decimal">$1</li>')
      // Paragraphs
      .replace(/^\s*(\n)?([^\n]+)/gim, (_match, _p1, p2) => {
        const trimmed = p2.trim();
        return trimmed.match(/^<(\/?)(h\d|ul|ol|li|p)/) ? trimmed : '<p class="mb-4">' + trimmed + '</p>';
      });

    // Group list items
    formatted = formatted
      .replace(/<li class="ml-5 list-disc">(.*?)<\/li>\s*<li class="ml-5 list-disc">/gs, '<li class="ml-5 list-disc">$1</li><li class="ml-5 list-disc">')
      .replace(/<li class="ml-5 list-disc">(.*?)<\/li>/gs, '<ul class="my-4">$&</ul>');

    // Clean up any duplicate tags
    formatted = formatted
      .replace(/<\/ul>\s*<ul class="my-4">/gs, '')
      .replace(/<\/p><p class="mb-4">/g, '<br>');

    return formatted;
  };

  return (
    <div className="animate-slide-in">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-primary">
          Your Customized Application Documents
        </h2>
        <p className="text-gray-600">
          Your resume and cover letter have been optimized for your target role
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="coverLetter">Cover Letter</TabsTrigger>
          <TabsTrigger value="review">Review & Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="resume">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Customized Resume</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex gap-2"
                  onClick={() => copyToClipboard(results.customizedResume, "Resume")}
                >
                  <Copy size={16} />
                  Copy Resume
                </Button>
              </div>

              <div className="prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={renderMarkdown(results.customizedResume)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coverLetter">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Cover Letter</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex gap-2"
                  onClick={() => copyToClipboard(results.coverLetter, "Cover Letter")}
                >
                  <Copy size={16} />
                  Copy Cover Letter
                </Button>
              </div>

              <div className="prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={renderMarkdown(results.coverLetter)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Resume Review</h3>
                <div className="flex items-center mb-4">
                  <div
                    className={`text-3xl font-bold ${formatScoreColor(
                      results.resumeReview.score
                    )}`}
                  >
                    {results.resumeReview.score.toFixed(1)}/10
                  </div>
                  <div className="ml-4 text-sm text-gray-600">
                    Resume Score
                  </div>
                </div>
                <div className="prose prose-sm max-w-none">
                  <div dangerouslySetInnerHTML={renderMarkdown(results.resumeReview.text)} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Cover Letter Review</h3>
                <div className="flex items-center mb-4">
                  <div
                    className={`text-3xl font-bold ${formatScoreColor(
                      results.coverLetterReview.score
                    )}`}
                  >
                    {results.coverLetterReview.score.toFixed(1)}/10
                  </div>
                  <div className="ml-4 text-sm text-gray-600">
                    Cover Letter Score
                  </div>
                </div>
                <div className="prose prose-sm max-w-none">
                  <div dangerouslySetInnerHTML={renderMarkdown(results.coverLetterReview.text)} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Company Research</h3>
                <div className="prose prose-sm max-w-none">
                  <div dangerouslySetInnerHTML={renderMarkdown(results.companyResearch)} />
                </div>
              </CardContent>
            </Card>

            <ElevenLabsWidget
              company={results.companyResearch.split('\n')[0]} // Extract company name from first line
              role={results.customizedResume.split('\n')[0]} // Extract role from first line
              userName={userData.name}
              jobDescription={results.jobDescription || ''}
              customizedResume={results.customizedResume}
              coverLetter={results.coverLetter}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ResultsDisplay;
