
<ul>
    <li><a href="/">Home</a></li>
    <li ><a class="active" href="/about">About</a></li>
    <li><a href="/app">App</a></li>
</ul>


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

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: var(--sub-color);
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 999;
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