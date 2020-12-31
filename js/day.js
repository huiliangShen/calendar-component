/**
 * 根据传入的时间，获取传入时间的开始日期和结束日期
 * @param {*} date 
 */
export function getDaysByMonth (date) {
    let currentDate = new Date(date)
    // 设置为一下月的第一天
    currentDate.setMonth(currentDate.getMonth() + 1, 1)
    // 获取到的当前日期的最后一天
    currentDate.setDate(currentDate.getDate() - 1)

    const lastDate = currentDate.getDate()
    let result = []
    for (let i = 1; i <= lastDate; i++) {
        let scopeDate = new Date(currentDate.setDate(i))
        
        const formateDate = format(scopeDate)
        const element = {
            date: scopeDate,
            formateDate,
            year: formateDate.split('-')[0],
            month: formateDate.split('-')[1],
            day: formateDate.split('-')[2]
        }
        result = [...result, element]
    }
    return result
}

export function format(date) {
    const nowDate = date ? new Date(date) : new Date()
    const year = nowDate.getFullYear()
    const month = parseAddZero(nowDate.getMonth() + 1)
    const day = parseAddZero(nowDate.getDate())

    return `${year}-${month}-${day}`
}

export function parseAddZero(num) {
    return num < 10 ? `0${num}` : num
}

export function getTotalDate(date, totalCount = 42) {
    const nowDate = date ? new Date(date) : new Date()
    
    const beforeMonth = new Date(nowDate).setMonth(nowDate.getMonth() - 1, 1)
    const nowMonth = new Date(nowDate).setMonth(nowDate.getMonth(), 1)
    const afterMonth = new Date(nowDate).setMonth(nowDate.getMonth() + 1, 1)

    const beforeDates = getDaysByMonth(beforeMonth)
    const nowDates = getDaysByMonth(nowMonth)
    const afterDates = getDaysByMonth(afterMonth)

    const remain = totalCount - nowDates.length
    const header = nowDates[0].date.getDay()
    const end = remain - header

    return [...(beforeDates.slice(beforeDates.length - header, beforeDates.length)), ...nowDates, ...(afterDates.slice(0, end % 7))]
}

export function getElementByClassName(elements, className = '') {
    if (!elements || !className) {
        return null
    }
    if (elements.classList.contains(className)) {
        return elements
    }
    const parent = elements.parentElement
    return getElementByClassName(parent, className)
}