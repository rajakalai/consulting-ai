'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Call } from '../../types/calls';

interface QuestionAnswer {
  question: string;
  answer: string;
}

interface KeyTakeaway {
  takeaway_text: string;
}

interface Summary {
  summary_text: string;
}

const CallDetailPage = () => {
  const router = useRouter();
  const { call_id } = useParams();
  const [call, setCall] = useState<Call | null>(null);
  const [transcribedContent, setTranscribedContent] = useState<string | null>(null);
  const [questionsAnswers, setQuestionsAnswers] = useState<QuestionAnswer[]>([]);
  const [keyTakeaway, setKeyTakeaway] = useState<KeyTakeaway | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [activeTab, setActiveTab] = useState('original');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (call_id) {
        setIsLoading(true);
        try {
          // Fetch call data
          const callResponse = await fetch('/api/calls', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
          });
          const callData = await callResponse.json();
          const foundCall = callData.calls?.find((c: Call) => c.call_id === call_id) || null;
          setCall(foundCall);

          // Fetch transcribed content
          const transcribedResponse = await fetch(`/api/calls/${call_id}?call_id=${call_id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const transcribedData = await transcribedResponse.json();
          setTranscribedContent(transcribedData.transcribed_paragraph_content || null);

          // Fetch cleaned call data
          const cleanedResponse = await fetch(`/api/cleaned_call/${call_id}?call_id=${call_id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const cleanedData = await cleanedResponse.json();
          setQuestionsAnswers(cleanedData?.cleaned_transcript?.question_answer_json?.questions_answers || []);

          // Fetch key takeaway
          const takeawayResponse = await fetch(`https://fj7isl6mih.execute-api.ap-south-1.amazonaws.com/prod/call/get_key_takeaway?call_id=${call_id}`);
          const takeawayData = await takeawayResponse.json();
          setKeyTakeaway(takeawayData.key_takeaway || null);

          // Fetch summary
          const summaryResponse = await fetch(`https://fj7isl6mih.execute-api.ap-south-1.amazonaws.com/prod/call/get_summary?call_id=${call_id}`);
          const summaryData = await summaryResponse.json();
          setSummary(summaryData.summaries || null);

        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [call_id]);

  const renderContent = (content: string) => {
    const parts = content.split(':');
    if (parts.length > 1) {
      return (
        <div key={content}>
          <p className="font-semibold mb-2">{parts[0]}:</p>
          <p className="mb-4">{parts.slice(1).join(':')}</p>
        </div>
      );
    }
    return <p key={content} className="mb-2">{content}</p>;
  };

  const renderQuestionsAnswers = (qa: QuestionAnswer[]) => {
    return qa.map((item, idx) => (
      <div key={idx} className="mb-4 bg-gray-50 rounded-lg shadow p-4">
        <p className="font-bold text-lg mb-2">{item.question}</p>
        <p>{item.answer}</p>
      </div>
    ));
  };

  const renderTakeaway = (text: string) => {
    return text.split('\n').map((line, index) => (
      <p key={index} className="mb-2 text-lg leading-relaxed">
        {line.trim().startsWith('-') ? (
          <span className="inline-block w-4 h-4 mr-2 bg-blue-500 rounded-full"></span>
        ) : null}
        {line}
      </p>
    ));
  };

  const renderSummary = (text: string) => {
    return text.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-4 text-lg leading-relaxed">{paragraph}</p>
    ));
  };

  const handleExport = async () => {
    try {
      const response = await fetch(`https://2r14owmlna.execute-api.ap-south-1.amazonaws.com/prod/call/export_cleaned_call?call_id=${call_id}`);
      const data = await response.json();
      if (data.file_url) {
        window.open(data.file_url, '_blank');
      } else {
        console.error('File URL not found in the response');
      }
    } catch (error) {
      console.error('Error exporting file:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-xl font-semibold text-blue-500">Loading awesome content...</p>
          <p className="mt-2 text-gray-600">Hang tight, it's worth the wait! 😉</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 text-black">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          {['original', 'cleaned', 'keyTakeaway', 'summary'].map((tab) => (
            <button
              key={tab}
              className={`py-2 px-4 rounded transition-colors duration-200 ${
                activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <button
          onClick={handleExport}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200"
        >
          Export
        </button>
      </div>
      <div className="bg-white shadow rounded p-6">
        {activeTab === 'original' && (
          <div>
            {transcribedContent ? 
              transcribedContent.split('\n').map((line, index) => renderContent(line))
              : <p>No Data Found</p>
            }
          </div>
        )}
        {activeTab === 'cleaned' && (
          <div>
            {questionsAnswers.length > 0 ? renderQuestionsAnswers(questionsAnswers) : <p>No Data Found</p>}
          </div>
        )}
        {activeTab === 'keyTakeaway' && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6 border border-blue-200">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Key Takeaways</h2>
            {keyTakeaway ? renderTakeaway(keyTakeaway.takeaway_text) : <p>No Key Takeaway Found</p>}
          </div>
        )}
        {activeTab === 'summary' && (
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg shadow-lg p-6 border border-green-200">
            <h2 className="text-2xl font-bold mb-4 text-green-700">Summary</h2>
            {summary ? renderSummary(summary.summary_text) : <p>No Summary Found</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default CallDetailPage;