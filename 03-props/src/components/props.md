# React Philosophy

React says that ditch the traditional way of sperating html, css, js (which are technologies)  
Instead ecapsulate all the technologies exactly and relevant to individual components.  
This way these components are self contained (JSX - html/js and Tailwind - css) and can be re-used everywhere.

# Props (properties)

Mechanism for passing data from a parent component to a child component. They are fundamental to building reusable and dynamic React applications.

This Card component has hard-coded values like button text, image, person name, etc.  
In this state if you reuse this component elsewhere there's no way to 'set' data according to need.  
This way you can sort of create your own version of a template-like component each time my passing different prop values.  
Props are essential for creating reusable components. By accepting different props, a single component can be used in various contexts to display different data or behave differently without needing to be rewritten multiple times.

The parent component for Card is App.  
You create props in the App scope and that is passed to the Child.  
Props are read-only within the child component that receives them. A child component cannot directly modify the props it receives.  
If a component needs to change data, it must manage its own "state" or trigger a state change in a parent component.

Mechanism:  
1. props values/expressions that are passed as attributes to a child. here username, obj, arr and age are props are passed to child.
    ```js
    function App() {

      let myObj = {
        isWorried: true,
      }

      let myArr = [1,2,3]

      return (
        <>
            <Card username="Vikas" obj={myObj} arr={myArr} age={23}/>
        </>
      );
    }
    ```
1. This App is rendered like this in main.jsx
    ```js
    createRoot(document.getElementById('root')).render(<><App /></>)
    ```
    - render method converts whatever is in jsx syntax, thats being returned from App into tree of nodes, basically an object.
    - this object has all the properties in it with the props we passed.
        ```js
        React.createElement(Card, { username: "Vikas", obj: myObj, arr: myArr, age: 23 })
        ```
1. In the child, you recieve the prop object as the first argument to the function.
    ```js
    function Card(props) {
      return (
        <p>Name: {props.username}, Age: {props.age}</p>
      );
    }

    // or by destructuring the prop object.
    // say age prop wasn't passed by parent but child is accpecting it then use default values in parameter.

    function ChildComponent({ username: name, age="18"}) {
      return (
        <p>Name: {name}, Age: {age}</p>
      );
    }
    ```
