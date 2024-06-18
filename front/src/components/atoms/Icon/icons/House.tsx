type HouseProps = React.SVGProps<SVGSVGElement> & {
  color?: string
}

const House = ({ color = '#000', ...props }: HouseProps) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 16 16"
      aria-label="house"
      color={color}
      fill="transparent"
      {...props}
    >
      <polygon
        points="0,6 0,16 6,16 6,10 10,10 10,16 16,16 16,6 8,0"
        fill="currentColor"
      />
    </svg>
  )
}

export default House
