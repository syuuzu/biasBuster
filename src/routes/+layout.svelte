<ul>
    <li><a href="/" >Home</a></li>
    <li ><a href="/about">About</a></li>
    <li><a href="/app">App</a></li>
</ul>

<div id="mySidenav" class="sidenav">
    <a href="/" id="home">Home</a>
    <a href="/about" id="about">About</a>
    <a href="/app" id="app">App</a>
  </div>

<style>
    
	:root {
		--bg-color: #313131;
		--main-color: #f66e0d;
		--caret-color: #f66e0d;
		--sub-color: #616161;
		--sub-alt-color: #1c1c1f;
		--text-color: #f5e6c8;
		--error-color: #e72d2d;
		--error-extra-color: #7e2a33;
		--colorful-error-color: #e72d2d;
		--colorful-error-extra-color: #7e2a33;
	}
    #mySidenav a {
        position: absolute;
        left: -80px;
        transition: 0.3s;
        padding: 15px;
        width: 100px;
        text-decoration: none;
        font-size: 20px;
        color: white;
        border-radius: 0 5px 5px 0;
    }

    #mySidenav a:hover {
       left: 0;
    }

    #home {
        top: 120px;
        background-color: var(--main-color)
    }

    #about {
        top: 180px;
        background-color: var(--main-color)
    }

    #app {
        top: 240px;
        background-color: var(--main-color)
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        background-color: var(--bg-color);
        top: 0;
        left: 0;
        width: 100%;
 
    }
    
    li {
        margin: auto;
        float: left;
    }

    li a {
        display: block;
        color: var(--text-color);
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }

    li a:hover:not(.active) {
        background-color: var(--bg-color);
    }

    .active {
        background-color: var(--main-color);
    }
</style>
<slot></slot>