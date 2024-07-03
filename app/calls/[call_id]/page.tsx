// 'use client';

// import { useRouter, useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { Call } from '../../types/calls';

// interface QuestionAnswer {
//   question: string;
//   answer: string;
// }

// const CallDetailPage = () => {
//   const router = useRouter();
//   const { call_id } = useParams();
//   const [call, setCall] = useState<Call | null>(null);
//   const [transcribedContent, setTranscribedContent] = useState<string | null>(null);
//   const [questionsAnswers, setQuestionsAnswers] = useState<QuestionAnswer[]>([]);
//   const [activeTab, setActiveTab] = useState('tab1');

//   useEffect(() => {
//     if (call_id) {
//       fetch('/api/calls', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({}), // Sending an empty object in the body
//       })
//         .then(response => response.json())
//         .then(data => {
//           const callData = data.calls?.find((call: Call) => call.call_id === call_id) || null;
//           setCall(callData);
//         });

//       fetch(`/api/calls/${call_id}?call_id=${call_id}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//         .then(response => response.json())
//         .then(data => {
//           console.log('Transcribed Content:', data.transcribed_paragraph_content);
//           setTranscribedContent(data.transcribed_paragraph_content || null);
//         });

//       fetch(`/api/cleaned_call/${call_id}?call_id=${call_id}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//         .then(response => response.json())
//         .then(data => {
//           console.log('Questions and Answers:', data.questions_answers);
//           setQuestionsAnswers(data.cleaned_transcript.question_answer_json.questions_answers || []);
//         });
//     }
//   }, [call_id]);

//   if (!call) return <div>Loading...</div>;

//   const renderContent = (content: string) => {
//     return content.split('\n').map((str, idx) => (
//       <p key={idx} className="mb-2">{str}</p>
//     ));
//   };

//   const renderQuestionsAnswers = (qa: QuestionAnswer[]) => {
//     return qa.map((item, idx) => (
//       <div key={idx} className="border p-4 mb-4 rounded shadow-md">
//         <p className="font-bold text-lg mb-2">{item.question}</p>
//         <p>{item.answer}</p>
//       </div>
//     ));
//   };

//   return (
//     <div className="container mx-auto p-4 text-black">
//       <h1 className="text-2xl font-bold mb-4">Call Detail: {call_id}</h1>
//       <div className="mb-4 flex justify-center space-x-4">
//         <button
//           className={`py-2 px-4 ${activeTab === 'tab1' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           onClick={() => setActiveTab('tab1')}
//         >
//           Original
//         </button>
//         <button
//           className={`py-2 px-4 ${activeTab === 'tab2' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//           onClick={() => setActiveTab('tab2')}
//         >
//           Cleaned
//         </button>
//       </div>
//       <div className="bg-white shadow rounded p-6">
//         {activeTab === 'tab1' && transcribedContent && renderContent(transcribedContent)}
//         {activeTab === 'tab2' && renderQuestionsAnswers(questionsAnswers)}
//       </div>
//     </div>
//   );
// };

// export default CallDetailPage;


// 'use client';

// import { useRouter, useParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { Call } from '../../types/calls';

// interface QuestionAnswer {
//   question: string;
//   answer: string;
// }

// const CallDetailPage = () => {
//   const router = useRouter();
//   const { call_id } = useParams();
//   const [call, setCall] = useState<Call | null>(null);
//   const [transcribedContent, setTranscribedContent] = useState<string | null>(null);
//   const [questionsAnswers, setQuestionsAnswers] = useState<QuestionAnswer[]>([]);
//   const [activeTab, setActiveTab] = useState('tab1');

//   useEffect(() => {
//     if (call_id) {
//       fetch('/api/calls', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({}), // Sending an empty object in the body
//       })
//         .then(response => response.json())
//         .then(data => {
//           const callData = data.calls?.find((call: Call) => call.call_id === call_id) || null;
//           setCall(callData);
//         });

//       fetch(`/api/calls/${call_id}?call_id=${call_id}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//         .then(response => response.json())
//         .then(data => {
//           console.log('Transcribed Content:', data.transcribed_paragraph_content);
//           setTranscribedContent(data.transcribed_paragraph_content || null);
//         });

