import { FiArrowRight, FiMic, FiVideo } from 'react-icons/fi'

interface Call {
  call_id: string
  project_id: string
  interviewee_name: string
  interviewee_role: string
  created_at: string
  updated_at: string
  status: 'Audio' | 'Video'
}

const calls: Call[] = [
  {
    call_id: "c0dae91c-5c0a-45c1-b2ec-ee6d4c6f6da4",
    project_id: "f8ea8c2b-9943-409e-9b0c-146fb16bfc34",
    interviewee_name: "Rajkumar",
    interviewee_role: "CEO",
    created_at: "2024-07-04T15:55:54.974000+00:00",
    updated_at: "2024-07-04T16:10:21.575000+00:00",
    status: "Audio"
  },
  {
    call_id: "a2c3f173-ef96-493f-9980-0cd86d9a5e70",
    project_id: "f8ea8c2b-9943-409e-9b0c-146fb16bfc34",
    interviewee_name: "Rajkumar",
    interviewee_role: "CEO",
    created_at: "2024-07-05T01:49:47.120000+00:00",
    updated_at: "2024-07-05T01:49:47.120000+00:00",
    status: "Video"
  },
  {
    call_id: "51fd2ef7-6cee-49b0-9a75-c80fece859fc",
    project_id: "bfcec7d7-0680-4e05-b68a-dc3a899f6a39",
    interviewee_name: "Rajkumar",
    interviewee_role: "CEO",
    created_at: "2024-07-05T01:58:17.289000+00:00",
    updated_at: "2024-07-05T02:08:43.244000+00:00",
    status: "Audio"
  },
  {
    call_id: "b362abd0-bf8d-49e6-8610-3a407f92a2d8",
    project_id: "bfcec7d7-0680-4e05-b68a-dc3a899f6a39",
    interviewee_name: "Rajkumar",
    interviewee_role: "CEO",
    created_at: "2024-07-05T02:09:47.011000+00:00",
    updated_at: "2024-07-05T02:09:47.011000+00:00",
    status: "Video"
  },
  {
    call_id: "b362abd0-bf8d-49e6-8610-3a407f92a2d8",
    project_id: "bfcec7d7-0680-4e05-b68a-dc3a899f6a39",
    interviewee_name: "Rajkumar",
    interviewee_role: "CEO",
    created_at: "2024-07-05T02:09:47.011000+00:00",
    updated_at: "2024-07-05T02:09:47.011000+00:00",
    status: "Video"
  },
  {
    call_id: "b362abd0-bf8d-49e6-8610-3a407f92a2d8",
    project_id: "bfcec7d7-0680-4e05-b68a-dc3a899f6a39",
    interviewee_name: "Tom",
    interviewee_role: "CEO",
    created_at: "2024-07-05T02:09:47.011000+00:00",
    updated_at: "2024-07-05T02:09:47.011000+00:00",
    status: "Audio"
  },
  {
    call_id: "b362abd0-bf8d-49e6-8610-3a407f92a2d8",
    project_id: "bfcec7d7-0680-4e05-b68a-dc3a899f6a39",
    interviewee_name: "Rajkumar",
    interviewee_role: "CEO",
    created_at: "2024-07-05T02:09:47.011000+00:00",
    updated_at: "2024-07-05T02:09:47.011000+00:00",
    status: "Video"
  },
  {
    call_id: "b362abd0-bf8d-49e6-8610-3a407f92a2d8",
    project_id: "bfcec7d7-0680-4e05-b68a-dc3a899f6a39",
    interviewee_name: "Barry",
    interviewee_role: "CEO",
    created_at: "2024-07-05T02:09:47.011000+00:00",
    updated_at: "2024-07-05T02:09:47.011000+00:00",
    status: "Audio"
  },
  {
    call_id: "b362abd0-bf8d-49e6-8610-3a407f92a2d8",
    project_id: "bfcec7d7-0680-4e05-b68a-dc3a899f6a39",
    interviewee_name: "John",
    interviewee_role: "CEO",
    created_at: "2024-07-05T02:09:47.011000+00:00",
    updated_at: "2024-07-05T02:09:47.011000+00:00",
    status: "Video"
  },
  {
    call_id: "b362abd0-bf8d-49e6-8610-3a407f92a2d8",
    project_id: "bfcec7d7-0680-4e05-b68a-dc3a899f6a39",
    interviewee_name: "Rajasekar",
    interviewee_role: "CEO",
    created_at: "2024-07-05T02:09:47.011000+00:00",
    updated_at: "2024-07-05T02:09:47.011000+00:00",
    status: "Audio"
  }
]

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

export default function ProjectCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {calls.map((call, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Call with {call.interviewee_name}</h3>
          <p className="text-gray-600 mb-4">{call.interviewee_role}</p>
          <div className="flex justify-between items-center mb-4">
            <span className={`px-2 py-1 rounded-full text-xs flex items-center ${
              call.status === 'Audio' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
            }`}>
              {call.status === 'Audio' ? <FiMic className="mr-1" /> : <FiVideo className="mr-1" />}
              {call.status}
            </span>
            <FiArrowRight className="text-gray-400" />
          </div>
          <div className="text-sm text-gray-500">
            <div>Start: {formatDate(call.created_at)}</div>
            <div>End: {formatDate(call.updated_at)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}