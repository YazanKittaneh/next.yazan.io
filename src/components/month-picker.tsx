"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface MonthRange {
  start: { month: number; year: number } | null
  end: { month: number; year: number } | null
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const FULL_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

// Helper function to convert month/year to absolute month position
const getAbsoluteMonth = (month: number, year: number, baseYear: number) => {
  return (year - baseYear) * 12 + month
}

// Helper function to convert absolute month position back to month/year
const getMonthYear = (absoluteMonth: number, baseYear: number) => {
  const year = baseYear + Math.floor(absoluteMonth / 12)
  const month = absoluteMonth % 12
  
return { month, year }
}

export default function MonthPicker() {
  const currentYear = new Date().getFullYear()
  const [baseYear] = useState(currentYear - 1) // Show from previous year
  const [range, setRange] = useState<MonthRange>({ start: null, end: null })
  const [sliderValues, setSliderValues] = useState([12, 23]) // Default to current year range
  const [open, setOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Total years to show (3 years: previous, current, next)
  const totalYears = 3
  const totalMonths = totalYears * 12

  // Update range when slider values change
  useEffect(() => {
    const startMonthYear = getMonthYear(sliderValues[0], baseYear)
    const endMonthYear = getMonthYear(sliderValues[1], baseYear)

    setRange({
      start: startMonthYear,
      end: endMonthYear,
    })
  }, [sliderValues, baseYear])

  const formatRange = () => {
    if (!range.start || !range.end) return "Pick a month range"

    if (range.start.month === range.end.month && range.start.year === range.end.year) {
      return `${FULL_MONTHS[range.start.month]} ${range.start.year}`
    }

    return `${FULL_MONTHS[range.start.month]} ${range.start.year} - ${FULL_MONTHS[range.end.month]} ${range.end.year}`
  }

  const clearSelection = () => {
    setSliderValues([12, 23]) // Reset to current year
  }

  const scrollToCurrentYear = () => {
    if (scrollRef.current) {
      const currentYearPosition = 12 * 32 // 12 months * approximate width
      scrollRef.current.scrollLeft = currentYearPosition - 100
    }
  }

  useEffect(() => {
    if (open) {
      setTimeout(scrollToCurrentYear, 100)
    }
  }, [open])

  const getMonthsForDisplay = () => {
    const months = []
    for (let yearOffset = 0; yearOffset < totalYears; yearOffset++) {
      const year = baseYear + yearOffset
      for (let month = 0; month < 12; month++) {
        const absoluteMonth = yearOffset * 12 + month
        months.push({
          month,
          year,
          absoluteMonth,
          label: MONTHS[month],
          isFirstOfYear: month === 0,
        })
      }
    }
    
return months
  }

  const months = getMonthsForDisplay()

  const handleMouseDown = (absoluteMonth: number, e: React.MouseEvent) => {
    // Don't start drag selection if clicking on handles
    if ((e.target as HTMLElement).closest(".resize-handle")) {
      return
    }

    setIsDragging(true)
    setDragStart(absoluteMonth)
    setSliderValues([absoluteMonth, absoluteMonth])
  }

  const handleMouseEnter = (absoluteMonth: number) => {
    if (isDragging && dragStart !== null) {
      const start = Math.min(dragStart, absoluteMonth)
      const end = Math.max(dragStart, absoluteMonth)
      setSliderValues([start, end])
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDragStart(null)
  }

  // Add global mouse up listener to handle mouse up outside of component
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mouseup", handleMouseUp)
      
return () => document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging])

  return (
    <div className="w-full max-w-sm space-y-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full justify-start text-left font-normal", !range.start && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatRange()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[500px] p-0" align="start">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Select Month Range</h2>
              <Button variant="outline" size="sm" onClick={scrollToCurrentYear}>
                Today
              </Button>
            </div>

            {/* Range Display */}
            <div className="mb-6 p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Selected Range</div>
              <div className="font-medium">
                {range.start && range.end ? (
                  <span>
                    <span className="text-primary">
                      {FULL_MONTHS[range.start.month]} {range.start.year}
                    </span>
                    {(range.start.month !== range.end.month || range.start.year !== range.end.year) && (
                      <>
                        <span className="mx-2">→</span>
                        <span className="text-primary">
                          {FULL_MONTHS[range.end.month]} {range.end.year}
                        </span>
                      </>
                    )}
                  </span>
                ) : (
                  "No range selected"
                )}
              </div>
              {range.start && range.end && (
                <div className="text-xs text-muted-foreground mt-1">
                  {sliderValues[1] - sliderValues[0] + 1} months selected
                </div>
              )}
            </div>

            {/* Scrollable Month Timeline */}
            <div className="mb-6">
              <div
                ref={scrollRef}
                className="overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
                style={{ scrollbarWidth: "thin" }}
              >
                <div className="pb-2" style={{ width: `${totalMonths * 32}px` }}>
                  {/* Year labels row */}
                  <div className="flex gap-0.5 mb-2">
                    {months.map((monthData) => {
                      const { month, year, absoluteMonth, isFirstOfYear } = monthData
                      
return (
                        <div key={`year-${year}-${month}`} className="w-8 h-4 flex items-center justify-center">
                          {isFirstOfYear && <div className="text-xs font-medium text-muted-foreground">{year}</div>}
                        </div>
                      )
                    })}
                  </div>

                  {/* Month blocks row */}
                  <div className="flex gap-0.5 relative">
                    {months.map((monthData) => {
                      const { month, year, absoluteMonth, label } = monthData
                      const isInRange = absoluteMonth >= sliderValues[0] && absoluteMonth <= sliderValues[1]
                      const isStart = absoluteMonth === sliderValues[0]
                      const isEnd = absoluteMonth === sliderValues[1]

                      return (
                        <div
                          key={`${year}-${month}`}
                          className={cn(
                            "relative w-8 h-12 rounded-sm border-2 transition-all duration-200 flex items-center justify-center text-xs font-medium cursor-pointer select-none",
                            isInRange
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-muted text-muted-foreground border-muted hover:bg-muted/80",
                            isStart && "rounded-r-none",
                            isEnd && sliderValues[0] !== sliderValues[1] && "rounded-l-none",
                            isInRange && !isStart && !isEnd && "rounded-none",
                            isDragging && "cursor-grabbing",
                          )}
                          onMouseDown={(e) => handleMouseDown(absoluteMonth, e)}
                          onMouseEnter={() => handleMouseEnter(absoluteMonth)}
                          title={`${FULL_MONTHS[month]} ${year}`}
                        >
                          <span className="rotate-90 text-[10px] pointer-events-none">{label}</span>

                          {/* Start handle */}
                          {isStart && (
                            <div
                              className="resize-handle absolute -left-1 top-0 bottom-0 w-2 bg-primary rounded-l-md cursor-ew-resize hover:bg-primary/80 flex items-center justify-center group"
                              onMouseDown={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                const startX = e.clientX
                                const startValue = sliderValues[0]

                                const handleMouseMove = (e: MouseEvent) => {
                                  const deltaX = e.clientX - startX
                                  const monthWidth = 32
                                  const deltaMonths = Math.round(deltaX / monthWidth)
                                  const newStart = Math.max(0, Math.min(sliderValues[1], startValue + deltaMonths))
                                  setSliderValues([newStart, sliderValues[1]])
                                }

                                const handleMouseUp = () => {
                                  document.removeEventListener("mousemove", handleMouseMove)
                                  document.removeEventListener("mouseup", handleMouseUp)
                                }

                                document.addEventListener("mousemove", handleMouseMove)
                                document.addEventListener("mouseup", handleMouseUp)
                              }}
                            >
                              <div className="w-0.5 h-6 bg-primary-foreground rounded-full opacity-60 group-hover:opacity-100 pointer-events-none" />
                            </div>
                          )}

                          {/* End handle */}
                          {isEnd && sliderValues[0] !== sliderValues[1] && (
                            <div
                              className="resize-handle absolute -right-1 top-0 bottom-0 w-2 bg-primary rounded-r-md cursor-ew-resize hover:bg-primary/80 flex items-center justify-center group"
                              onMouseDown={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                const startX = e.clientX
                                const startValue = sliderValues[1]

                                const handleMouseMove = (e: MouseEvent) => {
                                  const deltaX = e.clientX - startX
                                  const monthWidth = 32
                                  const deltaMonths = Math.round(deltaX / monthWidth)
                                  const newEnd = Math.max(
                                    sliderValues[0],
                                    Math.min(totalMonths - 1, startValue + deltaMonths),
                                  )
                                  setSliderValues([sliderValues[0], newEnd])
                                }

                                const handleMouseUp = () => {
                                  document.removeEventListener("mousemove", handleMouseMove)
                                  document.removeEventListener("mouseup", handleMouseUp)
                                }

                                document.addEventListener("mousemove", handleMouseMove)
                                document.addEventListener("mouseup", handleMouseUp)
                              }}
                            >
                              <div className="w-0.5 h-6 bg-primary-foreground rounded-full opacity-60 group-hover:opacity-100 pointer-events-none" />
                            </div>
                          )}
                        </div>
                      )
                    })}

                    {/* Range drag area for moving entire selection */}
                    {sliderValues[0] !== sliderValues[1] && !isDragging && (
                      <div
                        className="absolute top-0 bottom-0 bg-transparent cursor-move"
                        style={{
                          left: `${sliderValues[0] * 32}px`,
                          width: `${(sliderValues[1] - sliderValues[0] + 1) * 32}px`,
                        }}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          const startX = e.clientX
                          const rangeSize = sliderValues[1] - sliderValues[0]
                          const startRange = sliderValues[0]

                          const handleMouseMove = (e: MouseEvent) => {
                            const deltaX = e.clientX - startX
                            const monthWidth = 32
                            const deltaMonths = Math.round(deltaX / monthWidth)
                            const newStart = Math.max(
                              0,
                              Math.min(totalMonths - 1 - rangeSize, startRange + deltaMonths),
                            )
                            setSliderValues([newStart, newStart + rangeSize])
                          }

                          const handleMouseUp = () => {
                            document.removeEventListener("mousemove", handleMouseMove)
                            document.removeEventListener("mouseup", handleMouseUp)
                          }

                          document.addEventListener("mousemove", handleMouseMove)
                          document.addEventListener("mouseup", handleMouseUp)
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Interaction hints */}
                <div className="mt-2 text-xs text-muted-foreground text-center">
                  {isDragging
                    ? "Release to finish selection"
                    : sliderValues[0] === sliderValues[1]
                      ? "Click and drag to select range • Scroll to see more years"
                      : "Drag handles to resize • Drag middle to move • Click and drag to reselect"}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between">
                <Button variant="outline" size="sm" onClick={clearSelection}>
                  Clear
                </Button>
                <Button size="sm" onClick={() => setOpen(false)}>
                  Done
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Display Selected Range */}
      {range.start && range.end && (
        <div className="text-sm text-muted-foreground">
          <p>Selected range:</p>
          <p className="font-medium text-foreground">{formatRange()}</p>
          <p className="text-xs mt-1">
            {sliderValues[1] - sliderValues[0] + 1} months selected
            {range.start.year !== range.end.year && <span className="ml-2 text-primary">• Multi-year range</span>}
          </p>
        </div>
      )}
    </div>
  )
}
