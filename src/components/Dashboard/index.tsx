import React, {useState} from 'react';
import SpeechToText from "@/components/SpeechToText";
import Insight from "@/components/Insight";
import ClientOnly from '@/components/ClientOnly';

const Dashboard = () => {
    const [summary, setSummary] = useState('');
    const [transcript, setTranscript] = useState('');
    const [isSummarizing, setIsSummarizing] = useState(false);


    const handleSummarize = async () => {
        setIsSummarizing(true);
        try {
            const res = await fetch('/api/summarize', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({transcript}),
            });

            const data = await res.json();
            const summaryText = data?.summary?.kwargs?.content;
            setSummary(summaryText);
        } catch (err) {
            console.error('Failed to summarize:', err);
        } finally {
            setIsSummarizing(false);
        }
    };

    return (
        <ClientOnly>
            <div
                className="w-full mt-8 min-h-screen p-4 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-stretch">

                <SpeechToText setTranscript={setTranscript}/>


                <div className="relative flex items-center justify-center md:w-auto md:h-full my-2 group">
                    {/* Summarize button */}
                    <button
                        onClick={handleSummarize}
                        disabled={isSummarizing || !transcript.trim()}
                        className={`w-14 h-14 rounded-full text-white font-semibold shadow-md transition flex items-center justify-center relative ${
                            isSummarizing || !transcript.trim()
                                ? 'bg-[#035c66] opacity-60 cursor-not-allowed'
                                : 'bg-[#048998] hover:shadow-lg hover:scale-110 hover:ring-4 hover:cursor-pointer'
                        }`}

                    >
                        {isSummarizing ? (
                            <span className="text-4xl animate-spin">ꕀ</span>
                        ) : (
                            <span className="text-4xl">ꕀ</span>
                        )}
                    </button>

                    {/* Tooltip for disabled state */}
                    {!transcript.trim() && (
                        <div
                            className="absolute top-full mt-2 px-2 py-1 text-xs text-gray-800 bg-[#f6f5f5] rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
                            Speak or add transcript first
                        </div>
                    )}
                </div>

                <Insight outputText={summary}/>
            </div>
        </ClientOnly>
    )
}


export default Dashboard;