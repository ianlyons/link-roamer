import React, { useEffect, useMemo, useState } from 'react'
import c from '../scripts/Chrome'
import { gatherHrefs } from '../scripts/execute-scripts'
import lp from '../scripts/LinkProcessor'
import { Children, LinkData } from '../types'

interface DataContextProps {
  data: LinkData
  setData: React.Dispatch<React.SetStateAction<LinkData>>
}

const DataContext = React.createContext({} as DataContextProps)

export const DataProvider = ({ children }: Children) => {
  const [data, setData] = useState<LinkData>({
    links: [],
    loading: true,
  })

  const dataMemo = useMemo(
    () => ({
      data,
      setData,
    }),
    [data],
  )

  useEffect(() => {
    const fetchData = async () => {
      const { id } = await c.getActiveTab()

      if (id) {
        const links = (await c.executeScript<string[]>(id, gatherHrefs))
          .map(lp.createLink)
          .filter(lp.filterHttp)
          .filter(lp.filterKeyString)
          .sort(lp.sortByHrefLength)

        links.length > 0
          ? setData({ links, loading: true })
          : setData({ links: [], loading: false })
      }
    }

    fetchData().catch(console.error)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (data.links.length > 0) {
        const result = await c.fetchLinks(data.links)
        console.log(result)

        const links = data.links.map((link) => {
          const status = result.find(
            (status) => status.url.original === link.href,
          )
          if (status) link.status = status
          return link
        })

        setData({ links, loading: false })
      }
    }

    fetchData().catch(console.error)
  }, [data.links.length])

  return (
    <DataContext.Provider value={dataMemo}>{children}</DataContext.Provider>
  )
}

export const useData = () => React.useContext(DataContext)
