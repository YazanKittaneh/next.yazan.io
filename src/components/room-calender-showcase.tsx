"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Users, Calendar, DollarSign } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data types
interface MockLease {
  id: number
  tenantName: string | null
  startMonth: number
  endMonth: number
  monthlyRent: number
  calendarStatus: "active" | "pending" | "maintenance" | "available"
  tenantEmail?: string
  leaseTerm?: string
}

interface MockRoom {
  id: number
  roomName: string
  roomNumber: string
  building: string
  floor: number
  leases: MockLease[]
}

// Mock data generator
const generateMockRooms = (building: string): MockRoom[] => {
  const rooms: MockRoom[] = []
  const roomCount = 8

  for (let i = 1; i <= roomCount; i++) {
    const room: MockRoom = {
      id: i,
      roomName: `Room ${i}`,
      roomNumber: `${100 + i}`,
      building: building,
      floor: Math.floor((i - 1) / 4) + 1,
      leases: []
    }

    // Add mock leases
    if (i % 3 === 0) {
      // Maintenance room
      room.leases.push({
        id: i * 100,
        tenantName: null,
        startMonth: 2,
        endMonth: 3,
        monthlyRent: 0,
        calendarStatus: "maintenance"
      })
    } else if (i % 4 === 0) {
      // Available room
      room.leases.push({
        id: i * 100,
        tenantName: null,
        startMonth: 0,
        endMonth: 11,
        monthlyRent: 0,
        calendarStatus: "available"
      })
    } else {
      // Active lease
      const startMonth = Math.floor(Math.random() * 6)
      const duration = 3 + Math.floor(Math.random() * 7)
      room.leases.push({
        id: i * 100,
        tenantName: `Tenant ${i}`,
        startMonth: startMonth,
        endMonth: Math.min(11, startMonth + duration),
        monthlyRent: 80000 + (i * 5000),
        calendarStatus: "active",
        tenantEmail: `tenant${i}@example.com`,
        leaseTerm: `${duration + 1} months`
      })

      // Add a pending lease for some rooms
      if (i % 2 === 0 && startMonth + duration < 10) {
        room.leases.push({
          id: i * 100 + 1,
          tenantName: `Future Tenant ${i}`,
          startMonth: startMonth + duration + 1,
          endMonth: 11,
          monthlyRent: 85000 + (i * 5000),
          calendarStatus: "pending",
          tenantEmail: `future${i}@example.com`,
          leaseTerm: `${12 - (startMonth + duration + 1)} months`
        })
      }
    }

    rooms.push(room)
  }

  return rooms
}

