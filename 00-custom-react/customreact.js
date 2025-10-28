// virtual DOM
const reactElement = {
  type: 'a',
  props: {
    href: "https://wikipedia.com",
    target: "_blank"
  },
  children: 'click here to visit wikipedia.'
}

// select root element from real DOM (createRoot)
const mainContainer = document.querySelector('#root')

// render method of createRoot
function customRender(reactElement, mainContainer) {
  const element = document.createElement(`${reactElement.type}`)
  for (let prop in reactElement.props) {
    if (prop === 'children') continue
    element.setAttribute(prop, reactElement.props[prop])
  }
  element.textContent = reactElement.children
  mainContainer.appendChild(element)
}

customRender(reactElement, mainContainer)
