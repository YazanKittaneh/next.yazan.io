"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Users, Calendar, DollarSign, ChevronDown } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
interface Room {
  id: number;
  roomName: string;
  roomNumber: string;
  building: string;
  floor: number;
  status: string;
}

interface CalendarRoom {
  leases: CalendarLease[]
}

interface CalendarLease {
  id: number
  tenantName: string | null
  startMonth: number
  endMonth: number
  calendarStatus: "active" | "pending" | "maintenance" | "available"
}

// Helper function to convert room status to calendar status
const getRoomCalendarStatus = (room: Room, currentMonth: number, currentYear: number): "active" | "maintenance" | "available" => {
  if (room.status === 'MAINTENANCE_NEEDED') return 'maintenance';
  if (room.status === 'OCCUPIED') return 'active';

  return 'available';
}

// Helper function to convert lease to calendar lease
const convertLeaseToCalendarLease = (lease: Lease, year: number): CalendarLease => {
  const startDate = new Date(lease.startDate);
  const endDate = lease.endDate ? new Date(lease.endDate) : new Date(startDate.getFullYear() + 1, 11, 31);

  // Calculate start and end months for the given year
  let startMonth = 0;
  let endMonth = 11;

  if (startDate.getFullYear() === year) {
    startMonth = startDate.getMonth();
  }

  if (endDate.getFullYear() === year) {
    endMonth = endDate.getMonth();
  }

  // Determine calendar status based on lease status
  let calendarStatus: "active" | "pending" | "maintenance" | "available" = "available";
  if (lease.status === 'active') calendarStatus = 'active';
  else if (lease.status === 'pending') calendarStatus = 'pending';

  return {
    ...lease,
    tenantName: lease.tenantName,
    startMonth,
    endMonth,
    calendarStatus
  };
}

