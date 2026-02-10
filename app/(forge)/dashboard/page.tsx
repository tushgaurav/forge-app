import { SectionCards } from "@/components/section-cards"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { EquipmentStatus } from "@/components/equipment-status"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards />
      <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @5xl/main:grid-cols-[2fr_1fr]">
        <ChartAreaInteractive />
        <EquipmentStatus />
      </div>
    </div>
  )
}
