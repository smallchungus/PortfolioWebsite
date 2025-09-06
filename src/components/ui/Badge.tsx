import { ReactNode } from 'react'

export interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  'aria-label'?: string
  'data-testid'?: string
}

const badgeVariants = {
  default: 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-50',
  secondary: 'bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-50',
  outline: 'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50',
}

const badgeSizes = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  'aria-label': ariaLabel,
  'data-testid': dataTestId,
}: BadgeProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-full transition-colors'
  const variantClasses = badgeVariants[variant]
  const sizeClasses = badgeSizes[size]
  
  const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim()

  return (
    <span
      role="img"
      aria-label={ariaLabel}
      data-testid={dataTestId}
      className={combinedClasses}
    >
      {children}
    </span>
  )
}