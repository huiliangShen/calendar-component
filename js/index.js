// import { getDay } from "./day.js"
import { getTotalDate, format, parseAddZero, getElementByClassName } from "./day.js"

const content = document.querySelector(".calendar-date-tbody-content")
const title = document.querySelector("#calendar-headar-titile")
const dir = document.querySelector(".calendar-header-content")

const now = new Date()
let selected = format(now)

function init() {
	const totalDate = getTotalDate(now)
	initDom(totalDate)

	title.innerHTML = `${now.getFullYear()}-${parseAddZero(now.getMonth() + 1)}`
}

function initDom(totalDate) {
	const result = []
	const divs = document.createDocumentFragment()
	let i = 0
	const total7Count = totalDate.length / 7
	const remain7Count = totalDate.length % 7
	while (total7Count >= i) {
		if (total7Count === i) {
			remain7Count > 0 && (result[i] = totalDate.slice(i * 7, totalDate.length))
		} else {
			result[i] = totalDate.slice(i * 7, (i + 1) * 7)
		}
		i++
	}

	result.forEach((f) => {
		const d = combineDiv(f)
		divs.appendChild(d)
	})

	content.innerHTML = ""
	content.appendChild(divs)
}

function combineDiv(f) {
	// 父节点
	const fDiv = document.createElement("div")
	fDiv.className = "calendar-date-tbody"

	let el = ""
	f.forEach((e) => {
		const { formateDate, month } = e
		const nowDate = format(now)
		const className = ["calendar-item"]

		formateDate === format(new Date()) && className.push("now-active")

		formateDate === selected && className.push("active")

		month > now.getMonth() + 1 && className.push("calendar-item-after-month")

		month < now.getMonth() + 1 && className.push("calendar-item-before-month")

		el += `<div class="${className.join(" ")}" id="${formateDate}" data-year="${e.year}" data-month="${e.month}">
                                    <div class="calendar-item-header">${e.day}</div>
                                    <div class="calendar-item-content">
                                       ${
											Math.floor(Math.random() * 10) > 8
												? `<ul class="my-list">
                                           <li class="my-list-item blue">就是想看看新番导视啊</li>
                                           <li class="my-list-item yellow">就是想看看新番导视啊</li>
                                           <li class="my-list-item green">就是想看看新番导视啊</li>
                                           <li class="my-list-item red">就是想看看新番导视啊</li>
                                       </ul>`
												: ""
										}
                                    </div>
                                </div>`
	})
	fDiv.innerHTML = el

	return fDiv
}

// 切换年月的事件
function initFunc(e) {
	const { target } = e
	if (target.classList.contains("calendar-header-dir")) {
		let { month = 0, year = 0 } = target.dataset
		now.setMonth(now.getMonth() + +month, 1)
		now.setFullYear(now.getFullYear() + +year)
		init()
	}
}

// 点击日期事件
function initDateFunc(e) {
	const target = getElementByClassName(e.target, "calendar-item")
	if (target) {
		const id = target.id

		if (selected === id) {
			return
		}

		let { month, year } = target.dataset
		month = month - 1

		if (now.getMonth() !== month) {
			now.setMonth(month, 1)
			now.setFullYear(year)
			init()
		}

		document.getElementById(`${id}`).classList.add("active")
		const activeElement = document.getElementById(`${selected}`)
		activeElement && activeElement.classList.remove("active")
		selected = id
	}
}

window.onload = () => {
	init()

	dir.removeEventListener("click", initFunc)
	content.removeEventListener("click", initDateFunc)
	dir.addEventListener("click", initFunc)
	content.addEventListener("click", initDateFunc)
}
