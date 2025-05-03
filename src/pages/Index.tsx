import { useState } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserForm from "@/components/UserForm";
import ProcessingScreen from "@/components/ProcessingScreen";
import ResultsDisplay from "@/components/ResultsDisplay";
import Header from "@/components/Header";
import ApiKeyInput from "@/components/ApiKeyInput";

export type UserFormData = {
  name: string;
  phone: string;
  email: string;
  resumeDraft: string;
  role: string;
  company: string;
  jobDescription: string;
};

export type AgentResults = {
  companyResearch: string;
  customizedResume: string;
  resumeReview: { text: string; score: number };
  coverLetter: string;
  coverLetterReview: { text: string; score: number };
  jobDescription: string;
};

const Index = () => {
  const [apiKey, setApiKey] = useState<string>("");
  const [formData, setFormData] = useState<UserFormData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [results, setResults] = useState<AgentResults | null>(null);
  const [activeTab, setActiveTab] = useState("form");

  const handleSubmit = async (data: UserFormData) => {
    if (!apiKey) {
      toast.error("Please enter a valid Gemini API key");
      return;
    }

    setFormData(data);
    setIsProcessing(true);
    setActiveTab("processing");

    try {
      // Company Research Agent
      setCurrentStep(1);
      const companyResearch = await fetchGeminiResponse(
        `Research the company ${data.company}. Focus on their values, culture, hiring process, and what they look for in candidates. Format the response as a concise summary.`,
        apiKey
      );
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing time

      // Resume Customizer Agent
      setCurrentStep(2);
      const customizedResume = await fetchGeminiResponse(
        `I need to customize this resume for a ${data.role} position at ${data.company}. 
        Here's information about the company: ${companyResearch}
        Here's my current resume: ${data.resumeDraft}
        Here's the job description: ${data.jobDescription}
        
        Please customize my resume to highlight relevant skills and experiences that match this job and company culture. 
        Format the result as a professional resume with clear sections. Keep the basic contact information from the original resume.
        Make it ATS friendly and focus on quantifiable achievements. Keep the length to one page.`,
        apiKey
      );
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Resume Reviewer Agent
      setCurrentStep(3);
      const resumeReviewResponse = await fetchGeminiResponse(
        `You are a hiring manager at ${data.company} for a ${data.role} position.
        Review this resume critically: ${customizedResume}
        
        Based on this job description: ${data.jobDescription}
        
        And this company information: ${companyResearch}
        
        Rate the resume on a scale of 1-10 and explain your rating. Consider ATS compatibility, relevance to the position, highlighting of achievements, and overall impression.
        
        Format your response as follows:
        Score: [1-10]
        Review: [Your detailed review]`,
        apiKey
      );
      
      // Parse the resume review
      const resumeReview = parseReviewResponse(resumeReviewResponse);
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Cover Letter Creator Agent
      setCurrentStep(4);
      const coverLetter = await fetchGeminiResponse(
        `Create a professional, personalized cover letter for a ${data.role} position at ${data.company}.
        
        Use this information about the company: ${companyResearch}
        The customized resume: ${customizedResume}
        And the job description: ${data.jobDescription}
        
        The cover letter should:
        1. Address the hiring manager professionally
        2. Express enthusiasm for the role and company
        3. Highlight 2-3 key achievements from the resume that are most relevant
        4. Connect skills to the job requirements
        5. Close with a call to action
        6. Keep it under 400 words and make it feel personal and customized, not generic
        
        Format it as a proper business letter with appropriate spacing and sections.`,
        apiKey
      );
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Cover Letter Reviewer Agent
      setCurrentStep(5);
      const coverLetterReviewResponse = await fetchGeminiResponse(
        `You are a hiring manager at ${data.company} for a ${data.role} position.
        Review this cover letter critically: ${coverLetter}
        
        Based on this job description: ${data.jobDescription}
        
        And this company information: ${companyResearch}
        
        Rate the cover letter on a scale of 1-10 and explain your rating. Consider personalization, relevance to the position, storytelling, connection to company values, and overall impression.
        
        Format your response as follows:
        Score: [1-10]
        Review: [Your detailed review]`,
        apiKey
      );
      
      // Parse the cover letter review
      const coverLetterReview = parseReviewResponse(coverLetterReviewResponse);

      // Combine all results
      setResults({
        companyResearch,
        customizedResume,
        resumeReview,
        coverLetter,
        coverLetterReview,
        jobDescription: data.jobDescription,
      });

      setCurrentStep(6);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setActiveTab("results");
      setIsProcessing(false);

    } catch (error) {
      console.error("Error processing request:", error);
      toast.error("An error occurred while processing your request");
      setIsProcessing(false);
      setActiveTab("form");
    }
  };

  const parseReviewResponse = (response: string) => {
    try {
      const scoreMatch = response.match(/Score:\s*(\d+(?:\.\d+)?)/i);
      const score = scoreMatch ? parseFloat(scoreMatch[1]) : 0;
      
      const reviewMatch = response.match(/Review:\s*([\s\S]+)/i);
      const text = reviewMatch ? reviewMatch[1].trim() : response;
      
      return { text, score };
    } catch (error) {
      console.error("Error parsing review:", error);
      return { text: response, score: 0 };
    }
  };

  return (
    <div className="min-h-screen bg-neutral flex flex-col">
      <Header />
      <main className="flex-1 container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">
            SkillSync: Resume & Cover Letter Builder
          </h1>
          <p className="text-gray-600 mt-2">
            Customize your resume and create compelling cover letters tailored to specific job opportunities
          </p>
        </div>

        {!apiKey ? (
          <ApiKeyInput onApiKeySubmit={setApiKey} />
        ) : (
          <Card className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="form" disabled={isProcessing}>
                  Input Details
                </TabsTrigger>
                <TabsTrigger value="processing" disabled={!isProcessing}>
                  Processing
                </TabsTrigger>
                <TabsTrigger value="results" disabled={!results}>
                  Results
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="form">
                <UserForm onSubmit={handleSubmit} />
              </TabsContent>
              
              <TabsContent value="processing">
                <ProcessingScreen currentStep={currentStep} />
              </TabsContent>
              
              <TabsContent value="results">
                {results && (
                  <ResultsDisplay 
                    results={results}
                    userData={{
                      name: formData?.name || "",
                      email: formData?.email || "",
                      phone: formData?.phone || ""
                    }}
                  />
                )}
              </TabsContent>
            </Tabs>
          </Card>
        )}
      </main>
      <footer className="bg-primary text-white py-6">
        <div className="container text-center">
          <p>© 2025 SkillSync - Professional Resume & Cover Letter Builder</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

async function fetchGeminiResponse(prompt: string, apiKey: string): Promise<string> {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the text from the response
    const textContent = data.candidates[0].content.parts[0].text;
    return textContent;
  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    throw error;
  }
}
