"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  RiDashboardLine,
  RiRobot2Line,
  RiSensorLine,
  RiCpuLine,
  RiSettingsLine,
  RiQuestionLine,
  RiAlarmWarningLine,
  RiFileChartLine,
  RiFireLine,
} from "@remixicon/react"

const data = {
  user: {
    name: "Operator",
    email: "ops@forge-mfg.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <RiDashboardLine />,
    },
    {
      title: "Cobots",
      url: "/robot",
      icon: <RiRobot2Line />,
    },
    {
      title: "Sensors",
      url: "/sensors",
      icon: <RiSensorLine />,
    },
    {
      title: "PLC",
      url: "/plc",
      icon: <RiCpuLine />,
    },
  ],
  navSecondary: [
    {
      title: "Alerts",
      url: "#",
      icon: <RiAlarmWarningLine />,
    },
    {
      title: "Reports",
      url: "#",
      icon: <RiFileChartLine />,
    },
    {
      title: "Settings",
      url: "#",
      icon: <RiSettingsLine />,
    },
    {
      title: "Help",
      url: "#",
      icon: <RiQuestionLine />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  const navMainWithActive = data.navMain.map((item) => ({
    ...item,
    isActive: pathname === item.url || pathname.startsWith(item.url + "/"),
  }))

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/dashboard">
                <div className="flex size-6 items-center justify-center rounded bg-primary text-primary-foreground">
                  <RiFireLine className="size-4!" />
                </div>
                <span className="font-display text-base font-bold tracking-wide">FORGE</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <NavMain items={navMainWithActive} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
