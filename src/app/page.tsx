'use client'

import React, { ReactNode, useState } from 'react'
import { ThemeProvider } from "@/components/ui/theme-provider" // Adjust based on your theme-provider file location
import ThemeToggle from "@/components/ui/ThemeToggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import VerticalCard from "@/components/VerticalCard"
// import HoverPopup from '@/components/HoverPopup'
// import DiveDeeperModal from '@/components/DiveDeeperModal'
import InsightList from "@/components/InsightList"
import CompetitorAnalysisCard from '@/components/CompetitorAnalysisCard'
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Bell, ChevronDown, ChevronRight, Home, Settings, Users, Zap, PlusCircle, User, Folder, Search, MoreVertical, Calendar, ChevronRightIcon, Edit, Database, Mail, MessageSquare, FileText, FileImage, MousePointer, Send, Download, Menu, BarChart2, Lightbulb, HeartPulse } from "lucide-react"
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
// interface VerticalCardProps {
//   title: string;
//   icon: React.ReactNode; // Adjust type based on what icon is
//   value: string; // Adjust based on your requirements
//   change: string; // Adjust based on your requirements
//   color: string; // Assuming color is a string for class names
//   onDiveDeeper: () => void; // Assuming this is a function
// }
// const VerticalCard: React.FC<VerticalCardProps> = ({ title, icon, value, change, color, onDiveDeeper }) => (

