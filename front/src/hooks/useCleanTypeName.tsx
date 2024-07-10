const useCleanTypename = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map((item) => useCleanTypename(item))
  } else if (data !== null && typeof data === 'object') {
    const newObj: any = {}
    for (const key in data) {
      if (key !== '__typename') {
        newObj[key] = useCleanTypename(data[key])
      }
    }
    return newObj
  }
  return data
}

export default useCleanTypename
