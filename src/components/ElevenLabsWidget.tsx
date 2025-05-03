import { useEffect } from 'react';

// Declare the custom element for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        'agent-id': string;
        'dynamic-variables': string;
      }, HTMLElement>;
    }
  }
}

interface ElevenLabsWidgetProps {
  company: string;
  role: string;
  userName: string;
  jobDescription: string;
  customizedResume: string;
  coverLetter: string;
}

const ElevenLabsWidget = ({
  company,
  role,
  userName,
  jobDescription,
  customizedResume,
  coverLetter,
}: ElevenLabsWidgetProps) => {
  useEffect(() => {
    // Load the Eleven Labs widget script
    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/convai-widget/index.js';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  const dynamicVariables = {
    company,
    role,
    user_name: userName,
    job_description: jobDescription,
    customized_resume: customizedResume,
    cover_letter: coverLetter,
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Practice Your Interview</h3>
      <p className="text-gray-600 mb-4">
        Use our AI-powered interview practice tool to prepare for your interview at {company}
      </p>
      <elevenlabs-convai
        agent-id="RKI2nWI1rXEegXRL4wdr"
        dynamic-variables={JSON.stringify(dynamicVariables)}
      />
    </div>
  );
};

export default ElevenLabsWidget; 