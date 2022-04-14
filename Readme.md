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

There are many Tools like React, Angular to create modern Website or Interfaces, but all these tools are bind to the HTML structure.

With WebBuilder you can easily create and manage interfaces through Typescript.

## Built With

Typescript
SASS

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

Download the source code and copy it to your project root

### Installation

1. Create a simple index.html file into your project the file can be in a subdirectory

2. Copy the file Template into the file
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

3. Create your main typescript file and change the path in the index.html script import

The typescript file should contain the hexa-studio oop index point

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

*Note*: Change the import paths of your Typescript file


4. Create your first WebRout Class

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

The `start` method is for loading WebApp components.
The `render` method render all components and structures you use.

5. Add your WebRout to your WebApp

Add following to your `static main` method

```
    const webApp: WebApp = WebApp.createLocking();

    webapp.addRout("/", IndexPage);
    webapp.release();
```

`WebApp.createLocking` creates a new WebApp instance
`webapp.addRout` adds a new path rout to your application
* The first argument represents the path in your url bar
* The seconds is the WebRout class name

`webapp.release` releases the configuration part of your WebApp. After the release the Application start building.

*Note*: You can only add WebRouts when the WebApp is not released



## Contributing

Pull Request are at any time welcome checkout the src/System.ts file and try to create your own components.

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](https://github.com/hexaStud/WebBuilder/blob/main/LICENSE.md) for more information.

## Authors

* **Christoph Koschel** - *A passionate fullstack developer from Germany* - [Christoph Koschel](https://github.com/Christoph-Koschel) - *Build Core and added the system component*
