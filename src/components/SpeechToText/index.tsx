'use client';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import {useEffect, useState} from 'react';
import ContentCard from "@/components/ContentCard";


export default function SpeechToText({setTranscript}: { setTranscript: (t: string) => void }) {

    const [isListening, setIsListening] = useState(false);
    const {transcript, browserSupportsSpeechRecognition} = useSpeechRecognition()

    useEffect(() => {
        setTranscript(transcript);
    }, [transcript, setTranscript]);


    if (!browserSupportsSpeechRecognition) {
        return <span>Your browser doesn’t support speech recognition.</span>;
    }

    return (
        <ContentCard title={"Transcript Stream"}
                     titleColor={"#048998"}
                     content={transcript}
                     placeholder={"Your voice becomes words here. Go ahead."}
                     actionButton={<button
                         onClick={() => {
                             if (isListening) {
                                 SpeechRecognition.stopListening();
                                 setIsListening(false);
                             } else {
                                 SpeechRecognition.startListening({continuous: true, language: 'en-IN'});
                                 setIsListening(true);
                             }
                         }}
                         className={`py-2 px-4 rounded font-semibold text-white shadow-lg transition ${
                             isListening
                                 ? 'bg-red-500 hover:bg-red-600 hover:cursor-pointer'
                                 : 'bg-[#048998] hover:opacity-90 hover:cursor-pointer'
                         }`}
                     >
                         {isListening ? 'Stop Listening' : 'Start Listening'}
                     </button>}/>
    );
}
