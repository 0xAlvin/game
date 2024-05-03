"use client"

import Score from "@/components/score/Score";


export default function RootLayout({ children }: { children: React.ReactNode; }) {

    return (
        <div>
            <Score>
                {children}
            </Score>
        </div>
    );
}