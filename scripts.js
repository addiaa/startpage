/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"XqQ9Qy76LDrQPDIj","label":"school","bookmarks":[{"id":"kZRBUjHtmSKrssKB","label":"MAT237","url":"https://q.utoronto.ca/courses/280409"},{"id":"EiQjGAitjdhsI1Nd","label":"CSC236","url":"https://q.utoronto.ca/courses/278553"},{"id":"YnxmvY8IFUkFpKrW","label":"CSC207","url":"https://q.utoronto.ca/courses/278453"},{"id":"A2G7DujWAGjC0hCB","label":"STA247","url":"https://q.utoronto.ca/courses/278353"}]},{"id":"nlylGGQyKre5DZqj","label":"procrastination","bookmarks":[{"id":"VxwnyuLdPYr4E2lO","label":"youtube","url":"https://www.youtube.com/"},{"id":"avuGvJZNB8jFvdo2","label":"twitch","url":"https://www.twitch.tv/"},{"id":"xqLqb57gE1FMDaCt","label":"instagram","url":"https://www.instagram.com/"}]},{"id":"2hwQ8yjB2JtbKJs8","label":"other","bookmarks":[{"id":"3apZoKmLsrdEzZ8T","label":"acorn","url":"https://acorn.utoronto.ca/sws/#/"},{"id":"sxxlb7hw9ahOlZFc","label":"quercus","url":"https://q.utoronto.ca/"},{"id":"WWIrW21nS9xqy4Sw","label":"overleaf","url":"https://www.overleaf.com/project"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
