'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { InfoIcon } from "lucide-react"
import { FaTimes } from 'react-icons/fa'; // Import the close icon
import { FaPen } from 'react-icons/fa'; // Import the pencil icon


interface Insight {
    insight: string;
    source: string;
    explanation: string;
}

const insightsData: Insight[] = [
    {
        insight: "Multi-touch journeys involving LinkedIn, email, and direct web visits yield a 30% higher conversion rate for enterprise deals.",
        source: "KiwiQ.ai Customer Journey Analysis",
        explanation: "Our AI-powered Customer Journey Analysis has identified a significant pattern in the conversion rates of enterprise deals. When prospects engage with our content across multiple channels - specifically LinkedIn, email, and direct web visits - we see a 30% increase in conversion rates compared to single-channel interactions.\n\nKey findings:\n1. LinkedIn engagement often serves as the initial touchpoint, creating brand awareness.\n2. Follow-up emails with personalized content based on LinkedIn interactions show high open and click-through rates.\n3. Prospects who then visit our website directly tend to spend more time on high-value pages (e.g., case studies, pricing).\n4. This multi-channel approach seems to build trust and familiarity, leading to higher conversion rates.\n\nRecommended actions:\n1. Develop an integrated campaign strategy that coordinates messaging across LinkedIn, email, and web channels.\n2. Use LinkedIn for top-of-funnel content and thought leadership.\n3. Create targeted email campaigns based on LinkedIn engagement.\n4. Optimize website content to capitalize on direct visits from email click-throughs.\n5. Implement lead scoring that takes into account this multi-channel engagement pattern."
    },
    {
        insight: "Accounts interacting with LinkedIn video content in the early stages saw a 20% faster progression to MQL status.",
        source: "LinkedIn Campaign Manager",
        explanation: "Analysis of our LinkedIn Campaign Manager data reveals that accounts engaging with our video content early in their journey are progressing to Marketing Qualified Lead (MQL) status 20% faster than those who don't.\n\nKey observations:\n1. Video content on LinkedIn is generating higher engagement rates (views, likes, shares) compared to static posts.\n2. Viewers who watch more than 75% of a video are 3x more likely to visit our website within 48 hours.\n3. These video-engaged accounts are showing higher intent signals (e.g., downloading whitepapers, attending webinars) once they reach our site.\n4. The faster MQL progression is particularly notable in the tech and finance sectors.\n\nPossible explanations:\n1. Video content may be more effective at quickly communicating our value proposition.\n2. The visual and auditory nature of video could be creating stronger brand recall.\n3. LinkedIn's algorithm might be favoring video content, increasing its reach to potential high-intent accounts.\n\nRecommended actions:\n1. Increase production of high-quality, informative video content for LinkedIn.\n2. Create a video series that guides prospects through the early stages of the buyer's journey.\n3. Ensure videos have clear CTAs directing viewers to relevant website content.\n4. Develop retargeting campaigns specifically for LinkedIn video viewers.\n5. Adjust lead scoring models to weigh LinkedIn video engagement more heavily."
    },
    {
        insight: "Direct web traffic following targeted LinkedIn ads shows a 15% higher likelihood to reach SQL stage.",
        source: "Google Analytics",
        explanation: "Our Google Analytics data, when cross-referenced with our LinkedIn ad campaigns, shows a compelling trend: users who visit our website directly after being exposed to our targeted LinkedIn ads are 15% more likely to reach the Sales Qualified Lead (SQL) stage.\n\nKey findings:\n1. There's a clear correlation between LinkedIn ad exposure and subsequent direct website visits (usually within 3-5 days).\n2. These visitors have a lower bounce rate (-25%) and higher pages per session (+40%) compared to other traffic sources.\n3. They're more likely to engage with high-value content like case studies, product comparisons, and pricing pages.\n4. The conversion rate from MQL to SQL for this segment is 15% higher than our baseline.\n\nPossible explanations:\n1. LinkedIn ads are effectively priming prospects, making them more receptive to our message when they visit the website.\n2. The targeting capabilities of LinkedIn ensure we're reaching the right decision-makers, leading to higher-quality website traffic.\n3. The combination of LinkedIn's professional context and our ad content is creating stronger intent among prospects.\n\nRecommended actions:\n1. Increase budget allocation for targeted LinkedIn ad campaigns.\n2. Ensure strong message consistency between LinkedIn ads and corresponding landing pages.\n3. Develop specific website content journeys for visitors coming from LinkedIn ads.\n4. Implement more granular tracking to better attribute this LinkedIn-to-direct-visit pathway.\n5. Create remarketing campaigns on other platforms (e.g., Google Ads) to reinforce messaging for these high-intent visitors."
    },
    {
        insight: "Customer journey involving LinkedIn and email re-engagement reduces deal cycle time by 18% for deals over $100K.",
        source: "Salesforce & HubSpot",
        explanation: "By analyzing data from both Salesforce and HubSpot, we've uncovered a significant trend in our high-value deals (over $100K): when the customer journey includes both LinkedIn engagement and strategic email re-engagement, we're seeing an 18% reduction in overall deal cycle time.\n\nKey observations:\n1. Initial engagement often occurs on LinkedIn, typically with thought leadership content or employee posts.\n2. Prospects who then receive personalized email follow-ups based on their LinkedIn activity show higher open and click-through rates.\n3. The email re-engagement often includes invitations to webinars, custom demos, or exclusive content, which accelerates the nurturing process.\n4. Deals following this pattern are moving through pipeline stages faster, with fewer touchpoints needed at each stage.\n\nPossible explanations:\n1. The combination of LinkedIn's professional context and personalized email follow-up is creating a more informed and ready-to-engage prospect.\n2. Our sales team is able to have more meaningful conversations earlier in the process due to the prospect's increased familiarity with our offering.\n3. The multi-channel approach may be helping to keep our solution top-of-mind during the typically longer enterprise sales cycle.\n\nRecommended actions:\n1. Develop an integrated LinkedIn and email nurture program specifically for high-value prospects.\n2. Train the sales team on how to leverage a prospect's LinkedIn engagement history in their outreach and conversations.\n3. Create more targeted, high-value content for both LinkedIn and email that speaks directly to the needs of $100K+ deal prospects.\n4. Implement an lead scoring model that takes into account both LinkedIn engagement and email interaction for faster routing of high-potential deals.\n5. Set up automated workflows in HubSpot that trigger personalized email sequences based on specific LinkedIn activities."
    },
    {
        insight: "Accounts with Google and Meta retargeting touchpoints increased average deal size by 10% in Q3.",
        source: "Google Ads Performance Planner",
        explanation: "Analysis of our Q3 data using the Google Ads Performance Planner, cross-referenced with our CRM data, reveals that accounts exposed to both Google and Meta (Facebook/Instagram) retargeting ads saw a 10% increase in average deal size compared to those without these touchpoints.\n\nKey findings:\n1. Accounts with retargeting touchpoints on both platforms showed 2.5x more return visits to high-value pages (e.g., pricing, enterprise solutions).\n2. These accounts had a 30% higher engagement rate with bottom-of-funnel content.\n3. Sales reported that these leads were often more informed about our full range of offerings, leading to larger initial contracts.\n4. The increase in deal size was most pronounced in the mid-market segment.\n\nPossible explanations:\n1. Consistent presence across multiple platforms may be reinforcing brand recall and perceived value.\n2. Retargeting ads are effectively nurturing prospects by showcasing different aspects of our solution over time.\n3. The combination of professional (Google) and personal (Meta) ad placements might be influencing decision-makers in various contexts.\n\nRecommended actions:\n1. Increase budget allocation for coordinated Google and Meta retargeting campaigns.\n2. Develop a sequential retargeting strategy that guides prospects through the full value proposition over time.\n3. Create platform-specific ad creatives that complement each other but leverage the unique strengths of each platform.\n4. Implement more granular segmentation in retargeting campaigns based on initial interaction source and behavior.\n5. Provide sales team with insights into a prospect's ad exposure history to tailor their approach and potentially upsell larger packages."
    }];

