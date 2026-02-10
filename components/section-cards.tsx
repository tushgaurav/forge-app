"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RiArrowUpLine, RiArrowDownLine, RiTimeLine, RiSpeedLine, RiShieldCheckLine, RiFlashlightLine } from "@remixicon/react"

const metrics = [
  {
    label: "Uptime",
    value: "98.7%",
    change: "+0.3%",
    trend: "up" as const,
    detail: "All lines operational",
    subtext: "Last 30 days average",
    icon: RiTimeLine,
  },
  {
    label: "Production Rate",
    value: "1,247",
    unit: "units/hr",
    change: "+5.2%",
    trend: "up" as const,
    detail: "Above target by 47 units",
    subtext: "Current shift output",
    icon: RiSpeedLine,
  },
  {
    label: "Quality",
    value: "99.2%",
    change: "+0.1%",
    trend: "up" as const,
    detail: "First-pass yield rate",
    subtext: "Zero critical defects today",
    icon: RiShieldCheckLine,
  },
  {
    label: "Efficiency",
    value: "94.5%",
    change: "+2.8%",
    trend: "up" as const,
    detail: "OEE across all lines",
    subtext: "Exceeding weekly target",
    icon: RiFlashlightLine,
  },
]

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.label} className="@container/card relative overflow-hidden">
          <div className="absolute top-0 left-0 h-0.5 w-full bg-gradient-to-r from-primary/80 to-primary/20" />
          <CardHeader>
            <CardDescription className="flex items-center gap-2">
              <metric.icon className="size-4 text-primary" />
              {metric.label}
            </CardDescription>
            <CardTitle className="font-display text-2xl font-bold tabular-nums tracking-tight @[250px]/card:text-3xl">
              {metric.value}
              {metric.unit && (
                <span className="ml-1.5 text-sm font-normal text-muted-foreground font-sans">
                  {metric.unit}
                </span>
              )}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="gap-1">
                {metric.trend === "up" ? (
                  <RiArrowUpLine className="size-3 text-forge-green" />
                ) : (
                  <RiArrowDownLine className="size-3 text-forge-red" />
                )}
                <span className={metric.trend === "up" ? "text-forge-green" : "text-forge-red"}>
                  {metric.change}
                </span>
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {metric.detail}
            </div>
            <div className="text-muted-foreground text-xs">
              {metric.subtext}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
