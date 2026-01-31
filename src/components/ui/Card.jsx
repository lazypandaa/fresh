import { cn } from "../../lib/utils"

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn("rounded-xl border-2 border-gray-200 bg-white shadow-sm transition-shadow", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={cn("text-2xl font-bold leading-none tracking-tight", className)} {...props}>
      {children}
    </h3>
  )
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  )
}
