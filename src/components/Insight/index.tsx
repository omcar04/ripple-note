'use client';
import React, {useState} from "react";
import ContentCard from "@/components/ContentCard";
import SuccessPopup from "@/components/SuccessPop";

export default function Insight({
                                    outputText = "Here are the key takeaways from today's meeting:\n" +
                                        "\n" +
                                        "- Feature X implementation is complete.\n" +
                                        "- Optimistic UI updates tested successfully.\n" +
                                        "- Draft.js rich text support in progress."
                                }: { outputText: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [emailContent, setEmailContent] = useState('');
    const [emailLoading, setEmailLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [recipients, setRecipients] = useState<string[]>([]);
    const [showSuccess, setShowSuccess] = useState(false);

    const generateEmail = async () => {
        setEmailLoading(true);
        try {
            const res = await fetch('/api/generate-email', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({summary: outputText})
            });
            const data = await res.json();
            setEmailContent(data.email || '');
            setIsModalOpen(true);
        } catch (err) {
            console.error("Failed to generate email", err);
        } finally {
            setEmailLoading(false);
        }
    };

    const addRecipient = () => {
        if (emailInput.trim()) {
            setRecipients(prev => [...prev, emailInput.trim()]);
            setEmailInput('');
        }
    };

    const removeRecipient = (index: number) => {
        setRecipients(prev => prev.filter((_, i) => i !== index));
    };

    const handleSendEmail = async () => {
        if (recipients.length === 0) {
            alert('Please add at least one recipient.');
            return;
        }
        setSending(true);
        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    recipients,
                    subject: "Meeting Summary",
                    emailContent
                })
            });

            const data = await res.json();
            if (data.success) {
                setShowSuccess(true);
                setIsModalOpen(false);
                setRecipients([]);
            } else {
                alert('Failed to send email: ' + (data.error || 'Unknown error'));
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong while sending email.');
        } finally {
            setSending(false);
        }
    };

    return (
        <>
            <ContentCard
                title="Core Insights"
                titleColor="#05b6ca"
                content={outputText}
                placeholder="Threading your thoughts into insight..."
                actionButton={
                    <div className="relative group">
                        <button
                            onClick={generateEmail}
                            disabled={!outputText.trim() || emailLoading}
                            className={`transition-all duration-300 flex items-center gap-2 shadow-lg px-4 py-2 rounded text-white font-semibold ${
                                emailLoading || !outputText.trim()
                                    ? 'bg-[#035c66] opacity-60 cursor-not-allowed'
                                    : 'bg-[#048998] hover:opacity-90 hover:cursor-pointer'
                            }`}
                        >
                            {emailLoading ? 'Rippling...' : 'Ripple It'}
                        </button>

                        {!outputText.trim() && (
                            <div
                                className="absolute left-1/2 top-full mt-2 transform -translate-x-1/2 px-3 py-1 text-xs text-gray-800 bg-[#f6f5f5] rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none z-10">
                                Generate a summary before rippling
                            </div>
                        )}
                    </div>
                }
            />

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center px-4"
                >
                    <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6 space-y-4 relative">
                        <h2 className="text-2xl font-bold text-[#035c66]">Review & Send Email</h2>

                        <div className="space-y-2">
                            <label className="font-semibold">To:</label>
                            <div className="flex gap-2 flex-wrap">
                                {recipients.map((email, index) => (
                                    <span
                                        key={index}
                                        className="bg-[#048998] text-white rounded-full px-3 py-1 text-sm flex items-center gap-2"
                                    >
                                        {email}
                                        <button
                                            onClick={() => removeRecipient(index)}
                                            className="text-white hover:text-red-300"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2 mt-2">
                                <input
                                    type="email"
                                    value={emailInput}
                                    onChange={(e) => setEmailInput(e.target.value)}
                                    placeholder="Enter email"
                                    className="flex-1 border border-gray-300 rounded px-3 py-2"
                                />
                                <button
                                    onClick={addRecipient}
                                    className="bg-[#048998] text-white px-4 py-2 rounded hover:opacity-90"
                                >
                                    Add
                                </button>
                            </div>
                        </div>

                        <textarea
                            value={emailContent}
                            onChange={(e) => setEmailContent(e.target.value)}
                            className="w-full h-60 p-4 border border-gray-300 rounded resize-none"
                        />

                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-700 hover:underline"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleSendEmail}
                                disabled={sending || recipients.length === 0}
                                className={`px-6 py-2 rounded text-white font-semibold ${
                                    sending || recipients.length === 0
                                        ? 'bg-[#035c66] opacity-60 cursor-not-allowed'
                                        : 'bg-[#048998] hover:opacity-90 hover:cursor-pointer'
                                }`}
                            >
                                {sending ? 'Sending...' : 'Send'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showSuccess && (
                <SuccessPopup message="Rippled!" onClose={() => setShowSuccess(false)}/>
            )}
        </>
    );
}