export function RoomCalendar() {
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedLease, setSelectedLease] = useState<CalendarLease | null>(null)
  const [selectedCommunity, setSelectedCommunity] = useState<string>("Francis")
  const [isClient, setIsClient] = useState(false)
  const [mobileStartMonth, setMobileStartMonth] = useState(() => {
    // Initialize to current month
    const currentDate = new Date()

    return currentDate.getMonth()
  }) // For mobile view

  // Framer Motion gesture handling
  const [isSwipeInProgress, setIsSwipeInProgress] = useState(false)

  // Fix hydration by ensuring client-side rendering
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Set initial scroll position to current month after client hydration
  useEffect(() => {
    if (isClient && scrollContainerRef.current) {
      // Small delay to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        if (scrollContainerRef.current) {
          const currentDate = new Date()
          const currentMonth = currentDate.getMonth() // 0-based month index
          const monthWidthValue = 120 // Use the same value as defined below
          const currentPosition = currentMonth * monthWidthValue
          scrollContainerRef.current.scrollTo({
            left: currentPosition,
            behavior: 'auto' // No animation on initial load
          })
          setScrollPosition(currentPosition)
          setMobileStartMonth(currentMonth)
        }
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [isClient])

  // Fetch Francis rooms using the existing hook - we need to use a custom fetcher to get lease data
  const [francisRoomsData, setFrancisRoomsData] = useState<{ room: Room; currentLease: any }[]>([])
  const [dataLoading, setDataLoading] = useState(true)
  const [dataError, setDataError] = useState(false)

  useEffect(() => {
    const fetchRoomsWithLeases = async () => {
      try {
        setDataLoading(true)
        const response = await fetch(`/api/rooms?building=${selectedCommunity}`)
        if (!response.ok) {
          throw new Error('Failed to fetch rooms')
        }
        const data = await response.json()
        setFrancisRoomsData(data)
        setDataError(false)
      } catch (error) {
        console.error('Error fetching rooms:', error)
        setDataError(true)
      } finally {
        setDataLoading(false)
      }
    }

    if (isClient) {
      fetchRoomsWithLeases()
    }
  }, [isClient, selectedCommunity])

  // Debug log to understand data structure
  useEffect(() => {
    if (francisRoomsData) {
      console.log('Francis rooms data:', francisRoomsData);
      console.log('First room structure:', francisRoomsData[0]);
    }
  }, [francisRoomsData]);

  // Transform the room data to include calendar lease information
  const rooms: CalendarRoom[] = (francisRoomsData || []).map(roomData => {
    // Add safety checks for room data
    if (!roomData || !roomData.room) {
      return null;
    }

    const room = roomData.room;
    const currentLease = roomData.currentLease;

    // Create calendar leases from current lease if it exists
    const leases: CalendarLease[] = [];

    if (currentLease) {
      const calendarLease = convertLeaseToCalendarLease(currentLease, currentYear);
      leases.push(calendarLease);
    }

    // If no lease but room has maintenance status, create a maintenance "lease"
    if (!currentLease && room && room.status === 'MAINTENANCE_NEEDED') {
      const startDate = new Date(currentYear, 0, 1, 0, 0, 0, 0);
      const endDate = new Date(currentYear, 11, 31, 0, 0, 0, 0);

      leases.push({
        id: -room.id, // Unique negative ID for maintenance
        userId: 0,
        roomId: room.id,
        teamId: room.teamId,
        startDate: startDate,
        endDate: endDate,
        monthlyRent: 0,
        securityDeposit: null,
        status: "active",
        leaseTerms: null,
        dateSigned: null,
        movedIn: false,
        moveinFeePaid: false,
        moveinFeeAmount: null,
        tenantName: null,
        tenantEmail: null,
        tenantPhone: null,
        tenantPreviousAddress: null,
        tenantEmergencyContact: null,
        tenantEmergencyPhone: null,
        tenantEmployer: null,
        tenantEmployerPhone: null,
        leaseDate: null,
        moveInDate: null,
        moveOutDate: null,
        signatureDate: null,
        rentRate: null,
        leaseTerm: null,
        monthsSelected: null,
        activePeriods: null,
        documentUrl: null,
        createdAt: startDate,
        updatedAt: startDate,
        deletedAt: null,
        startMonth: 0,
        endMonth: 11,
        calendarStatus: "maintenance" as const
      });
    }

    return {
      ...room,
      leases
    };
  }).filter(Boolean) as CalendarRoom[];

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // Get current month for highlighting - only highlight if viewing current year
  const currentDate = new Date()
  const actualCurrentMonth = currentDate.getMonth() // 0-based month index
  const actualCurrentYear = currentDate.getFullYear()
  const shouldHighlightCurrentMonth = currentYear === actualCurrentYear

  // Scroll position for smooth calendar navigation
  const [scrollPosition, setScrollPosition] = useState(() => {
    // Initialize to current month position
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()

    return currentMonth * 120 // 120px per month
  })
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  // Calculate month width for smooth scrolling
  const monthWidth = 120 // Fixed width per month in pixels
  const visibleMonths = 3 // Always show 3 months on mobile

  // Smooth scroll navigation
  const navigateToMonth = (monthIndex: number) => {
    if (scrollContainerRef.current) {
      const targetScrollPosition = monthIndex * monthWidth
      scrollContainerRef.current.scrollTo({
        left: targetScrollPosition,
        behavior: 'smooth'
      })
    }
  }

  // Handle scroll events to update visible months
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = event.currentTarget.scrollLeft
    setScrollPosition(scrollLeft)

    // Calculate which month is currently centered
    const currentCenterMonth = Math.round(scrollLeft / monthWidth)
    setMobileStartMonth(Math.max(0, Math.min(9, currentCenterMonth)))
  }

  // Quick navigation to current month
  const jumpToCurrentMonth = () => {
    if (shouldHighlightCurrentMonth) {
      navigateToMonth(actualCurrentMonth)
    }
  }

  const getLeaseStyle = (status: CalendarLease["calendarStatus"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 border-green-300 text-green-800"
      case "pending":
        return "bg-yellow-100 border-yellow-300 text-yellow-800"
      case "maintenance":
        return "bg-red-100 border-red-300 text-red-800"
      case "available":
        return "bg-gray-100 border-gray-300 text-gray-800"
      default:
        return "bg-gray-100 border-gray-300 text-gray-800"
    }
  }

  const getStatusBadgeStyle = (status: CalendarLease["calendarStatus"]) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "maintenance":
        return "bg-red-500"
      case "available":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  // Prevent hydration mismatch by not rendering until client-side
  if (!isClient || dataLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading {selectedCommunity} building calendar...</span>
      </div>
    );
  }

  if (dataError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">Failed to load {selectedCommunity} building rooms</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with year navigation and community picker */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Select value={selectedCommunity} onValueChange={setSelectedCommunity}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select community" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Francis">Francis</SelectItem>
                <SelectItem value="Armitage">Armitage</SelectItem>
                <SelectItem value="Greenview">Greenview</SelectItem>
                <SelectItem value="Ivy">Ivy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => setCurrentYear(currentYear - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-2xl font-semibold">{currentYear}</h2>
            <Button variant="outline" size="sm" onClick={() => setCurrentYear(currentYear + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Active Lease</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className="text-sm text-gray-600">Pending Lease</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-600">Maintenance</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-500 rounded"></div>
            <span className="text-sm text-gray-600">Available</span>
          </div>
        </div> */}
      </div>

      <Card className="overflow-hidden py-0">
        <div className="bg-white">
          {/* Mobile Month Navigation */}
          <div className="block lg:hidden border-b bg-gray-50 p-3">
            <div className="flex items-center justify-between">
              <button
                onClick={jumpToCurrentMonth}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
              >
                Today
              </button>
              <div className="text-xs text-gray-500">
                Scroll horizontally to navigate months
              </div>
            </div>
          </div>

          {/* Desktop Calendar Header (12 months) */}
          <div className="hidden lg:grid grid-cols-13 border-b bg-gray-50">
            <div className="p-2 font-semibold text-sm text-gray-900 border-r">Room</div>
            {months.map((month, index) => {
              const isCurrentMonth = index === actualCurrentMonth && shouldHighlightCurrentMonth;

              return (
                <div
                  key={index}
                  className={`p-2 text-center font-medium text-sm border-r last:border-r-0 ${isCurrentMonth
                    ? 'bg-blue-100 text-blue-900 font-semibold'
                    : 'text-gray-700'
                    }`}
                >
                  {month}
                </div>
              );
            })}
          </div>

          {/* Mobile Calendar Header with Fixed Room Column and Scrollable Months */}
          <div className="block lg:hidden flex border-b bg-gray-50">
            <div className="flex-none w-32 p-2 font-semibold text-sm text-gray-900 border-r bg-white sticky left-0 z-10">
              Room
            </div>
            <div
              ref={scrollContainerRef}
              className="flex-1 flex overflow-x-auto scrollbar-hide"
              onScroll={handleScroll}
              style={{
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch'
              }}
            >
              {months.map((month, index) => {
                const isCurrentMonth = index === actualCurrentMonth && shouldHighlightCurrentMonth;

                return (
                  <div
                    key={index}
                    className={`flex-none p-2 text-center font-medium text-sm border-r ${isCurrentMonth
                      ? 'bg-blue-100 text-blue-900 font-semibold'
                      : 'text-gray-700'
                      }`}
                    style={{
                      width: `${monthWidth}px`,
                      scrollSnapAlign: 'start'
                    }}
                  >
                    {month}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Room Rows (12 months) */}
          <div className="hidden lg:block">
            {rooms.map((room, roomIndex) => (
              <div
                key={room.id}
                className={`grid grid-cols-13 border-b last:border-b-0 ${roomIndex % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
              >
                {/* Room Info */}
                <div className="p-2 border-r bg-white">
                  <div className="space-y-0.5">
                    <h3 className="font-medium text-sm text-gray-900">{room.roomName}</h3>
                    <p className="text-xs text-gray-500">#{room.roomNumber} • {room.building} F{room.floor}</p>
                  </div>
                </div>

                {/* Calendar Months */}
                {months.map((month, monthIndex) => {
                  const isCurrentMonth = monthIndex === actualCurrentMonth && shouldHighlightCurrentMonth;

                  return (
                    <div
                      key={monthIndex}
                      className={`relative p-1 border-r last:border-r-0 min-h-[50px] ${isCurrentMonth ? 'bg-blue-50' : ''
                        }`}
                    >
                      {room.leases.map((lease) => {
                        if (monthIndex >= lease.startMonth && monthIndex <= lease.endMonth) {
                          const isStart = monthIndex === lease.startMonth
                          const width = lease.endMonth - lease.startMonth + 1

                          if (isStart) {
                            return (
                              <div
                                key={lease.id}
                                className={`absolute inset-1 rounded border p-1 cursor-pointer transition-all hover:shadow-md ${getLeaseStyle(lease.calendarStatus)}`}
                                style={{
                                  width: `calc(${width * 100}% + ${(width - 1) * 8}px)`,
                                  zIndex: 10,
                                }}
                                onClick={() => setSelectedLease(lease)}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-medium truncate flex-1">
                                    {lease.tenantName || (lease.calendarStatus === 'maintenance' ? 'Maintenance' : 'Available')}
                                  </span>
                                  {lease.calendarStatus === "active" && lease.monthlyRent && (
                                    <span className="text-xs text-right ml-1">
                                      ${(lease.monthlyRent / 100).toLocaleString()}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )
                          }
                        }

                        return null
                      })}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Mobile Room Rows with Fixed Room Column and Scrollable Calendar */}
          <div className="block lg:hidden">
            {rooms.map((room, roomIndex) => (
              <div
                key={room.id}
                className={`flex border-b last:border-b-0 ${roomIndex % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
              >
                {/* Fixed Room Info Column */}
                <div className="flex-none w-32 p-2 border-r bg-white sticky left-0 z-10">
                  <div className="space-y-0.5">
                    <h3 className="font-medium text-sm text-gray-900">{room.roomName}</h3>
                    <p className="text-xs text-gray-500">#{room.roomNumber} • {room.building} F{room.floor}</p>
                  </div>
                </div>

                {/* Scrollable Calendar Months */}
                <div className="flex-1 flex overflow-x-hidden">
                  <div
                    className="flex"
                    style={{
                      transform: `translateX(-${scrollPosition}px)`,
                      transition: 'transform 0.1s ease-out'
                    }}
                  >
                    {months.map((month, monthIndex) => {
                      const isCurrentMonth = monthIndex === actualCurrentMonth && shouldHighlightCurrentMonth;

                      return (
                        <div
                          key={monthIndex}
                          className={`relative border-r min-h-[50px] ${isCurrentMonth ? 'bg-blue-50' : ''
                            }`}
                          style={{
                            width: `${monthWidth}px`,
                            minWidth: `${monthWidth}px`
                          }}
                        >
                          {room.leases.map((lease) => {
                            if (monthIndex >= lease.startMonth && monthIndex <= lease.endMonth) {
                              const isStart = monthIndex === lease.startMonth
                              const width = lease.endMonth - lease.startMonth + 1

                              if (isStart) {
                                return (
                                  <div
                                    key={lease.id}
                                    className={`absolute inset-1 rounded border p-1 cursor-pointer transition-all hover:shadow-md ${getLeaseStyle(lease.calendarStatus)}`}
                                    style={{
                                      width: `calc(${width * monthWidth}px - 8px)`,
                                      zIndex: 10,
                                    }}
                                    onClick={() => setSelectedLease(lease)}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-medium truncate flex-1">
                                        {lease.tenantName || (lease.calendarStatus === 'maintenance' ? 'Maintenance' : 'Available')}
                                      </span>
                                      {lease.calendarStatus === "active" && lease.monthlyRent && width > 1 && (
                                        <span className="text-xs text-right ml-1">
                                          ${(lease.monthlyRent / 100).toLocaleString()}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                )
                              }
                            }

                            return null
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Lease Details Modal */}
      {selectedLease && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedLease(null)}
        >
          <Card className="w-96 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Lease Details</h3>
                <Badge className={`${getStatusBadgeStyle(selectedLease.calendarStatus)} text-white`}>
                  {selectedLease.calendarStatus}
                </Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Tenant</label>
                  <p className="text-gray-900">{selectedLease.tenantName || 'Not assigned'}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Duration</label>
                  <p className="text-gray-900 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {months[selectedLease.startMonth]} - {months[selectedLease.endMonth]} {currentYear}
                  </p>
                </div>

                {selectedLease.calendarStatus === "active" && selectedLease.monthlyRent && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Monthly Rent</label>
                      <p className="text-gray-900 flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />${(selectedLease.monthlyRent / 100).toLocaleString()}
                      </p>
                    </div>

                    {selectedLease.tenantEmail && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Contact</label>
                        <p className="text-gray-900">{selectedLease.tenantEmail}</p>
                      </div>
                    )}

                    {selectedLease.leaseTerm && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Lease Term</label>
                        <p className="text-gray-900">{selectedLease.leaseTerm}</p>
                      </div>
                    )}
                  </>
                )}
              </div>

              <Button className="w-full" onClick={() => setSelectedLease(null)}>
                Close
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
