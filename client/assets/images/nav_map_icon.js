import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { ThemeContext } from "../../App"

const NavMapIcon = (props) => {
  const theme = React.useContext(ThemeContext)
  const color = props.color
  return (
    <Svg
      width={28}
      height={21}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="m26.075 2.004-7.697-1.9a.317.317 0 0 0-.123 0 .398.398 0 0 0-.111 0L9.75 2.171 2.7.429a1.612 1.612 0 0 0-1.368.286A1.579 1.579 0 0 0 .72 1.957v14.637c0 .35.118.692.337.968.218.277.524.474.869.56l7.698 1.9c.083.02.17.02.255 0l8.372-2.069 7.05 1.743a1.603 1.603 0 0 0 1.52-.414c.299-.295.467-.696.467-1.113V3.532c0-.352-.12-.694-.34-.97a1.596 1.596 0 0 0-.872-.558ZM1.781 16.594V1.957c0-.14.056-.273.156-.372a.534.534 0 0 1 .375-.153.537.537 0 0 1 .128 0l6.779 1.69v15.719l-7.034-1.738a.532.532 0 0 1-.404-.51Zm8.5-13.472 7.438-1.837v15.718l-7.438 1.838V3.122ZM26.22 18.17a.521.521 0 0 1-.42.514.54.54 0 0 1-.239-.005l-6.779-1.675V1.285l7.034 1.737a.521.521 0 0 1 .404.525V18.17Z"
        fill={color}
      />
    </Svg>)
}

export default NavMapIcon