const InsightList: React.FC = () => {
    const [selectedExplanation, setSelectedExplanation] = useState<string | null>(null);

    const handleButtonClick = (explanation: string) => {
        console.log('Button clicked, setting explanation:', explanation); // Debugging log
        setSelectedExplanation(explanation); // Set the explanation in state
    }

    return (
        <Card className="bg-white border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-600">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-gray-800 dark:text-white text-lg font-semibold">Key Customer Journey Patterns</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <ScrollArea className="h-[240px]">
                    <div className="space-y-2 p-4">
                        {insightsData.map((item, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md flex items-start justify-between">
                                <div>
                                    <div className="text-sm font-medium text-gray-800 dark:text-white mb-1">{item.insight}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">Source: {item.source}</div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-1"
                                    onClick={() => handleButtonClick(item.explanation)} // Trigger the explanation display
                                >
                                    <InfoIcon className="h-4 w-4" />
                                    <span className="sr-only">Explain this insight</span>
                                </Button>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>

            {/* Display the selected explanation */}
            {/* Explanation Section */}
            {/* Explanation Section */}
            {selectedExplanation && (
                <div className="fixed top-1/4 right-4 z-50 p-6 bg-gray-100 dark:bg-gray-700 rounded-md text-sm text-gray-800 dark:text-white shadow-lg max-h-[500px] w-80">
                    {/* Close Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedExplanation(null)}
                        className="absolute top-2 right-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
                    >
                        <FaTimes className="h-5 w-5" />
                    </Button>

                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">AI Assistant
                    </h3>

                    {/* Scrollable Content with padding at the bottom */}
                    <div className="max-h-[380px] overflow-y-auto mb-4 pb-16">
                        <p className="whitespace-pre-line">{selectedExplanation}</p>
                    </div>

                    {/* Input Box with Pencil Icon */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 rounded-b-md">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Ask me anything..."
                                className="w-full p-2 pl-4 pr-8 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            />
                            <FaPen className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300" />
                        </div>
                    </div>
                </div>
            )}







        </Card>
    )
}

export default InsightList
