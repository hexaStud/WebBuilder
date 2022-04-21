<br/>
<p align="center">
  <a href="https://github.com/hexaStud/WebBuilder">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">WebBuilder</h3>

  <p align="center">
    Create interfaces only with Typescript
    <br/>
    <br/>
    <a href="https://github.com/hexaStud/WebBuilder/issues">Report Bug</a>
    .
    <a href="https://github.com/hexaStud/WebBuilder/wiki">Wiki</a>
    .
    <a href="https://github.com/hexaStud/WebBuilder/issues">Request Feature</a>
  </p>
</p>

![Downloads](https://img.shields.io/github/downloads/hexaStud/WebBuilder/total) ![Contributors](https://img.shields.io/github/contributors/hexaStud/WebBuilder?color=dark-green) ![Issues](https://img.shields.io/github/issues/hexaStud/WebBuilder) ![License](https://img.shields.io/github/license/hexaStud/WebBuilder)

## Table Of Contents

* [About the Project](#about-the-project)
* [Built With](#built-with)
* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
* [Contributing](#contributing)
* [License](#license)
* [Authors](#authors)

## About The Project

There are many tools like React, Angular to create modern website or interfaces, but all of those tools are bound to the
HTML structure.

With WebBuilder you can easily create and manage interfaces using Typescript.

## Built With

Typescript  
SASS

## Getting Started

This is an example of how to set up your project locally.  
To get a local copy up and running follow these simple steps.

### Prerequisites

Clone the source code and copy it to your project root

### Installation

1. Create a simple index.html file inside your project root directory (of course you can also create it inside a
   subdirectory but for simplicity this example will have the file located in the root directory)

2. Copy the HTML template into your file

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title</title>
</head>
<body>
</body>
<script type="module">
    import {Program} from "./Main.js";

    Program.Main.main([]);
</script>
</html>
```

3. Create your main Typescript file and adjust the path of the import in your index.html if needed.

The Typescript file should follow the conventions of the *hexa-studio OOP* template.

```
import {WebBuilder} from "../src/WebBuilder.js";


export namespace Program {
    import WebApp = WebBuilder.WebApp;

    export class Main {
        public static main(args: string[]) {

        }
    }
}

```

*Note*: Adjust the import paths of your Typescript file if neccessary.

4. Create your first WebRout implementation

```
import {WebBuilder} from "../src/WebBuilder.js";
import WebRout = WebBuilder.WebRout;
import WebStatus = WebBuilder.WebStatus;
import DataSize = WebBuilder.DataSize;

import {System} from "../src/System.js";
import Text = System.Text;

export class IndexRout extends WebRout {
    start() {
        return WebStatus.OK;
    }

    render() {
        this.renderElement(new Text({
            text: "Hello World";
        }));
    }
}
```

The `start` method is called once when the WebApp component is initially constructed.  
The `render` method is used to render all components and structures you use.

5. Add the newly created WebRout to your WebApp.

Add following to your `static main` method

```
    const webApp: WebApp = WebApp.createLocking();

    webapp.addRout("/", IndexPage);
    webapp.release();
```

`WebApp.createLocking` creates a new WebApp instance.  
`webapp.addRout` adds a new path rout to your application.

* The first argument represents the path in your url bar
* The seconds is the WebRout class name

`webapp.release` releases the configuration side of your WebApp. After releasing the application will start building the
DOM-Elements.

*Note*: You can only add WebRouts when the WebApp is not released yet.

## Contributing

Pull request are welcome at any time.  
Checkout the `src/System.ts` file and try to create your own components.

### Creating A Pull Request

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull request

## License

Distributed under the MIT License. See [LICENSE](https://github.com/hexaStud/WebBuilder/blob/main/LICENSE.md) for more
information.

## Authors

* **Christoph Koschel** - *A passionate fullstack developer from Germany*
  - [Christoph Koschel](https://github.com/Christoph-Koschel) - *Build Core and added the system component*
