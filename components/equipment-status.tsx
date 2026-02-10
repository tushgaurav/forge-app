"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  RiRobot2Line,
  RiSensorLine,
  RiCpuLine,
  RiToolsLine,
} from "@remixicon/react"

const equipment = [
  { name: "Cobot UR-10e #1", type: "robot", status: "running", uptime: "99.1%", icon: RiRobot2Line },
  { name: "Cobot UR-10e #2", type: "robot", status: "running", uptime: "98.4%", icon: RiRobot2Line },
  { name: "Cobot UR-5e #3", type: "robot", status: "idle", uptime: "97.8%", icon: RiRobot2Line },
  { name: "Cobot UR-16e #4", type: "robot", status: "running", uptime: "99.5%", icon: RiRobot2Line },
  { name: "Temp Sensor Array", type: "sensor", status: "running", uptime: "100%", icon: RiSensorLine },
  { name: "Pressure Bank A", type: "sensor", status: "running", uptime: "99.9%", icon: RiSensorLine },
  { name: "Vibration Monitor", type: "sensor", status: "warning", uptime: "96.2%", icon: RiSensorLine },
  { name: "PLC Siemens S7-1", type: "plc", status: "running", uptime: "99.8%", icon: RiCpuLine },
  { name: "PLC Allen-Bradley", type: "plc", status: "running", uptime: "99.6%", icon: RiCpuLine },
  { name: "CNC Mill #2", type: "machine", status: "maintenance", uptime: "94.1%", icon: RiToolsLine },
]

const statusConfig: Record<string, { label: string; color: string; dot: string }> = {
  running: { label: "Running", color: "text-forge-green", dot: "bg-forge-green status-online" },
  idle: { label: "Idle", color: "text-forge-amber", dot: "bg-forge-amber" },
  warning: { label: "Warning", color: "text-forge-red", dot: "bg-forge-red status-online" },
  maintenance: { label: "Maint.", color: "text-muted-foreground", dot: "bg-muted-foreground" },
}

export function EquipmentStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-display">Equipment Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-2 pb-2 text-xs text-muted-foreground font-mono uppercase tracking-wider">
            <span>Equipment</span>
            <span>Uptime</span>
            <span className="w-20 text-right">Status</span>
          </div>
          {equipment.map((item) => {
            const status = statusConfig[item.status]
            return (
              <div
                key={item.name}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-sm px-2 py-2 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <item.icon className="size-4 shrink-0 text-muted-foreground" />
                  <span className="text-sm truncate">{item.name}</span>
                </div>
                <span className="font-mono text-sm tabular-nums">{item.uptime}</span>
                <Badge variant="outline" className="w-20 justify-center gap-1.5">
                  <span className={`size-1.5 rounded-full ${status.dot}`} />
                  <span className={`text-xs ${status.color}`}>{status.label}</span>
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
