import { Oval } from 'react-loader-spinner' // Updated import
import { LoaderEl } from './styledComponents'

const LoaderComp = () => (
  <LoaderEl>
    <Oval color="#00BFFF" height={50} width={50} /> {/* Updated usage */}
  </LoaderEl>
)

export default LoaderComp
