"use client"

import { cn } from "@/lib/utils"

interface Month {
  month: number // 0-11 (January = 0)
  year: number
}

interface MonthMiniViewerProps {
  months: Month[]
  className?: string
  showYearLabels?: boolean
  size?: "sm" | "md" | "lg"
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

export default function MonthMiniViewer({
  months,
  className,
  showYearLabels = true,
  size = "md",
}: MonthMiniViewerProps) {
  if (!months || months.length === 0) {
    return <div className={cn("p-2 text-center text-muted-foreground text-sm", className)}>No months to display</div>
  }

  // Sort months chronologically
  const sortedMonths = [...months].sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year
    return a.month - b.month
  })

  // Remove duplicates
  const uniqueMonths = sortedMonths.filter((month, index, arr) => {
    return index === 0 || !(month.month === arr[index - 1].month && month.year === arr[index - 1].year)
  })

  // Group months by year for year labels
  const monthsByYear = uniqueMonths.reduce(
    (acc, month) => {
      if (!acc[month.year]) {
        acc[month.year] = []
      }
      acc[month.year].push(month)
      return acc
    },
    {} as Record<number, Month[]>,
  )

  const years = Object.keys(monthsByYear).map(Number).sort()

  // Size configurations
  const sizeConfig = {
    sm: {
      monthWidth: "w-6",
      monthHeight: "h-8",
      textSize: "text-[8px]",
      yearTextSize: "text-xs",
      gap: "gap-0.5",
    },
    md: {
      monthWidth: "w-8",
      monthHeight: "h-10",
      textSize: "text-[10px]",
      yearTextSize: "text-xs",
      gap: "gap-0.5",
    },
    lg: {
      monthWidth: "w-10",
      monthHeight: "h-12",
      textSize: "text-xs",
      yearTextSize: "text-sm",
      gap: "gap-1",
    },
  }

  const config = sizeConfig[size]

  return (
    <div className={cn("inline-block", className)}>
      {/* Year labels row */}
      {showYearLabels && years.length > 1 && (
        <div className={cn("flex mb-1", config.gap)}>
          {years.map((year) => {
            const yearMonths = monthsByYear[year]
            const yearWidth = yearMonths.length

            return (
              <div
                key={year}
                className={cn(
                  "flex items-center justify-center",
                  config.yearTextSize,
                  "font-medium text-muted-foreground",
                )}
                style={{ width: `${yearWidth * (size === "sm" ? 28 : size === "md" ? 36 : 44)}px` }}
              >
                {year}
              </div>
            )
          })}
        </div>
      )}

      {/* Single year label for single year */}
      {showYearLabels && years.length === 1 && (
        <div className={cn("text-center mb-1", config.yearTextSize, "font-medium text-muted-foreground")}>
          {years[0]}
        </div>
      )}

      {/* Month blocks */}
      <div className={cn("flex", config.gap)}>
        {uniqueMonths.map((month, index) => {
          const isFirst = index === 0
          const isLast = index === uniqueMonths.length - 1
          const isConsecutive =
            index > 0 &&
            ((month.year === uniqueMonths[index - 1].year && month.month === uniqueMonths[index - 1].month + 1) ||
              (month.year === uniqueMonths[index - 1].year + 1 &&
                month.month === 0 &&
                uniqueMonths[index - 1].month === 11))

          const nextIsConsecutive =
            index < uniqueMonths.length - 1 &&
            ((uniqueMonths[index + 1].year === month.year && uniqueMonths[index + 1].month === month.month + 1) ||
              (uniqueMonths[index + 1].year === month.year + 1 &&
                uniqueMonths[index + 1].month === 0 &&
                month.month === 11))

          return (
            <div
              key={`${month.year}-${month.month}`}
              className={cn(
                config.monthWidth,
                config.monthHeight,
                "rounded-sm border-2 bg-primary text-primary-foreground border-primary transition-all duration-200 flex items-center justify-center font-medium cursor-default",
                // Rounded corners logic for consecutive months
                isConsecutive && "rounded-l-none",
                nextIsConsecutive && "rounded-r-none",
              )}
              title={`${FULL_MONTHS[month.month]} ${month.year}`}
            >
              <span className={cn("", config.textSize)}>{MONTHS[month.month]}</span>

              {/* Start indicator */}
              {isFirst && (
                <div className="absolute -left-0.5 top-0 bottom-0 w-1 bg-primary-foreground rounded-l-sm opacity-80" />
              )}

              {/* End indicator */}
              {isLast && (
                <div className="absolute -right-0.5 top-0 bottom-0 w-1 bg-primary-foreground rounded-r-sm opacity-80" />
              )}
            </div>
          )
        })}
      </div>

      {/* Summary */}
      <div className="mt-2 text-center">
        <div className={cn("text-muted-foreground", config.textSize)}>
          {uniqueMonths.length} month{uniqueMonths.length !== 1 ? "s" : ""}
          {years.length > 1 && <span className="ml-1 text-primary">• {years.length} years</span>}
        </div>
      </div>
    </div>
  )
}
