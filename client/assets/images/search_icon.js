import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SearchIcon = (props) => (
  <Svg
    width={19}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="m18.004 16.594-5.4-5.4a7 7 0 1 0-1.41 1.41l5.4 5.4 1.41-1.41Zm-11-4.59a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"
      fill="#7A5A5E"
    />
  </Svg>
)

export default SearchIcon
