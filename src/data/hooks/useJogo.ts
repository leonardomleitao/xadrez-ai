import { useContext } from 'react'
import ContextoJogo from '../contexts/ContextoJogo'

const useJogo = () => useContext(ContextoJogo)
export default useJogo
