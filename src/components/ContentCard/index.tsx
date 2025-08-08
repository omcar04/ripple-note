'use client';
import {ReactNode} from 'react';

export default function ContentCard({
                                        title,
                                        titleColor = "#048998",
                                        content,
                                        placeholder,
                                        actionButton,
                                    }: {
    title: string;
    titleColor: string;
    content: string;
    placeholder?: string;
    actionButton?: ReactNode;
}) {
    return (
        <div className="max-w-3xl w-full flex flex-col items-center space-y-6">
            <h1 className="text-3xl font-bold text-center" style={{color: titleColor}}>{title}</h1>

            <div
                className="w-full max-h-96 overflow-y-auto bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-gray-800 font-medium leading-relaxed tracking-wide whitespace-pre-wrap"
            >
                {content || (
                    <span className="text-gray-400 font-light">{placeholder}</span>
                )}
            </div>

            {actionButton && (
                <div className="flex flex-wrap justify-center gap-4 pt-2">{actionButton}</div>
            )}
        </div>
    );
}
