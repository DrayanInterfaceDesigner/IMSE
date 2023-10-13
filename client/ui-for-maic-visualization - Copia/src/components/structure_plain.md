
### Structure for components:

┣ 📂components
┃ ┗ 📂example
┃   ┣ 📂styles
┃   ┃ ┣ 📜component.scss
┃   ┃ ┗ 📜component2.scss
┃   ┣ 📜component.jsx
┃   ┗ 📜component2.jsx

### JSX structure for simple components:
*ps: we're using a BEM variation for naming convention*

`<div class=ComponentName> 
    <p class=ComponentName__text>{text}</p> 
</div>`


### JSX structure for complex components:

`<div class=ComponentName> // component itself

    <div class=ComponentName__container> // holds the content
        <div class=ComponentName__mover> // moves the content inside the container
            <div class=ComponentName__sizer> // grants the size for the content

                <div class=ComponentName__innerComponent> // content itself
                ...lot of stuff here
                </div>

            </div>
        <div>
    <div>

</div>`

#### Why? 

This guarantees us the components will be able to move freely aroun the page, be resized and
anything we want, without changing its inner properties. 
The goal is to have complex components but easy to use.