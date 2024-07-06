'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Call } from '../../types/calls';
import { AiOutlineExport } from "react-icons/ai";

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
          const transcribedResponse = await fetch(`/api/calls/${call_id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const transcribedData = await transcribedResponse.json();
          setTranscribedContent(transcribedData.transcribed_paragraph_content || null);

          // Fetch cleaned call data
          const cleanedResponse = await fetch(`/api/cleaned_call/${call_id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const cleanedData = await cleanedResponse.json();
          setQuestionsAnswers(cleanedData?.cleaned_transcript?.question_answer_json?.questions_answers || []);

          // Fetch key takeaway
          const takeawayResponse = await fetch(`/api/calls/get_key_takeaway?call_id=${call_id}`);
          const takeawayData = await takeawayResponse.json();
          setKeyTakeaway(takeawayData.key_takeaway || null);

          // Fetch summary
          const summaryResponse = await fetch(`/api/calls/get_summary?call_id=${call_id}`);
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
          <p className="text-gray-700 mt-5">{parts[0]}</p>
          <p className="mb-4 text-gray-600">{parts.slice(1).join(':')}</p>
        </div>
      );
    }
    return <p key={content} className="mb-2 text-gray-600">{content}</p>;
  };

  const renderQuestionsAnswers = (qa: QuestionAnswer[]) => {
    return qa.map((item, idx) => (
      <div key={idx} className="mb-4 shadow-md rounded-lg p-4">
        <p className="font-bold text-lg mb-2 text-gray-800">{item.question}</p>
        <p className='text-gray-700'>{item.answer}</p>
      </div>
    ));
  };

  const renderTakeaway = (text: string) => {
    return text.split('\n').map((line, index) => (
      <p key={index} className="mb-2 text-lg text-gray-700">
        {line.trim().startsWith('-') ? (
          <span className="inline-block w-4 h-4 mr-2 rounded-full"></span>
        ) : null}
        {line}
      </p>
    ));
  };

  const renderSummary = (text: string) => {
    return text.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-4 text-lg leading-relaxed text-gray-700">{paragraph}</p>
    ));
  };

  const handleExport = async () => {
    try {
      const response = await fetch(`/api/calls/export?call_id=${call_id}`);
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
        <TabSection activeTabHandler={setActiveTab} activeTab={activeTab}/>
        {/* <div className="flex space-x-2">
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
        </div> */}
        <button className="text-gray-600 hover:bg-gray-100 py-2 px-4 rounded transition flex items-center shadow-md" onClick={handleExport}>
        Export
        <AiOutlineExport  className='ml-2'/>
      </button>
        {/* <button
          onClick={handleExport}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors duration-200"
        >
          Export
        </button> */}
      </div>
      <div className="">
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
          <div className="rounded-lg shadow-lg p-6 border">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Key Takeaways</h2>
            {keyTakeaway ? renderTakeaway(keyTakeaway.takeaway_text) : <p>No Key Takeaway Found</p>}
          </div>
        )}
        {activeTab === 'summary' && (
          <div className="rounded-lg shadow-lg p-6 border">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Summary</h2>
            {summary ? renderSummary(summary.summary_text) : <p>No Summary Found</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default CallDetailPage;


const tabs = [
  { id: 'original', label: 'Original', icon: 'M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z' },
  { id: 'cleaned', label: 'Cleaned', icon: 'M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z' },
  { id: 'keyTakeaway', label: 'Key Takeaway', icon: 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' },
  { id: 'summary', label: 'Summary', icon: 'M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z' },
];

function TabSection({activeTabHandler, activeTab}) {
  //const [activeTab, setActiveTab] = useState('original');

  return (
    <div className="flex items-center space-x-4 p-2 bg-white rounded-lg shadow">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`px-3 py-1.5 rounded-md transition ${
            activeTab === tab.id
              ? ''
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          onClick={() => activeTabHandler(tab.id)}
        >
          <div className="flex items-center space-x-2">
            <span className={activeTab === tab.id ? 'text-purple-400' : ''}>
              {tab.label}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${activeTab === tab.id ? 'text-purple-400' : ''}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path fillRule="evenodd" d={tab.icon} clipRule="evenodd" />
            </svg>
          </div>
        </button>
      ))}
      {/* <div className="flex-grow"></div>
      <button className="text-gray-600 hover:bg-gray-100 px-3 py-1.5 rounded-md transition">
        Export
        <AiOutlineExport />
      </button> */}
    </div>
  );
}