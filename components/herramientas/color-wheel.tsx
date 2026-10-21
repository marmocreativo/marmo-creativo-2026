"use client"

import { useCallback, useEffect, useRef } from "react"
import type { HSL } from "@/lib/herramientas/esquemas"

// Rueda de matiz + cuadro de saturación/luminosidad (se elige haciendo clic).
export function ColorWheel({ color, onChange }: { color: HSL; onChange: (c: HSL) => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !ctx) return

        const cx = canvas.width / 2
        const cy = canvas.height / 2
        const radio = Math.min(cx, cy) - 10
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        for (let angulo = 0; angulo < 360; angulo++) {
            ctx.beginPath()
            ctx.arc(cx, cy, radio, ((angulo - 90) * Math.PI) / 180, ((angulo - 89) * Math.PI) / 180)
            ctx.lineWidth = 2
            ctx.strokeStyle = `hsl(${angulo}, 100%, 50%)`
            ctx.stroke()
        }

        const lado = radio * 0.6
        const x0 = cx - lado / 2
        const y0 = cy - lado / 2
        for (let x = 0; x < lado; x += 2) {
            for (let y = 0; y < lado; y += 2) {
                ctx.fillStyle = `hsl(${color.h}, ${(x / lado) * 100}%, ${100 - (y / lado) * 100}%)`
                ctx.fillRect(x0 + x, y0 + y, 2, 2)
            }
        }

        const marcador = (px: number, py: number) => {
            ctx.beginPath()
            ctx.arc(px, py, 6, 0, 2 * Math.PI)
            ctx.fillStyle = "white"
            ctx.fill()
            ctx.strokeStyle = "black"
            ctx.lineWidth = 2
            ctx.stroke()
        }
        const rad = ((color.h - 90) * Math.PI) / 180
        marcador(cx + Math.cos(rad) * radio, cy + Math.sin(rad) * radio)
        marcador(x0 + (color.s / 100) * lado, y0 + ((100 - color.l) / 100) * lado)
    }, [color])

    const alHacerClic = useCallback(
        (e: React.MouseEvent<HTMLCanvasElement>) => {
            const canvas = canvasRef.current
            if (!canvas) return
            const rect = canvas.getBoundingClientRect()
            // El canvas puede verse más chico que sus 200 px: se escala la posición del clic.
            const x = ((e.clientX - rect.left) * canvas.width) / rect.width
            const y = ((e.clientY - rect.top) * canvas.height) / rect.height
            const cx = canvas.width / 2
            const cy = canvas.height / 2
            const radio = Math.min(cx, cy) - 10
            const dx = x - cx
            const dy = y - cy
            const distancia = Math.sqrt(dx * dx + dy * dy)

            if (distancia <= radio && distancia >= radio * 0.7) {
                const angulo = (Math.atan2(dy, dx) * 180) / Math.PI + 90
                onChange({ ...color, h: Math.round(angulo < 0 ? angulo + 360 : angulo) })
            } else if (distancia <= radio * 0.6) {
                const lado = radio * 0.6
                const x0 = cx - lado / 2
                const y0 = cy - lado / 2
                if (x >= x0 && x <= x0 + lado && y >= y0 && y <= y0 + lado) {
                    onChange({
                        ...color,
                        s: Math.max(0, Math.min(100, Math.round(((x - x0) / lado) * 100))),
                        l: Math.max(0, Math.min(100, Math.round(100 - ((y - y0) / lado) * 100))),
                    })
                }
            }
        },
        [color, onChange],
    )

    return (
        <canvas
            ref={canvasRef}
            width={200}
            height={200}
            onClick={alHacerClic}
            aria-label="Selector de color"
            className="cursor-pointer rounded-lg border border-border"
            style={{ maxWidth: "100%", height: "auto" }}
        />
    )
}
