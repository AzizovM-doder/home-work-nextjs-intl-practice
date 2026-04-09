"use client"

import { useParams } from "next/navigation"
import { useRouter,usePathname } from "../i18n/navigation"


const LangToggle = () => {
    const locale = useParams()
    const pathname =  usePathname()
    const router = useRouter()
    const changeLang = (e : any) =>{
        router.push(pathname , {locale : e.target.value})
    }
  return (
    <select onChange={changeLang} value={locale?.locale}>
        <option value="tj">TJ</option>
        <option value="ru">RU</option>
        <option value="en">EN</option>
    </select>
  )
}

export default LangToggle