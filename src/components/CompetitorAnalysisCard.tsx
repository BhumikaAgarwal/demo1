import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Update with your actual imports
import { Button } from "@/components/ui/button"
import { InfoIcon } from "lucide-react"
import { FaArrowRight } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa'; // Import the close icon
import { ScrollArea } from "@/components/ui/scroll-area"
import { FaPen } from 'react-icons/fa'; // Import the pencil icon

const CompetitorAnalysisCard: React.FC = () => {
    const [selectedExplanation, setSelectedExplanation] = useState<string | null>(null);

    // Data for the card items
    const data = [
        {
            title: "Channel Engagement Comparison",
            content: "TechScale Solutions' LinkedIn engagement rate is 25% higher than competitors, driven by video and carousel ads.",
            explanation: "Our competitive analysis reveals that TechScale Solutions is outperforming key competitors on LinkedIn, with an engagement rate 25% higher than the industry average. This superior performance is primarily attributed to our strategic use of video content and carousel ads.\n\nKey findings:\n1. Video content: Our LinkedIn videos are generating 40% more views and 30% more shares compared to competitor averages.\n2. Carousel ads: These are driving 35% higher click-through rates than static posts, significantly above competitor benchmarks.\n3. Overall engagement: Combining likes, comments, and shares, we're seeing 25% higher engagement across all post types.\n\nFactors contributing to success:\n1. Content strategy: Focus on thought leadership and educational content rather than direct product promotion.\n2. Posting frequency: Consistent daily posts with peak-time targeting.\n3. Employee advocacy: Strong program encouraging employees to share and engage with company content.\n4. Ad creative: Use of attention-grabbing visuals and clear, benefit-focused messaging.\n\nCompetitor analysis:\n- Competitor A: Relies heavily on static image posts, with sporadic video content.\n- Competitor B: Good video strategy but lacks consistency in posting.\n- Competitor C: Strong overall presence but less effective ad creative.\n\nRecommendations:\n1. Increase investment in video content production, focusing on short-form, high-impact pieces.\n2. Expand the carousel ad strategy to showcase more aspects of our solutions.\n3. Develop a more robust employee advocacy program to further amplify our reach.\n4. Experiment with LinkedIn Live events to boost real-time engagement.\n5. Create a content calendar that ensures a balanced mix of post types and themes."
        },
        {
            title: "Journey Velocity Benchmark",
            content: "TechScale's LinkedIn-Web-CRM journey velocity is 15 days shorter on average than competitors focusing only on email and direct web channels.",
            explanation: "Our analysis of customer journey data reveals that TechScale Solutions' integrated LinkedIn-Web-CRM approach is significantly outperforming competitors who rely primarily on email and direct web channels. On average, our approach is shortening the customer journey by 15 days.\n\nKey observations:\n1. Journey stages: We're seeing faster progression through awareness, consideration, and decision stages.\n2. Touchpoint efficiency: Our approach requires fewer touchpoints to move prospects through the funnel.\n3. Conversion rate: Higher conversion rates at each stage of the funnel compared to industry benchmarks.\n\nBreakdown of the 15-day advantage:\n- Awareness to MQL: 5 days faster\n- MQL to SQL: 4 days faster\n- SQL to Opportunity: 3 days faster\n- Opportunity to Closed Won: 3 days faster\n\nFactors contributing to faster velocity:\n1. LinkedIn engagement: Provides a professional context and targets decision-makers more effectively.\n2. Seamless transition: Well-optimized pathway from LinkedIn content to relevant website pages.\n3. CRM integration: Allows for timely, personalized follow-ups based on LinkedIn and web interactions.\n4. Content strategy: Tailored content at each stage addressing specific pain points and objections.\n\nCompetitor comparison:\n- Competitor A: Heavily email-focused, leading to longer nurture cycles.\n- Competitor B: Strong web presence but lacks the professional targeting of LinkedIn.\n- Competitor C: Uses LinkedIn but hasn't effectively integrated it with web and CRM for a cohesive journey.\n\nRecommendations:\n1. Further optimize the LinkedIn to website journey with more targeted landing pages.\n2. Develop automated CRM workflows triggered by specific LinkedIn interactions.\n3. Create more stage-specific content to address common sticking points in the journey.\n4. Implement a lead scoring system that incorporates LinkedIn engagement metrics.\n5. Train sales team on effectively leveraging LinkedIn insights in their outreach and follow-ups."
        },
        {
            title: "Spend Allocation Comparison",
            content: "Competitor ad spend: LinkedIn 40%, Google 30%, Meta 20%, Display 10%. TechScale allocation: LinkedIn 35%, Meta 25%, Google 25%, Display 15%.",
            explanation: "An analysis of ad spend allocation across major digital channels reveals interesting differences between TechScale Solutions and our main competitors. This comparison provides insights into strategic priorities and potential opportunities.\n\nTechScale Solutions' allocation:\n- LinkedIn: 35%\n- Meta (Facebook/Instagram): 25%\n- Google: 25%\n- Display: 15%\n\nAverage competitor allocation:\n- LinkedIn: 40%\n- Google: 30%\n- Meta (Facebook/Instagram): 20%\n- Display: 10%\n\nKey observations:\n1. LinkedIn focus: Both we and competitors prioritize LinkedIn, recognizing its value for B2B targeting.\n2. Meta investment: We're allocating more to Meta compared to competitors, likely due to our success with retargeting and audience building.\n3. Google balance: Our spend is evenly split between Google and Meta, while competitors lean more heavily on Google.\n4. Display advertising: We're investing more in display ads, possibly for broader brand awareness.\n\nPotential implications:\n1. Our higher Meta spend might be giving us an edge in remarketing and reaching decision-makers in non-professional contexts.\n2. The lower LinkedIn spend (compared to competitors) might be offset by our higher organic engagement rates.\n3. Our balanced approach between Google and Meta could be providing more diverse top-of-funnel opportunities.\n4. The higher investment in display could be contributing to stronger brand recognition.\n\nRecommendations:\n1. Conduct a detailed ROI analysis of each channel to ensure our allocation is optimal.\n2. Consider slightly increasing LinkedIn spend to maintain competitive share of voice.\n3. Evaluate the performance of our higher Meta and Display allocations to justify the difference from competitor approaches.\n4. Experiment with shifting some budget to emerging channels or platforms not currently in the mix.\n5. Develop channel-specific KPIs to better compare performance across our allocation versus the competitor benchmark."
        }
    ];

    const handleInfoButtonClick = (explanation: string) => {
        setSelectedExplanation(explanation);
    };

    return (
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-sm col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-gray-800 dark:text-gray-200 text-lg font-semibold">Competitor Analysis</CardTitle>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500">
                    {/* More actions button */}
                </Button>
            </CardHeader>

            <CardContent className="p-0">
                <ScrollArea className="h-[240px]">
                    <div className="space-y-4 py-4 px-4">
                        {data.map((item, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                                <div className="flex items-start justify-between">
                                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">{item.title}</h3>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-500 p-1"
                                        onClick={() => handleInfoButtonClick(item.explanation)}
                                    >
                                        <InfoIcon className="h-4 w-4" />
                                        <span className="sr-only">Explain this analysis</span>
                                    </Button>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{item.content}</p>
                                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 text-xs h-6">
                                    View Full Analysis <FaArrowRight className="ml-1 h-3 w-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>

            {/* Conditionally render the explanation if it is selected */}
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
    );
};

export default CompetitorAnalysisCard;