//       fetch(`/api/cleaned_call/${call_id}?call_id=${call_id}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//         .then(response => response.json())
//         .then(data => {
//           console.log('Questions and Answers:', data.questions_answers);
//           setQuestionsAnswers(data.cleaned_transcript.question_answer_json.questions_answers || []);
//         });
//     }
//   }, [call_id]);

//   if (!call) return <div>Loading...</div>;

//   const renderContent = (content: string) => {
//     return content.split('\n').map((str, idx) => (
//       <p key={idx} className="mb-2">{str}</p>
//     ));
//   };

//   const renderQuestionsAnswers = (qa: QuestionAnswer[]) => {
//     return qa.map((item, idx) => (
//       <div key={idx} className="mb-4">
//         <p className="font-bold text-lg mb-2">{item.question}</p>
//         <p>{item.answer}</p>
//       </div>
//     ));
//   };

//   return (
//     <div className="container mx-auto p-4 text-black">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Call Detail: {call_id}</h1>
//         <div className="flex space-x-2">
//           <button
//             className={`py-2 px-4 rounded ${activeTab === 'tab1' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//             onClick={() => setActiveTab('tab1')}
//           >
//             Original
//           </button>
//           <button
//             className={`py-2 px-4 rounded ${activeTab === 'tab2' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//             onClick={() => setActiveTab('tab2')}
//           >
//             Cleaned
//           </button>
//         </div>
//       </div>
//       <div className="bg-white shadow rounded p-6">
//         {activeTab === 'tab1' && transcribedContent && (
//           <div className="flex">
//             <div className="w-1/2 pr-4 border-r">
//               <h2 className="text-xl font-bold mb-4">Speaker 1</h2>
//               {renderContent(transcribedContent)}
//             </div>
//             <div className="w-1/2 pl-4">
//               <h2 className="text-xl font-bold mb-4">Speaker 2</h2>
//               {renderContent(transcribedContent)}
//             </div>
//           </div>
//         )}
//         {activeTab === 'tab2' && (
//           <div>
//             <h2 className="text-xl font-bold mb-4">Questions & Answers</h2>
//             {renderQuestionsAnswers(questionsAnswers)}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CallDetailPage;

'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Call } from '../../types/calls';

interface QuestionAnswer {
  question: string;
  answer: string;
}

const CallDetailPage = () => {
  const router = useRouter();
  const { call_id } = useParams();
  const [call, setCall] = useState<Call | null>(null);
  const [transcribedContent, setTranscribedContent] = useState<string | null>(null);
  const [questionsAnswers, setQuestionsAnswers] = useState<QuestionAnswer[]>([]);
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
          console.log('cleaned data', cleanedData)
          setQuestionsAnswers(cleanedData?.cleaned_transcript?.question_answer_json?.questions_answers || []);
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
        <div>
          <p className="font-semibold mb-2">{parts[0]}:</p>
          <p className="mb-4">{parts.slice(1).join(':')}</p>
        </div>
      );
    }
    return <p className="mb-2">{content}</p>;
  };

  const renderQuestionsAnswers = (qa: QuestionAnswer[]) => {
    return qa.map((item, idx) => (
      <div key={idx} className="mb-4 bg-gray-50 rounded-lg shadow p-4">
        <p className="font-bold text-lg mb-2">{item.question}</p>
        <p>{item.answer}</p>
      </div>
    ));
  };

  const handleExport = async () => {
    try {
      const response = await fetch(`https://2r14owmlna.execute-api.ap-south-1.amazonaws.com/prod/call/export_cleaned_call?call_id=${call_id}`);
      const data = await response.json();
      console.log('response', response.json())
      if (data.file_url) {
        window.open(data.file_url, '_blank');
      } else {
        console.error('File URL not found in the response');
      }
    } catch (error) {
      console.error('Error exporting file:', error);
    }
  };

  if (isLoading) return <div className='text-white'>Loading...</div>;

  return (
    <div className="container mx-auto p-4 text-black">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button
            className={`py-2 px-4 rounded ${activeTab === 'original' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('original')}
          >
            Original
          </button>
          <button
            className={`py-2 px-4 rounded ${activeTab === 'cleaned' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveTab('cleaned')}
          >
            Cleaned
          </button>
        </div>
        <button
          onClick={handleExport}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
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
      </div>
    </div>
  );
};

export default CallDetailPage;