export function RoomCalendarShowcase() {
  const [currentYear, setCurrentYear] = useState(2025)
  const [selectedLease, setSelectedLease] = useState<MockLease | null>(null)
  const [selectedCommunity, setSelectedCommunity] = useState<string>("Francis")
  const [isClient, setIsClient] = useState(false)
  const [mobileStartMonth, setMobileStartMonth] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  // Fix hydration
  useEffect(() => {
    setIsClient(true)
    const currentMonth = new Date().getMonth()
    setMobileStartMonth(currentMonth)
    setScrollPosition(currentMonth * 120)
  }, [])

  // Generate mock data based on selected community
  const rooms = generateMockRooms(selectedCommunity)

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const currentDate = new Date()
  const actualCurrentMonth = currentDate.getMonth()
  const actualCurrentYear = currentDate.getFullYear()
  const shouldHighlightCurrentMonth = currentYear === actualCurrentYear

  const monthWidth = 120

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = event.currentTarget.scrollLeft
    setScrollPosition(scrollLeft)
    const currentCenterMonth = Math.round(scrollLeft / monthWidth)
    setMobileStartMonth(Math.max(0, Math.min(9, currentCenterMonth)))
  }

  const getLeaseStyle = (status: MockLease["calendarStatus"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-800 dark:text-green-200"
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200"
      case "maintenance":
        return "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200"
      case "available":
        return "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
      default:
        return "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200"
    }
  }

  const getStatusBadgeStyle = (status: MockLease["calendarStatus"]) => {
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

  if (!isClient) {
    return <div className="h-64 flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
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
      </div>

      <div className="bg-white dark:bg-gray-950">
        {/* Desktop Calendar Header */}
        <div className="hidden lg:grid grid-cols-13 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <div className="p-2 font-semibold text-sm text-gray-900 dark:text-gray-100 border-r border-gray-200 dark:border-gray-800">Room</div>
          {months.map((month, index) => (
            <div
              key={index}
              className={`p-2 text-center font-medium text-sm border-r border-gray-200 dark:border-gray-800 last:border-r-0 ${index === actualCurrentMonth && shouldHighlightCurrentMonth
                  ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100 font-semibold'
                  : 'text-gray-700 dark:text-gray-300'
                }`}
            >
              {month}
            </div>
          ))}
        </div>

        {/* Mobile Calendar Header */}
        <div className="block lg:hidden flex border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
          <div className="flex-none w-32 p-2 font-semibold text-sm text-gray-900 dark:text-gray-100 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky left-0 z-10">
            Room
          </div>
          <div
            ref={scrollContainerRef}
            className="flex-1 flex overflow-x-auto scrollbar-hide"
            onScroll={handleScroll}
          >
            {months.map((month, index) => (
              <div
                key={index}
                className={`flex-none p-2 text-center font-medium text-sm border-r border-gray-200 dark:border-gray-800 ${index === actualCurrentMonth && shouldHighlightCurrentMonth
                    ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100 font-semibold'
                    : 'text-gray-700 dark:text-gray-300'
                  }`}
                style={{ width: `${monthWidth}px` }}
              >
                {month}
              </div>
            ))}
          </div>
        </div>

        {/* Room Rows */}
        <div className="hidden lg:block">
          {rooms.map((room, roomIndex) => (
            <div
              key={room.id}
              className={`grid grid-cols-13 border-b border-gray-200 dark:border-gray-800 last:border-b-0 ${roomIndex % 2 === 0 ? "bg-white dark:bg-gray-950" : "bg-gray-50/50 dark:bg-gray-900/50"
                }`}
            >
              <div className="p-2 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                <div className="space-y-0.5">
                  <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">{room.roomName}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">#{room.roomNumber} • {room.building} F{room.floor}</p>
                </div>
              </div>

              {months.map((month, monthIndex) => (
                <div
                  key={monthIndex}
                  className={`relative p-1 border-r border-gray-200 dark:border-gray-800 last:border-r-0 min-h-[50px] ${monthIndex === actualCurrentMonth && shouldHighlightCurrentMonth ? 'bg-blue-50 dark:bg-blue-900/20' : ''
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
              ))}
            </div>
          ))}
        </div>

        {/* Mobile Room Rows with Fixed Room Column and Scrollable Calendar */}
        <div className="block lg:hidden">
          {rooms.map((room, roomIndex) => (
            <div
              key={room.id}
              className={`flex border-b border-gray-200 dark:border-gray-800 last:border-b-0 ${roomIndex % 2 === 0 ? "bg-white dark:bg-gray-950" : "bg-gray-50/50 dark:bg-gray-900/50"
                }`}
            >
              {/* Fixed Room Info Column */}
              <div className="flex-none w-32 p-2 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky left-0 z-10">
                <div className="space-y-0.5">
                  <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">{room.roomName}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">#{room.roomNumber} • {room.building} F{room.floor}</p>
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
                        className={`relative border-r border-gray-200 dark:border-gray-800 min-h-[50px] ${isCurrentMonth ? 'bg-blue-50 dark:bg-blue-900/20' : ''
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

      {/* Lease Details Modal */}
      {selectedLease && (
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedLease(null)}
        >
          <Card className="w-96 p-6 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Lease Details</h3>
                <Badge className={`${getStatusBadgeStyle(selectedLease.calendarStatus)} text-white`}>
                  {selectedLease.calendarStatus}
                </Badge>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Tenant</label>
                  <p className="text-gray-900 dark:text-gray-100">{selectedLease.tenantName || 'Not assigned'}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Duration</label>
                  <p className="text-gray-900 dark:text-gray-100 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {months[selectedLease.startMonth]} - {months[selectedLease.endMonth]} {currentYear}
                  </p>
                </div>

                {selectedLease.calendarStatus === "active" && selectedLease.monthlyRent && (
                  <>
                    <div>
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Monthly Rent</label>
                      <p className="text-gray-900 dark:text-gray-100 flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />${(selectedLease.monthlyRent / 100).toLocaleString()}
                      </p>
                    </div>

                    {selectedLease.tenantEmail && (
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Contact</label>
                        <p className="text-gray-900 dark:text-gray-100">{selectedLease.tenantEmail}</p>
                      </div>
                    )}

                    {selectedLease.leaseTerm && (
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Lease Term</label>
                        <p className="text-gray-900 dark:text-gray-100">{selectedLease.leaseTerm}</p>
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