import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useGameStore } from "@/stores/gameStore"

export function InfoPanel() {
  const speed = useGameStore((state) => state.speed)
  const isPaused = useGameStore((state) => state.isPaused)

  const controls = [
    { key: "W", action: "前进" },
    { key: "S", action: "后退" },
    { key: "A", action: "左转" },
    { key: "D", action: "右转" },
    { key: "空格", action: "刹车" },
  ]

  return (
    <Card className="absolute top-4 left-4 w-48 bg-black/70 border-none text-white backdrop-blur-sm">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-lg flex items-center justify-between">
          3D小车游戏
          {isPaused && (
            <Badge variant="secondary" className="ml-2">
              暂停
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">速度</span>
          <Badge variant="outline" className="font-mono">
            {Math.round(speed)} km/h
          </Badge>
        </div>

        <div className="border-t border-white/20 pt-3">
          <p className="text-xs text-muted-foreground mb-2">操作说明</p>
          <div className="space-y-1">
            {controls.map(({ key, action }) => (
              <div key={key} className="flex items-center justify-between text-sm">
                <kbd className="px-2 py-0.5 bg-white/10 rounded text-xs font-mono">
                  {key}
                </kbd>
                <span className="text-white/80">{action}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
