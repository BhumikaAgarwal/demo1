'use client'

import React, { ReactNode, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Bell, ChevronDown, ChevronRight, Home, Settings, Users, Zap, PlusCircle, User, Folder, Search, MoreVertical, Calendar, ChevronRightIcon, Edit, Database, Mail, MessageSquare, FileText, FileImage, MousePointer, Send, Download, Menu, BarChart2, Lightbulb, HeartPulse, ArrowRight, InfoIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ErrorBoundary } from 'react-error-boundary'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'


const ErrorFallback = ({ error }: { error: { message: string } }) => (
  <div role="alert" className="p-4 bg-red-100 text-red-900 rounded-md">
    <h2 className="text-lg font-semibold">Oops! Something went wrong.</h2>
    <p>Error: {error.message}</p>
  </div>
);


const performanceData = [
  { week: 'Week 1', 'Financial Services': 45, 'Healthcare': 30, 'Government': 35 },
  { week: 'Week 2', 'Financial Services': 50, 'Healthcare': 28, 'Government': 38 },
  { week: 'Week 3', 'Financial Services': 55, 'Healthcare': 32, 'Government': 36 },
  { week: 'Week 4', 'Financial Services': 52, 'Healthcare': 35, 'Government': 40 },
  { week: 'Week 5', 'Financial Services': 58, 'Healthcare': 33, 'Government': 42 },
  { week: 'Week 6', 'Financial Services': 62, 'Healthcare': 36, 'Government': 39 },
]
interface VerticalCardProps {
  title: string;
  icon: React.ReactNode; // Adjust type based on what icon is
  value: string; // Adjust based on your requirements
  change: string; // Adjust based on your requirements
  color: string; // Assuming color is a string for class names
  onDiveDeeper: () => void; // Assuming this is a function
}
const VerticalCard: React.FC<VerticalCardProps> = ({ title, icon, value, change, color, onDiveDeeper }) => (

  <Card className={`bg-gradient-to-br ${color} border-none transition-all duration-300 hover:shadow-xl`}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
      <CardTitle className="text-gray-800 text-lg font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent className="pt-2">
      <div className="text-xl font-bold text-gray-800">{value}</div>
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-700 mt-2">{change}</span>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-gray-800 hover:text-gray-700"
          onClick={() => onDiveDeeper()}
        >
          Dive Deeper
        </Button>
      </div>
    </CardContent>
  </Card>
)

