import { Triangle } from 'react-loader-spinner'
import { useSelector } from "react-redux";

const Spin = () => {
  const spinner = useSelector(state => state.appReducer.loading)
  
  return (
    <div className="loader-styles">
      <Triangle
        color='rgb(218,10,86)'
        height={200}
        width={200}
        visible={spinner}
      />  
    </div>
  )
}

export default Spin