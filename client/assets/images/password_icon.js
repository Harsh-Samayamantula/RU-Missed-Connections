import * as React from "react"
import Svg, { Path } from "react-native-svg"

const PasswordIcon = ({fill}) => (
  <Svg
    width={26}
    height={11}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.226 5.071C6.754 8.438 9.436 11 12.666 11c3.593 0 6.507-3.17 6.535-7.089 1.552.455 3.172 1.105 4.895 1.948 2.075 1.014 2.663-1.227.71-2.369C17.18-.967 8.5-1.905.852 5.162-.89 6.772.27 8.783 2.262 7.418 3.63 6.481 4.944 5.7 6.226 5.071Z"
      fill={fill}
      fillOpacity={0.5}
    />
  </Svg>
)

export default PasswordIcon