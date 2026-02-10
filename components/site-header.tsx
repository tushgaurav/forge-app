"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

const pageTitles: Record<string, string> = {
  "/dashboard": "Overview",
  "/robot": "Cobot Monitoring",
  "/sensors": "Sensor Analytics",
  "/plc": "PLC Status",
}

export function SiteHeader() {
  const pathname = usePathname()
  const title = pageTitles[pathname] || "Dashboard"

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="font-display text-base font-semibold tracking-wide">{title}</h1>
        <div className="ml-auto flex items-center gap-3">
          <Badge variant="outline" className="gap-1.5 text-xs font-mono">
            <span className="size-2 rounded-full bg-forge-green status-online" />
            System Online
          </Badge>
        </div>
      </div>
    </header>
  )
}
