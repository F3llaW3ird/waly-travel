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
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M50 90 C20 80 10 60 15 45 C20 30 35 25 50 35 C65 25 80 30 85 45 C90 60 80 80 50 90Z" />
      <path d="M50 85 C30 75 22 58 26 45 C30 32 42 28 50 38 C58 28 70 32 74 45 C78 58 70 75 50 85Z" />
      <path d="M50 80 C38 72 32 58 35 48 C38 38 46 34 50 42 C54 34 62 38 65 48 C68 58 62 72 50 80Z" />
      <path d="M50 75 C42 70 38 60 40 52 C42 44 48 40 50 46 C52 40 58 44 60 52 C62 60 58 70 50 75Z" />
      <path d="M50 70 C46 66 44 60 45 55 C46 50 48 48 50 50 C52 48 54 50 55 55 C56 60 54 66 50 70Z" />
    </svg>
  )
}