//   <Card className={`bg-gradient-to-br ${color} border-none transition-all duration-300 hover:shadow-xl`}>
//     <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
//       <CardTitle className="text-gray-800 text-lg font-medium">{title}</CardTitle>
//       {icon}
//     </CardHeader>
//     <CardContent className="pt-2">
//       <div className="text-xl font-bold text-gray-800">{value}</div>
//       <div className="flex justify-between items-center text-sm">
//         <span className="text-gray-700 mt-2">{change}</span>
//         <Button
//           variant="ghost"
//           size="sm"
//           className="text-xs text-gray-800 hover:text-gray-700"
//           onClick={() => onDiveDeeper()}
//         >
//           Dive Deeper
//         </Button>
//       </div>
//     </CardContent>
//   </Card>
// )

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
        className={`w-full justify-start text-left hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200 ${expandedSections.has(item.name) ? 'bg-gray-800 text-white dark:bg-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-400'}`}
        onClick={() => {
          if (item.name === 'Dashboard') {
            setCurrentScreen('dashboard');
          } else if (!isSidebarCollapsed && item.subitems) {
            toggleSection(item.name);
          }
        }}
      >
        <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center w-full' : ''}`}>
          <div className={`${isSidebarCollapsed ? 'text-gray-300 dark:text-gray-400' : ''}`}>
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
              className={`w-full justify-start text-left text-sm py-1 px-2 h-auto  hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-200 ${typeof subitem !== 'string' && subitem.special ? 'text-blue-400 hover:text-blue-300 dark:text-blue-300 dark:hover:text-blue-400' : 'text-gray-400 dark:text-gray-400'}`}
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
      {index === 2 && <hr className="border-gray-700 my-2 dark:border-gray-600" />}
    </div>

  )

  const renderDashboardContent = () => (
    <>
      <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 py-4 px-8 shadow-sm dark:shadow-md">
        <header className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Dashboard</h1>


            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-900 text-sm font-medium 
               dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white">
                  {currentView} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                className="bg-white text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600">

                <DropdownMenuItem
                  onSelect={() => setCurrentView("Messaging Resonance")}
                  className="hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 
                 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:text-white">
                  Messaging Resonance
                </DropdownMenuItem>

                <DropdownMenuItem
                  onSelect={() => setCurrentView("Channel Effectiveness")}
                  className="hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 
                 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:text-white">
                  Channel Effectiveness
                </DropdownMenuItem>

                <DropdownMenuItem
                  onSelect={() => setCurrentView("Competitive Intelligence")}
                  className="hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 
                 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:text-white">
                  Competitive Intelligence
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>

          </div>
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <Input
              className="bg-white border-gray-300 text-sm w-64 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
              placeholder="Search..."
            />

            {/* Notification Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <Bell className="h-5 w-5" />
            </Button>

            {/* User Profile Button */}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <User className="h-5 w-5" />
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

        </header>
      </div>

      <div className="px-8 py-6">
        <div className="grid grid-cols-3 gap-6 mb-6 ">
          <VerticalCard
            title="Financial Services"
            icon={<BarChart2 className="h-4 w-4 text-gray-800 dark:text-gray-100" />}
            value="65% increase in Email engagement"
            change="Primary Value Prop: Zero-Trust Compliance"
            color="from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-700"
            onDiveDeeper={() => handleDiveDeeper("Financial Services")}
            popupContent={[
              "LinkedIn-engaged accounts show 3x higher conversion rates",
              "25% increase in conversion rate compared to non-LinkedIn engaged accounts",
              "Particularly effective for enterprise-level deals",
              "Suggests focusing more resources on LinkedIn for high-value prospects"
            ]}
            diveDeeperContent={[
              "LinkedIn-engaged accounts show 3x higher conversion rates",
              "25% increase in conversion rate compared to non-LinkedIn engaged accounts",
              "Particularly effective for enterprise-level deals",
              "Suggests focusing more resources on LinkedIn for high-value prospects"
            ]}

          />
          <VerticalCard
            title="Healthcare"
            icon={<Lightbulb className="h-4 w-4 text-gray-800 dark:text-gray-200" />}
            value="Reduction in sales cycle"
            change="1.8x faster deal velocity post-HIPAA messaging pivot"
            color="from-green-100 to-green-200 dark:from-green-900 dark:to-green-700"
            onDiveDeeper={() => handleDiveDeeper("Healthcare")}
            popupContent={[
              "Meta ads influenced $450K in pipeline this month",
              "$90K increase compared to last month's performance",
              "Strong performance in SMB and mid-market segments",
              "Consider increasing budget allocation for Meta campaigns"
            ]}
            diveDeeperContent={[
              "LinkedIn-engaged accounts show 3x higher conversion rates",
              "25% increase in conversion rate compared to non-LinkedIn engaged accounts",
              "Particularly effective for enterprise-level deals",
              "Suggests focusing more resources on LinkedIn for high-value prospects"
            ]}
          />
          <VerticalCard
            title="Government"
            icon={<HeartPulse className="h-4 w-4 text-gray-800 dark:text-gray-200" />}
            value="22% Competitive Win Rate"
            change="New Cloudflare Triad campaign winning 5-1 in H2H"
            color="from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-700"
            onDiveDeeper={() => handleDiveDeeper("Government")}
            popupContent={[
              "Deals with LinkedIn and Web touchpoints close 12 days faster on average",
              "10% reduction in overall sales cycle length",
              "Multi-touch approach shows significant impact on deal velocity",
              "Recommend integrating LinkedIn and Web strategies for faster conversions"
            ]}
            diveDeeperContent={[
              "LinkedIn-engaged accounts show 3x higher conversion rates",
              "25% increase in conversion rate compared to non-LinkedIn engaged accounts",
              "Particularly effective for enterprise-level deals",
              "Suggests focusing more resources on LinkedIn for high-value prospects"
            ]}
          />
        </div>


        <Card className="dark:bg-gray-800 bg-white border-gray-200 shadow-sm mb-6 ">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 dark:bg-gray-800 dark:text-gray-200">
            <CardTitle className="text-gray-800 dark:text-gray-200 text-xl font-semibold">Messaging Effectiveness Trends</CardTitle>
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <Calendar className="mr-2 h-4 w-4 text-gray-800 dark:text-gray-200" />
                    {selectedCampaign}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600">
                  <DropdownMenuItem
                    onSelect={() => setSelectedCampaign("Q2 2024: Email & LinkedIn Marketing")}
                    className="hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:text-white"
                  >
                    Q2 2024: Email & LinkedIn Marketing
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setSelectedCampaign("Q2 2024: Meta and Google Ads")}
                    className="hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:text-white"
                  >
                    Q2 2024: Meta and Google Ads
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setSelectedCampaign("Q2 2024: All channels")}
                    className="hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:text-white"
                  >
                    Q2 2024: All channels
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {dateRange} <Calendar className="ml-2 h-4 w-4 text-gray-800 dark:text-gray-200" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600">
                  <DropdownMenuItem
                    onSelect={() => setDateRange("Last 6 Weeks")}
                    className="hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:text-white"
                  >
                    Last 6 Weeks
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setDateRange("Last Quarter")}
                    className="hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:text-white"
                  >
                    Last Quarter
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onSelect={() => setDateRange("Last Year")}
                    className="hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:text-white"
                  >
                    Last Year
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreVertical className="h-4 w-4 text-gray-400 dark:text-gray-200" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:text-gray-200">
                  <DropdownMenuItem className="dark:hover:bg-gray-700 dark:hover:text-white">Dive Deeper</DropdownMenuItem>
                  <DropdownMenuItem className="dark:hover:bg-gray-700 dark:hover:text-white">Not helpful</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="dark:bg-gray-800 dark:text-gray-200">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" className="dark:stroke-gray-600" />
                  <XAxis
                    dataKey="week"
                    stroke="#6B7280"
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    tickLine={{ stroke: '#9CA3AF' }}
                    className="dark:text-gray-200"
                  />
                  <YAxis
                    stroke="#6B7280"
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    tickLine={{ stroke: '#9CA3AF' }}
                    domain={[0, 'auto']}
                    tickFormatter={(value) => `${value}%`}
                    className="dark:text-gray-200"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '4px',
                      // className: 'dark:bg-gray-800 dark:border-gray-800 dark:text-gray-200',
                    }}
                    labelStyle={{ color: '#111827', fontWeight: 'bold' }}
                    itemStyle={{ color: '#374151' }}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    iconType="circle"
                    wrapperStyle={{ paddingBottom: '10px' }}
                    className="dark:text-gray-200"
                  />
                  <Line type="monotone" dataKey="Financial Services" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Healthcare" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="Government" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>

        </Card>

        <div className="grid grid-cols-3 gap-6 bg-white dark:bg-gray-800">
        </div>
      </div>
    </>
  )

  const renderWeeklyMessagingEffectivenessDigest = () => (
    <div className="flex h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 font-sans">
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="sticky top-0 bg-white dark:bg-gray-800 z-10 py-6 px-8">
          <header className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Weekly Messaging Effectiveness Automation</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Input className="bg-white-800 border-gray-200 dark:bg-gray-700 border-gray-700 text-base w-72" placeholder="Search..." />
              <Button variant="ghost" size="icon" className="text-gray-400 dark:text-gray-500 hover:text-gray-100 dark:hover:text-gray-200 hover:bg-gray-800">
                <Bell className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 dark:text-gray-500 hover:text-gray-100 dark:hover:text-gray-200 hover:bg-gray-800">
                <User className="h-6 w-6" />
              </Button>
            </div>
          </header>
        </div>


        <div className="flex-1 overflow-hidden flex bg-white dark:bg-gray-800">
          <div className="flex-1 flex flex-col overflow-hidden">
            <ScrollArea className="flex-1 p-6 text-gray-900 dark:text-gray-200">
              <Card className="bg-gray-100 border-gray-200 mb-6 dark:bg-gray-900 dark:border-gray-900">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-200">
                    Natural Language Workflow Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 ">
                    <div className=" border-white rounded-lg p-4 h-96 overflow-y-auto dark:border-gray-800">
                      {chatMessages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.sender === 'Alex' ? 'justify-end' : 'justify-start'} mb-4`}
                        >
                          <div className={`flex items-start ${message.sender === 'Alex' ? 'flex-row-reverse' : ''}`}>
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>{message.sender[0]}</AvatarFallback>
                            </Avatar>
                            <div
                              className={`mx-2 p-3 rounded-lg ${message.sender === 'Alex' ? 'bg-blue-600' : 'bg-gray-700'} dark:bg-gray-600`}
                            >
                              <p className="text-sm text-white dark:text-gray-200">{message.content}</p>
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
                        className="flex-grow bg-white-800 border-gray-200 text-gray-800 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                        Send
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white-800 border-gray-200 mb-6 dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-200">Automation Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white-300 dark:text-gray-200">Report Frequency</label>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger className="w-full bg-white-800 border-gray-200 text-gray-800 dark:bg-gray-700 dark:border-gray-600">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 dark:bg-gray-700">
                        <SelectItem value="daily" className="text-white dark:text-gray-200">Daily</SelectItem>
                        <SelectItem value="weekly" className="text-white dark:text-gray-200">Weekly</SelectItem>
                        <SelectItem value="biweekly" className="text-white dark:text-gray-200">Biweekly</SelectItem>
                        <SelectItem value="monthly" className="text-white dark:text-gray-200">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-800-300 dark:text-gray-200">Included Data Sources</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Email Campaigns', 'Social Media', 'Website Analytics', 'CRM Data'].map((source) => (
                        <div key={source} className="flex items-center space-x-2">
                          <Checkbox id={source.toLowerCase().replace(' ', '-')} />
                          <label
                            htmlFor={source.toLowerCase().replace(' ', '-')}
                            className="text-sm text-gray-800-300 dark:text-gray-200"
                          >
                            {source}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-800-300 dark:text-gray-200">Report Recipients</label>
                    <Textarea
                      placeholder="Enter email addresses, separated by commas"
                      className="bg-white-800 border-gray-200 text-white dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </CardContent>
              </Card>


              <Card className="bg-white-800 border-white-800 dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800 dark:text-gray-200">Automation Workflow</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-600 rounded-full p-2">
                        <Database className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-gray-800 dark:text-gray-200">1. Collect data from configured sources</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-600 rounded-full p-2">
                        <Search className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-gray-800 dark:text-gray-200">2. Analyze messaging effectiveness</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-yellow-600 rounded-full p-2">
                        <FileText className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-gray-800 dark:text-gray-200">3. Generate comprehensive report</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-600 rounded-full p-2">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-gray-800 dark:text-gray-200">4. Distribute report to recipients</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </ScrollArea>
            <div className="p-6 bg-white-200 border-t border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white">
                Save and Activate Automation
              </Button>
            </div>

          </div>
          <div className="w-80 border-l border-gray-200 p-6 overflow-y-auto dark:border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Recent Reports</h2>
            <div className="space-y-4">
              {[
                { date: '2024-10-31', title: 'Weekly Messaging Report' },
                { date: '2024-10-24', title: 'Weekly Messaging Report' },
                { date: '2024-10-17', title: 'Weekly Messaging Report' },
                { date: '2024-10-10', title: 'Weekly Messaging Report' },
              ].map((report, index) => (
                <Card key={index} className="bg-white-800 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader className="p-4">
                    <CardTitle className="text-sm font-medium text-gray-800">{report.date}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-gray-800 dark:text-white">{report.title}</p>
                    <Button variant="ghost" size="sm" className="mt-2 text-blue-400 hover:text-blue-300 p-0 dark:text-blue-400 dark:hover:text-blue-300">
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
    <div className="flex h-screen bg-white text-gray-800 font-sans dark:bg-gray-1000 dark:text-gray-200">
  <main className="flex-1 overflow-auto relative w-full dark:bg-gray-1000">
        <div className="sticky top-0 z-10 py-6 px-8 bg-white dark:bg-gray-800">
          <header className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Weekly Messaging Effectiveness Report</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Input
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Search..."
              />
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-100 hover:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700">
                <Bell className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-100 hover:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700">
                <User className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRightSidebarExpanded(!isRightSidebarExpanded)}
                className="bg-white-800 text-gray-800 border-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>

            </div>
          </header>
        </div>


        <div className="px-8 pb-8 flex space-x-6 bg-white-950 dark:bg-gray-800 ">
          {/* Left Section (Generated Report) */}
          <Card className={`flex-1 bg-white text-gray-900 transition-all duration-300 ease-in-out dark:bg-gray-900 dark:text-gray-200 ${isRightSidebarExpanded ? 'mr-96' : ''}`}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">CloudSecure Weekly Messaging Effectiveness Report</CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Reporting Period: October 24 - October 31, 2024
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Prepared by: Digital Marketing Analytics Team
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Prepared for: Alex, Growth Marketing Lead at CloudSecure
              </p>

            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-250px)]">
                <div className="space-y-6">
                  <section>
                    <h2 className="text-xl font-semibold mb-2">Overview</h2>
                    <p>This report provides a comprehensive analysis of CloudSecures messaging effectiveness across the entire customer lifecycle...</p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-2">1. Segment & Channel Performance Overview</h2>

                    <h3 className="text-lg font-semibold mt-4 mb-2">Financial Services Segment</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Top-Performing Message Theme:</strong> Compliance Automation</li>
                      <li><strong>Marketing Engagement Insights:</strong>
                        <ul className="list-disc pl-5 space-y-1">
                          <li><strong>LinkedIn:</strong> 85% engagement rate...</li>
                          <li><strong>Email Campaigns:</strong> 78% open rate...</li>
                          <li><strong>Google Ads:</strong> 65% CTR...</li>
                        </ul>
                      </li>
                      <li><strong>Sales Conversation Insights:</strong>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>73% of successful sales calls...</li>
                          <li>Prospects showed high interest...</li>
                        </ul>
                      </li>
                      <li><strong>Customer Success Interactions:</strong>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>90% of customers reported...</li>
                          <li>Feature requests often centered...</li>
                        </ul>
                      </li>
                      <li><strong>Recommendation:</strong> Align marketing, sales, and customer success messaging around real-time compliance updates...</li>
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
                    <p className="mt-4"><strong>Key Insight:</strong> This chart reveals that our messaging maintains strong consistency across the customer lifecycle...</p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold mb-2">3. Message Modification Recommendations</h2>

                    <h3 className="text-lg font-semibold mt-4 mb-2">Cross-Lifecycle Alignment:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Modification:</strong> Develop a consistent narrative around each key theme that evolves...</li>
                      <li><strong>Reason:</strong> Data shows message effectiveness increases as customers progress...</li>
                    </ul>
                  </section>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Right Section (Edit/Export Report Pane) */}
          <Card className={`w-96 fixed right-0 top-0 bottom-0 transition-all duration-300 ease-in-out overflow-y-auto ${isRightSidebarExpanded ? 'translate-x-0' : 'translate-x-full'} bg-white dark:bg-gray-800 border-gray-800`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-800 z-10">
              <CardTitle className="text-xl text-gray-900 dark:text-white">Edit, Export and Share</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsRightSidebarExpanded(false)}
                className="text-gray-400 hover:text-gray-100 hover:bg-gray-800"
                aria-label="Close Sidebar"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-8 p-6">
              <div className="mb-8">
                <div className="space-y-4">
                  <label htmlFor="ai-chat" className="text-sm font-medium text-gray-700 dark:text-gray-300">Dive Deeper</label>
                  <Textarea
                    id="ai-chat"
                    placeholder="E.g., analyze the impact of recent security breaches on messaging effectiveness"
                    className="h-32 bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white resize-none"
                  />
                  <Button className="w-full bg-blue-600 text-white hover:bg-blue-500">
                    <Send className="mr-2 h-4 w-4" />
                    Submit
                  </Button>
                </div>
              </div>

              <div className="mb-8">
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Date Range</label>
                  <div className="flex space-x-4">
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                    />
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Integrated Tools</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['LinkedIn', 'Google Ads', 'Web Analytics', 'Email Marketing'].map((tool) => (
                      <div key={tool} className="flex items-center space-x-2 rounded-md border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-2">
                        <Checkbox id={tool.toLowerCase().replace(' ', '-')} defaultChecked />
                        <label htmlFor={tool.toLowerCase().replace(' ', '-')} className="text-sm text-gray-900 dark:text-white cursor-pointer">
                          {tool}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <div className="space-y-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Change Visualization</label>
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
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Export Report as:</label>
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
    <ThemeProvider attribute="class" >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <div className="flex h-screen bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-sans">

          {/* Sidebar */}
          <aside className={`${isSidebarCollapsed ? 'w-16' : 'w-64'} flex-shrink-0 bg-gray-100 dark:bg-gray-900 overflow-y-auto border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out`}>
            <div className="sticky top-0 bg-gray-100 dark:bg-gray-900 z-10 py-6 px-4">
              <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} text-2xl font-bold text-white mb-8`}>
                {!isSidebarCollapsed && <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">KiwiQ.ai</span>}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="text-gray-400 hover:text-gray-700 hover:bg-gray-200"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <nav className={`w-full justify-start text-left px-4 py-2 rounded-md text-gray-700  dark:text-gray-300 dark:hover:bg-gray-900`}>
              {[
                { name: 'Dashboard', icon: <Home className="h-5 w-5" /> },
                {
                  name: 'Artifacts ',
                  icon: <Folder className="h-5 w-5 " />,
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
          <main className="flex-1 overflow-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200">
            {currentScreen === 'dashboard' && (
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md text-gray-900 dark:text-gray-200">
                {renderDashboardContent()}

                {/* Flex container for InsightList and CompetitorAnalysisCard */}
                <div className="flex space-x-4">
                  {/* InsightList Card (takes 40% of the width) */}
                  <div className="w-2/5 space-y-2 p-4 bg-white dark:bg-gray-800">
                    <InsightList />
                  </div>

                  {/* CompetitorAnalysisCard (takes 60% of the width) */}
                  <div className="w-3/4 space-y-4 py-4 px-4 bg-white dark:bg-gray-800">
                    <CompetitorAnalysisCard />
                  </div>
                </div>
              </div>
            )}

            {currentScreen === 'weeklyMessagingEffectivenessDigest' && (
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                {renderWeeklyMessagingEffectivenessDigest()}
              </div>
            )}

            {currentScreen === 'emailMessageResonanceReport' && (
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                {renderEmailMessageResonanceReport()}
              </div>
            )}
          </main>
        </div>
      </ErrorBoundary>
    </ThemeProvider>
  );

}