export default function Component() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['Actions']))
  const [currentView, setCurrentView] = useState("Messaging Resonance")
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [currentScreen, setCurrentScreen] = useState('dashboard')
  const [frequency, setFrequency] = useState('weekly')
  const [isRightSidebarExpanded, setIsRightSidebarExpanded] = useState(false)
  const [startDate, setStartDate] = useState('2024-10-24')
  const [endDate, setEndDate] = useState('2024-10-31')
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Alex', content: "Set up a weekly digest of messaging effectiveness across our entire customer lifecycle." },
    { sender: 'AI', content: "Certainly, Alex! I'll set that up for you. To clarify:\n1. Should we include all customer touchpoints: marketing, sales, and customer success?\n2. Would you like the report to compare this week's data with previous weeks?" },
    { sender: 'Alex', content: "Yes, include all customer touchpoints. And yes, please compare with the previous 4 weeks of data." },
    { sender: 'AI', content: "Got it, Alex. Here's a breakdown of the comprehensive workflow I'll set up for you:\n\n1. Data Collection and Analysis: Our Messaging Effectiveness Analyst will gather and analyze data from all customer touchpoints:\n   - Marketing campaigns (email, social media, ads)\n   - Sales conversations and pitches\n   - Customer success interactions\n\n2. Report Generation: A detailed Messaging Effectiveness Report will be created, comparing this week's data with the previous 4 weeks across all touchpoints.\n\n3. Insights Extraction: The analyst will identify key insights and trends, focusing on how messages resonate throughout the customer lifecycle.\n\n4. Distribution: \n   - The full report will be sent to your email.\n   - Key insights, trends, and recommended next steps will be shared on Slack.\n\nThis approach will give you a complete view of message effectiveness across the entire customer journey. Does this workflow meet your requirements?" }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [selectedCampaign, setSelectedCampaign] = useState("Q2 2024: Email & LinkedIn Marketing")
  const [dateRange, setDateRange] = useState("Last 6 Weeks")

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(section)) {
        newSet.delete(section)
      } else {
        newSet.add(section)
      }
      return newSet
    })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { sender: 'Alex', content: newMessage }])
      setNewMessage('')
      setTimeout(() => {
        setChatMessages(prev => [...prev, { sender: 'AI', content: "I've received your message and I'm processing it. I'll update the workflow accordingly." }])
      }, 1000)
    }
  }

  const handleDiveDeeper = (topic: string) => {
    // Placeholder for dive deeper functionality
    console.log(`Diving deeper into: ${topic}`)
  }

  interface Subitem {
    name: string;
    special?: boolean;
  }
  interface SidebarItem {
    icon: ReactNode;
    name: string;
    subitems?: (string | Subitem)[];
  }

  const renderSidebarItem = (item: SidebarItem, index: number) => (
    <div key={item.name} className="space-y-1">
      <Button
        variant="ghost"
        className={`w-full justify-start text-left hover:bg-gray-800 hover:text-white ${expandedSections.has(item.name) ? 'bg-gray-800 text-white' : 'text-gray-400'}`}
        onClick={() => {
          if (item.name === 'Dashboard') {
            setCurrentScreen('dashboard');
          } else if (!isSidebarCollapsed && item.subitems) {
            toggleSection(item.name);
          }
        }}
      >
        <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center w-full' : ''}`}>
          <div className={`${isSidebarCollapsed ? 'text-gray-300' : ''}`}>
            {item.icon}
          </div>
          {!isSidebarCollapsed && <span className="ml-2 text-base">{item.name}</span>}
        </div>
        {!isSidebarCollapsed && item.subitems && (
          expandedSections.has(item.name) ?
            <ChevronDown className="ml-auto h-5 w-5" /> :
            <ChevronRight className="ml-auto h-5 w-5" />
        )}
      </Button>
      {!isSidebarCollapsed && item.subitems && expandedSections.has(item.name) && (
        <div className="ml-6 space-y-1">
         {item.subitems?.map((subitem: string | { name: string; special?: boolean }) => (
  <Button
    key={typeof subitem === 'string' ? subitem : subitem.name}
    variant="ghost"
    className={`w-full justify-start text-left text-sm py-1 px-2 h-auto hover:bg-gray-800 hover:text-white ${
      typeof subitem !== 'string' && subitem.special ? 'text-blue-400 hover:text-blue-300' : 'text-gray-400'
    }`}
    onClick={() => {
      if (typeof subitem === 'string') {
        if (subitem === 'Weekly Messaging Effectiveness Automation') {
          setCurrentScreen('weeklyMessagingEffectivenessDigest');
        } else if (subitem === 'Email Message Resonance Report') {
          setCurrentScreen('emailMessageResonanceReport');
        }
      }
    }}
  >
    <div className="flex items-center w-full">
      {typeof subitem !== 'string' && subitem.special && <PlusCircle className="mr-2 h-4 w-4 flex-shrink-0" />}
      <span className="flex-grow whitespace-normal">
        {typeof subitem === 'string' ? subitem : subitem.name}
      </span>
    </div>
  </Button>
))}

        </div>
      )}
      {index === 2 && <hr className="border-gray-700 my-2" />}
    </div>
  )

  const renderDashboardContent = () => (
    <>
      <div className="sticky top-0 bg-white z-10 py-4 px-8 shadow-sm">
        <header className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>


            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-900 text-sm font-medium">
                  {currentView} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-white text-gray-700 border-gray-200">
                <DropdownMenuItem onSelect={() => setCurrentView("Messaging Resonance")} className="hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900">
                  Messaging Resonance
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setCurrentView("Channel Effectiveness")} className="hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900">
                  Channel Effectiveness
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setCurrentView("Competitive Intelligence")} className="hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900">
                  Competitive Intelligence
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center space-x-4">
            <Input className="bg-white border-gray-300 text-sm w-64" placeholder="Search..." />
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </header>
      </div>

      <div className="px-8 py-6">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <VerticalCard
            title="Financial Services"
            icon={<BarChart2 className="h-4 w-4 text-gray-800" />}
            value="65% increase in Email engagement"
            change="Primary Value Prop: Zero-Trust Compliance"
            color="from-blue-100 to-blue-200"
            onDiveDeeper={() => handleDiveDeeper("Financial Services")}
          />
          <VerticalCard
            title="Healthcare"
            icon={<Lightbulb className="h-4 w-4 text-gray-800" />}
            value="Reduction in sales cycle"
            change="1.8x faster deal velocity post-HIPAA messaging pivot"
            color="from-green-100 to-green-200"
            onDiveDeeper={() => handleDiveDeeper("Healthcare")}
          />
          <VerticalCard
            title="Government"
            icon={<HeartPulse className="h-4 w-4 text-gray-800" />}
            value="22% Competitive Win Rate"
            change="New Cloudflare Triad campaign winning 5-1 in H2H"
            color="from-purple-100 to-purple-200"
            onDiveDeeper={() => handleDiveDeeper("Government")}
          />

        </div>

        <Card className="bg-white border-gray-200 shadow-sm mb-6">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-gray-800 text-xl font-semibold">Messaging Effectiveness Trends</CardTitle>
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-900">
                    <Calendar className="mr-2 h-4 w-4" />
                    {selectedCampaign}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white text-gray-700 border-gray-200">
                  <DropdownMenuItem onSelect={() => setSelectedCampaign("Q2 2024: Email & LinkedIn Marketing")} className="hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900">
                    Q2 2024: Email & LinkedIn Marketing
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSelectedCampaign("Q2 2024: Meta and Google Ads")} className="hover:bg-gray-100  hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900">
                    Q2 2024: Meta and Google Ads
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setSelectedCampaign("Q2 2024: All channels")} className="hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900">
                    Q2 2024: All channels
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-900">
                    {dateRange} <Calendar className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white text-gray-700 border-gray-200">
                  <DropdownMenuItem onSelect={() => setDateRange("Last 6 Weeks")} className="hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900">
                    Last 6 Weeks
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setDateRange("Last Quarter")} className="hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900">
                    Last Quarter
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setDateRange("Last Year")} className="hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900">
                    Last Year
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Dive Deeper</DropdownMenuItem>
                  <DropdownMenuItem>Not helpful</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="week"
                    stroke="#6B7280"
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    tickLine={{ stroke: '#9CA3AF' }}
                  />
                  <YAxis
                    stroke="#6B7280"
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    tickLine={{ stroke: '#9CA3AF' }}
                    domain={[0, 'auto']}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'white', border: '1px solid #E5E7EB', borderRadius: '4px' }}
                    labelStyle={{ color: '#111827', fontWeight: 'bold' }}
                    itemStyle={{ color: '#374151' }}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    iconType="circle"
                    wrapperStyle={{ paddingBottom: '10px' }}
                  />
                  <Line type="monotone" dataKey="Financial Services" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Healthcare" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Government" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-3 gap-6">
          <Card className="bg-white border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-gray-800 text-lg font-semibold">Quick Insights</CardTitle>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-700">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[240px]">
                <div className="space-y-2 p-4">
                  {[
                    {
                      insight: "Compliance automation messaging increased engagement by 25% with financial services clients.",
                      source: "In-app Engagement Tracking",
                      explanation: "This insight is based on a comparative analysis of user engagement metrics before and after introducing the compliance automation messaging. We tracked in-app interactions, time spent on relevant pages, and direct feedback from financial services clients.\n\nMethodology:\n1. Measured baseline engagement for 4 weeks prior to new messaging.\n2. Introduced compliance automation messaging across various touchpoints (website, emails, in-app notifications).\n3. Monitored engagement for 4 weeks post-introduction.\n4. Calculated percentage increase in engagement metrics.\n\nKey Findings:\n- Click-through rates on compliance-related content increased by 32%\n- Time spent on compliance automation feature pages increased by 45%\n- Direct inquiries about compliance automation features increased by 28%\n\nThis suggests that our messaging is resonating strongly with the pain points and needs of financial services clients, particularly around automating compliance processes."
                    },
                    {
                      insight: "Patient data security messaging outperformed other themes by 37% in the healthcare segment.",
                      source: "Campaign Performance Dashboard",
                      explanation: "This insight comes from our Campaign Performance Dashboard, which aggregates data from various marketing channels and compares the performance of different messaging themes within specific industry segments.\n\nMethodology:\n1. Identified key messaging themes used in healthcare campaigns (e.g., patient data security, operational efficiency, regulatory compliance).\n2. Tracked performance metrics across email, social media, and display ad campaigns for each theme.\n3. Calculated engagement rates (clicks, shares, conversions) for each theme.\n4. Compare patient data security messaging against other themes.\n\nKey Findings:\n- Patient data security messaging had a 42% higher click-through rate\n- Content focusing on this theme was shared 35% more often on professional networks\n- Landing pages emphasizing patient data security had a 29% higher conversion rate\n\nThis strongly indicates that healthcare prospects are particularly concerned about data security, likely due to strict HIPAA regulations and the sensitive nature of patient information."
                    },
                    {
                      insight: "Government segment showed strong interest (+18% sentiment) in 'real-time threat detection' messaging.",
                      source: "Customer Feedback Analysis",
                      explanation: "This insight is derived from our Customer Feedback Analysis system, which uses natural language processing to analyze sentiment across various customer interaction points, including support tickets, sales call transcripts, and survey responses.\n\nMethodology:\n1. Collected feedback data from government sector clients and prospects over the last quarter.\n2. Used NLP to categorize feedback into key themes (e.g., threat detection, compliance, ease of use).\n3. Performed sentiment analysis on feedback related to each theme.\n4. Compared sentiment scores for 'real-time threat detection' against baseline sentiment for other themes.\n\nKey Findings:\n- Mentions of 'real-time threat detection' increased by 27% in customer communications\n- Positive sentiment around this theme was 18% higher than the average for other themes\n- 65% of government sector prospects specifically inquired about real-time detection capabilities\n\nThis suggests that emphasizing our real-time threat detection capabilities could be a powerful differentiator in the government sector, possibly due to increasing concerns about cyber attacks on public infrastructure."
                    },
                    {
                      insight: "Retail clients engaged 30% more with 'secure payments' messaging in recent campaigns.",
                      source: "Sales Call Transcripts",
                      explanation: "This insight is based on an analysis of our sales call transcripts with retail sector prospects and clients over the past quarter.\n\nMethodology:\n1. Used speech-to-text AI to transcribe all sales calls with retail sector contacts.\n2. Employed natural language processing to identify key themes and topics discussed.\n3. Tracked engagement metrics such as call duration, follow-up requests, and expressed interest when 'secure payments' was discussed.\n4. Compared these metrics to calls where other messaging themes were prominent.\n\nKey Findings:\n- Calls featuring 'secure payments' messaging lasted 25% longer on average\n- 40% more follow-up requests were made after calls emphasizing payment security\n- Sales reps reported 35% higher levels of expressed interest when discussing this topic\n\nThis increased engagement likely stems from the retail sector's growing concerns about payment fraud and the need to maintain customer trust in online and mobile payment systems. It suggests that our secure payment solutions are addressing a critical pain point for retail clients."
                    },
                    {
                      insight: "Our 'data encryption' messaging increased conversion rate by 20% in regulated industries.",
                      source: "Weekly Sentiment Analysis",
                      explanation: "This insight is derived from our Weekly Sentiment Analysis report, which combines data from various sources including website analytics, email campaign performance, and CRM data.\n\nMethodology:\n1. Identified campaigns and content specifically emphasizing 'data encryption' across all marketing channels.\n2. Segmented audience into regulated industries (e.g., finance, healthcare, legal) and non-regulated industries.\n3. Compared conversion rates (defined as moving to next stage in sales pipeline) for campaigns with and without strong 'data encryption' messaging.\n4. Analyzed sentiment in follow-up communications and sales notes.\n\nKey Findings:\n- Regulated industry prospects exposed to 'data encryption' messaging were 20% more likely to move forward in the sales process\n- Email open rates for 'data encryption' focused content were 15% higher in regulated industries\n- Sales calls that emphasized our encryption capabilities lasted 30% longer on average\n\nThis suggests that data encryption is a critical decision factor for buyers in regulated industries, likely due to strict data protection regulations and the high cost of potential data breaches. Emphasizing our encryption capabilities could be a key differentiator in these markets."
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md flex items-start justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-800 mb-1">{item.insight}</div>
                        <div className="text-xs text-gray-500">Source: {item.source}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-gray-700 p-1"
                        onClick={() => {
                          console.log('Explanation requested for:', item.insight)
                        }}
                      >
                        <InfoIcon className="h-4 w-4" />
                        <span className="sr-only">Explain this insight</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card className="bg-white border-gray-200 shadow-sm col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-gray-800 text-lg font-semibold">Competitor Analysis</CardTitle>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-700">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[240px]">
                <div className="space-y-4 py-4 px-4">
                  {[
                    {
                      title: "Competitor Messaging Themes",
                      content: "Primary competitor, SecureStack, emphasizes 'scalability' (60% of campaigns) and 'ease of integration' (40%) across sectors, contrasting with our focus on security.",
                      explanation: "This analysis is based on a comprehensive review of our primary competitor's marketing materials, public communications, and customer-facing content over the last quarter.\n\nMethodology:\n1. Collected competitor's marketing materials from their website, social media, and industry events.\n2. Used natural language processing to identify and categorize main themes in their messaging.\n3. Quantified the frequency of each theme across different marketing channels.\n4. Compared their messaging focus to our own marketing strategy.\n\nKey Findings:\n- 60% of competitor's campaigns emphasized 'scalability'\n  - Often highlighted ability to handle growing data volumes and user bases\n  - Frequently mentioned cloud-native architecture and elastic scaling\n- 40% of campaigns focused on 'ease of integration'\n  - Stressed compatibility with existing tech stacks\n  - Highlighted pre-built connectors and open APIs\n- Only 20% of their messaging directly addressed security concerns\n\nImplications:\n1. Our competitor may be targeting rapidly growing companies or those undergoing digital transformation.\n2. They might perceive integration challenges as a major pain point for potential customers.\n3. Their relative lack of security-focused messaging could be a weakness we can exploit, especially in regulated industries.\n\nRecommended Action:\nConsider creating targeted campaigns that highlight how our solution offers scalability and easy integration WITHOUT compromising on security. This could help us differentiate from the competitor while addressing the same customer needs they're targeting."
                    },
                    {
                      title: "Competitor Positioning Shift",
                      content: "Main competitor, CyberGuard Pro, has pivoted messaging to 'rapid deployment' for financial services, emphasizing speed over security.",
                      explanation: "This insight is based on a longitudinal analysis of our main competitor's marketing strategy, specifically focusing on their approach to the financial services sector.\n\nMethodology:\n1. Tracked competitor's marketing materials, press releases, and product updates over the past 12 months.\n2. Analyzed changes in key messaging themes and positioning statements.\n3. Conducted sentiment analysis on industry forums and social media to gauge market reception.\n\nKey Findings:\n- 6 months ago: Competitor's financial services messaging focused on 'robust security' and 'regulatory compliance'\n- 3 months ago: Began introducing 'quick implementation' as a secondary theme\n- Last month: Launched new campaign with 'Secure in Seconds' tagline, emphasizing rapid deployment\n- Recent webinars and white papers focus heavily on implementation speed and time-to-value\n\nPossible Reasons for Shift:\n1. May be responding to market feedback about lengthy implementation times\n2. Could be trying to differentiate from other security-focused competitors (like us)\n3. Might be targeting smaller financial institutions or fintech startups with faster decision-making processes\n\nPotential Risks of Their Approach:\n- Could be perceived as downplaying the complexity of proper security implementation\n- Might raise concerns among more security-conscious financial institutions\n\nRecommended Action:\n1. Emphasize the thoroughness of our security implementation process\n2. Highlight case studies showing how our comprehensive approach prevents future issues\n3. Create content addressing the risks of prioritizing speed over security in financial services\n4. Consider developing a 'rapid secure deployment' program that maintains our security standards while improving implementation speed"
                    },
                    {
                      title: "Message Resonance Comparison",
                      content: "Our compliance automation theme achieved 4.3x engagement in financial services vs. SecureStack's 3.1x with 'scalability' theme.",
                      explanation: "This comparison is derived from a combination of our own engagement metrics and estimated engagement data for our competitor's campaigns.\n\nMethodology:\n1. Analyzed our own campaign performance data for the 'compliance automation' theme in the financial services sector.\n2. Used social listening tools and public engagement metrics to estimate competitor's performance with their 'scalability' theme.\n3. Calculated engagement multipliers by comparing theme-specific engagement to baseline engagement rates for each company.\n\nOur Performance:\n- Baseline engagement rate: 2.1%\n- 'Compliance automation' engagement rate: 9.03%\n- Engagement multiplier: 4.3x\n\nCompetitor's Estimated Performance:\n- Estimated baseline engagement rate: 1.9%\n- Estimated 'scalability' theme engagement rate: 5.89%\n- Estimated engagement multiplier: 3.1x\n\nKey Insights:\n1. Our 'compliance automation' message is resonating more strongly with the financial services audience than our competitor's 'scalability' message.\n2. This suggests that addressing specific pain points (like compliance challenges) may be more effective than general capability messaging (like scalability) in this sector.\n3. The higher engagement could indicate that compliance automation is a more pressing concern for financial services companies than scalability issues.\n\nRecommended Actions:\n1. Double down on compliance automation messaging in financial services marketing.\n2. Develop more detailed content (whitepapers, case studies) around compliance automation to capitalize on this interest.\n3. Consider expanding this theme to adjacent regulated industries (e.g., healthcare, legal) to see if it resonates similarly.\n4. Explore other specific pain points in financial services that we could address in future campaigns."
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md">
                      <div className="flex items-start justify-between">
                        <h3 className="text-sm font-semibold text-gray-800 mb-1">{item.title}</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-500 hover:text-gray-700 p-1"
                          onClick={() => {
                            console.log('Explanation requested for:', item.title)
                          }}
                        >
                          <InfoIcon className="h-4 w-4" />
                          <span className="sr-only">Explain this analysis</span>
                        </Button>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{item.content}</p>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 text-xs h-6">
                        View Full Analysis <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )

  const renderWeeklyMessagingEffectivenessDigest = () => (
    <div className="flex h-screen bg-gray-950 text-gray-200 font-sans">
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="sticky top-0 bg-gray-950 z-10 py-6 px-8">
          <header className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-white">Weekly Messaging Effectiveness Automation</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Input className="bg-gray-800 border-gray-700 text-base w-72" placeholder="Search..." />
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-100 hover:bg-gray-800">
                <Bell className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-100 hover:bg-gray-800">
                <User className="h-6 w-6" />
              </Button>
            </div>
          </header>
        </div>

        <div className="flex-1 overflow-hidden flex">
          <div className="flex-1 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1 p-6">
              <Card className="bg-gray-900 border-gray-800 mb-6">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Natural Language Workflow Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border border-gray-700 rounded-lg p-4 h-96 overflow-y-auto">
                      {chatMessages.map((message, index) => (
                        <div key={index} className={`flex ${message.sender === 'Alex' ? 'justify-end' : 'justify-start'} mb-4`}>
                          <div className={`flex items-start ${message.sender === 'Alex' ? 'flex-row-reverse' : ''}`}>
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>{message.sender[0]}</AvatarFallback>
                            </Avatar>
                            <div className={`mx-2 p-3 rounded-lg ${message.sender === 'Alex' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                              <p className="text-sm text-white">{message.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleSendMessage} className="flex space-x-2">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your workflow request..."
                        className="flex-grow bg-gray-800 border-gray-700 text-white"
                      />
                      <Button type="submit">Send</Button>
                    </form>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800 mb-6">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Automation Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Report Frequency</label>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Biweekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Included Data Sources</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Email Campaigns', 'Social Media', 'Website Analytics', 'CRM Data'].map((source) => (
                        <div key={source} className="flex items-center space-x-2">
                          <Checkbox id={source.toLowerCase().replace(' ', '-')} />
                          <label htmlFor={source.toLowerCase().replace(' ', '-')} className="text-sm text-gray-300">
                            {source}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Report Recipients</label>
                    <Textarea
                      placeholder="Enter email addresses, separated by commas"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Automation Workflow</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-600 rounded-full p-2">
                        <Database className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-white">1. Collect data from configured sources</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-600 rounded-full p-2">
                        <Search className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-white">2. Analyze messaging effectiveness</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-yellow-600 rounded-full p-2">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-white">3. Generate comprehensive report</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-600 rounded-full p-2">
                        <Mail className="h-5 w-5  text-white" />
                      </div>
                      <span className="text-white">4. Distribute report to recipients</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollArea>
            <div className="p-6 bg-gray-900 border-t border-gray-800">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Save and Activate Automation
              </Button>
            </div>
          </div>

          <div className="w-80 border-l border-gray-800 p-6 overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4">Recent Reports</h2>
            <div className="space-y-4">
              {[
                { date: '2024-10-31', title: 'Weekly Messaging Report' },
                { date: '2024-10-24', title: 'Weekly Messaging Report' },
                { date: '2024-10-17', title: 'Weekly Messaging Report' },
                { date: '2024-10-10', title: 'Weekly Messaging Report' },
              ].map((report, index) => (
                <Card key={index} className="bg-gray-800 border-gray-700">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm font-medium text-gray-300">{report.date}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-white">{report.title}</p>
                    <Button variant="ghost" size="sm" className="mt-2 text-blue-400 hover:text-blue-300 p-0">
                      View Report
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )

  const renderEmailMessageResonanceReport = () => (
    <div className="flex h-screen bg-gray-950 text-gray-200 font-sans">
      <main className="flex-1 overflow-auto relative w-full">
        <div className="sticky top-0 bg-gray-950 z-10 py-6 px-8">
          <header className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-white">Weekly Messaging Effectiveness Report</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Input className="bg-gray-800 border-gray-700 text-base w-72" placeholder="Search..." />
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-100 hover:bg-gray-800">
                <Bell className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-100 hover:bg-gray-800">
                <User className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRightSidebarExpanded(!isRightSidebarExpanded)}
                className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
          </header>
        </div>

        <div className="px-8 pb-8 flex space-x-6">
          {/* Left Section (Generated Report) */}
          <Card className={`flex-1 bg-white text-gray-900 transition-all duration-300 ease-in-out ${isRightSidebarExpanded ? 'mr-96' : ''}`}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">CloudSecure Weekly Messaging Effectiveness Report</CardTitle>
              <p className="text-sm text-gray-500">Reporting Period: October 24 - October 31, 2024</p>
              <p className="text-sm text-gray-500">Prepared by: Digital Marketing Analytics Team</p>
              <p className="text-sm text-gray-500">Prepared for: Alex, Growth Marketing Lead at CloudSecure</p>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-250px)]">
                <div className="space-y-6">
                  <section>
                    <h2 className="text-xl font-semibold mb-2">Overview</h2>
                    <p>This report provides a comprehensive analysis of CloudSecures messaging effectiveness across the entire customer lifecycle, including marketing campaigns, sales conversations, and customer success interactions. We examine how our key messages resonate with different segments (Financial Services, Healthcare, Government, Retail) through various touchpoints. This holistic view will help Alexs team optimize messaging strategies for maximum impact at every stage of the customer journey.</p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-2">1. Segment & Channel Performance Overview</h2>

                    <h3 className="text-lg font-semibold mt-4 mb-2">Financial Services Segment</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Top-Performing Message Theme:</strong> Compliance Automation</li>
                      <li><strong>Marketing Engagement Insights:</strong>
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>LinkedIn:</strong> 85% engagement rate; Compliance Automation posts saw a 15% higher share rate compared to other messages</li>
                          <li><strong>Email Campaigns:</strong> 78% open rate, with a strong preference for compliance-related content; high conversion with compliance updates subject lines</li>
                          <li><strong>Google Ads:</strong> 65% CTR for secure & compliant ad copy, suggesting a high interest in regulatory compliance</li>
                        </ul>
                      </li>
                      <li><strong>Sales Conversation Insights:</strong>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>73% of successful sales calls emphasized real-time compliance monitoring features</li>
                          <li>Prospects showed high interest in case studies demonstrating compliance cost savings</li>
                        </ul>
                      </li>
                      <li><strong>Customer Success Interactions:</strong>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>90% of customers reported improved audit readiness after implementing CloudSecure</li>
                          <li>Feature requests often centered around expanding compliance automation capabilities</li>
                        </ul>
                      </li>
                      <li><strong>Recommendation:</strong> Align marketing, sales, and customer success messaging around real-time compliance updates and quantifiable cost savings. Develop more case studies highlighting compliance automation success stories for use across all customer touchpoints.</li>
                    </ul>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-2">2. Visualization: Message Effectiveness Across Customer Lifecycle</h2>

                    <h3 className="text-lg font-semibold mt-4 mb-2">Chart 1: Message Resonance Across Customer Lifecycle Stages</h3>
                    <div className="w-full h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { segment: 'Financial Services', marketing: 85, sales: 73, customerSuccess: 90 },
                            { segment: 'Healthcare', marketing: 70, sales: 68, customerSuccess: 85 },
                            { segment: 'Government', marketing: 72, sales: 70, customerSuccess: 88 },
                            { segment: 'Retail', marketing: 64, sales: 62, customerSuccess: 80 },
                          ]}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="segment" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="marketing" name="Marketing Engagement" fill="#0077B5" />
                          <Bar dataKey="sales" name="Sales Conversation Success" fill="#4285F4" />
                          <Bar dataKey="customerSuccess" name="Customer Success Satisfaction" fill="#34A853" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-sm text-center text-gray-500 mt-2">Message Resonance Across Customer Lifecycle Stages</p>
                    <p className="mt-4"><strong>Key Insight:</strong> This chart reveals that our messaging maintains strong consistency across the customer lifecycle, with particularly high resonance in customer success for all segments. Financial Services shows the most balanced performance across all stages.</p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-2">3. Message Modification Recommendations</h2>

                    <h3 className="text-lg font-semibold mt-4 mb-2">Cross-Lifecycle Alignment:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Modification:</strong> Develop a consistent narrative around each key theme that evolves through the customer lifecycle</li>
                      <li><strong>Reason:</strong> Data shows message effectiveness increases as customers progress. Creating a cohesive story will reinforce key benefits at each stage.</li>
                    </ul>
                  </section>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Right Section (Edit/Export Report Pane) */}
          <Card className={`w-96 bg-gray-900 border-gray-800 fixed right-0 top-0 bottom-0 transition-all duration-300 ease-in-out overflow-y-auto ${isRightSidebarExpanded ? 'translate-x-0' : 'translate-x-full'}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 sticky top-0 bg-gray-900 border-b border-gray-800 z-10">
              <CardTitle className="text-xl text-white">Edit, Export and Share</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsRightSidebarExpanded(false)}
                className="text-gray-400 hover:text-gray-100 hover:bg-gray-800"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-8 p-6">
              <div className="mb-8">
                <div className="space-y-4">
                  <label htmlFor="ai-chat" className="text-sm font-medium text-gray-300">Dive Deeper</label>
                  <Textarea
                    id="ai-chat"
                    placeholder="E.g., analyze the impact of recent security breaches on messaging effectiveness"
                    className="h-32 bg-gray-800 border-gray-700 text-white resize-none"
                  />
                  <Button className="w-full bg-white text-gray-900 hover:bg-gray-100">
                    <Send className="mr-2 h-4 w-4" />
                    Submit
                  </Button>
                </div>
              </div>
              <div className="mb-8">
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-300">Date Range</label>
                  <div className="flex space-x-4">
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-300">Integrated Tools</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['LinkedIn', 'Google Ads', 'Web Analytics', 'Email Marketing'].map((tool) => (
                      <div key={tool} className="flex items-center space-x-2 rounded-md border border-gray-700 bg-gray-800 p-2">
                        <Checkbox id={tool.toLowerCase().replace(' ', '-')} defaultChecked />
                        <label htmlFor={tool.toLowerCase().replace(' ', '-')} className="text-sm text-white cursor-pointer">
                          {tool}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-300">Change Visualization</label>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="w-full">
                      <MousePointer className="mr-2 h-4 w-4" />
                      Select the chart
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data (CSV)
                  </Button>
                </div>
              </div>
              <div className="mb-8">
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-300">Export Report as:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Google Docs
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileImage className="mr-2 h-4 w-4" />
                      PowerPoint
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileImage className="mr-2 h-4 w-4" />
                      Google Slides
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Send by Email
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Send as Slack Update
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="flex h-screen bg-gray-950 text-gray-200 font-sans">
        {/* Sidebar */}
        <aside className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} flex-shrink-0 bg-gray-900 overflow-y-auto border-r border-gray-800 transition-all duration-300 ease-in-out`}>
          <div className="sticky top-0 bg-gray-900 z-10 py-6 px-4">
            <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} text-2xl font-bold text-white mb-8`}>
              {!isSidebarCollapsed && <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">KiwiQ.ai</span>}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="text-gray-400 hover:text-gray-100 hover:bg-gray-800"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <nav className="space-y-1 px-2">
            {[
              { name: 'Dashboard', icon: <Home className="h-5 w-5" /> },
              {
                name: 'Artifacts',
                icon: <Folder className="h-5 w-5" />,
                subitems: [
                  'Email Message Resonance Report',
                  'Performance Marketing Messaging Analysis',
                  'Segment-wise Messaging Performance Tracker',
                  { name: 'Create New Artifact', special: true }
                ]
              },
              {
                name: 'Analysts',
                icon: <Users className="h-5 w-5" />,
                subitems: [
                  'Messaging Performance Analyst',
                  'Competitor Messaging Analyst',
                  'Channel Performance Analyst',
                  { name: 'Create New Analyst', special: true }
                ]
              },
              {
                name: 'Actions',
                icon: <Zap className="h-5 w-5" />,
                subitems: [
                  'Weekly Message Resonance Digest',
                  'Scheduled Content Performance Update',
                  'Send Vertical-Specific Insights to Team',
                  'Weekly Messaging Effectiveness Automation',
                  { name: 'Create New Action', special: true }
                ]
              },
              { name: 'Settings', icon: <Settings className="h-5 w-5" /> }
            ].map((item, index) => renderSidebarItem(item, index))}
          </nav>

        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-white">
          {currentScreen === 'dashboard' && renderDashboardContent()}
          {currentScreen === 'weeklyMessagingEffectivenessDigest' && renderWeeklyMessagingEffectivenessDigest()}
          {currentScreen === 'emailMessageResonanceReport' && renderEmailMessageResonanceReport()}
        </main>
      </div>
    </ErrorBoundary>
  )
}