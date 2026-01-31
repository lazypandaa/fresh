import { cn } from "../../lib/utils"

export function Button({ className, variant = "default", size = "default", children, ...props }) {
  const variants = {
    default: "bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl",
    outline: "border-2 border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300",
    ghost: "hover:bg-gray-100",
  }
  
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
