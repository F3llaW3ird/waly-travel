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
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2C12 2 8 7 8 10C8 12.2 9.8 14 12 14C14.2 14 16 12.2 16 10C16 7 12 2 12 2Z" />
      <path d="M12 6C12 6 10 8.5 10 10.5C10 11.7 10.9 12.5 12 12.5C13.1 12.5 14 11.7 14 10.5C14 8.5 12 6 12 6Z" />
      <path d="M7 13C7 13 4.5 16 4.5 18C4.5 19.4 5.6 20.5 7 20.5C8.4 20.5 9.5 19.4 9.5 18C9.5 16 7 13 7 13Z" />
      <path d="M17 13C17 13 14.5 16 14.5 18C14.5 19.4 15.6 20.5 17 20.5C18.4 20.5 19.5 19.4 19.5 18C19.5 16 17 13 17 13Z" />
      <path d="M12 14C12 14 11 17 11 19C11 20.1 11.9 21 12 21C12.1 21 13 20.1 13 19C13 17 12 14 12 14Z" />
    </svg>
  )
}
