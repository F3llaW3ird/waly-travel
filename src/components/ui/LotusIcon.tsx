interface LotusIconProps {
  className?: string
  size?: number
}

export default function LotusIcon({ className, size = 24 }: LotusIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      stroke="currentColor"
      strokeWidth="16"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M256 96c0 0-70 60-70 110s31 66 70 66 70-16 70-66-70-110-70-110z" />
      <path d="M256 170c0 0-44 30-44 60s20 36 44 36 44-6 44-36-44-60-44-60z" />
      <path d="M140 250c0 0-60 50-60 90s40 60 60 60 60-20 60-60-60-90-60-90z" />
      <path d="M372 250c0 0 60 50 60 90s-40 60-60 60-60-20-60-60 60-90 60-90z" />
      <path d="M256 270c0 0-40 40-40 70s18 50 40 50 40-20 40-50-40-70-40-70z" />
      <ellipse cx="256" cy="390" rx="140" ry="20" />
    </svg>
  )
}
