# led-controller
RaspberryPi LED controller for ATA102C LED strips.

## Introduction
This project provides a NodeJS API server with VueJS frontend to control 'Adafruit DotStar' LEDs connected to a Raspberry Pi via the SPI bus.

## Setup
Install the required NodeJS dependencies:

```bash
npm install
```

## Run the project
To start the server and serve the frontend:

```bash
npm start
```

## Hubitat Integration
The API is designed to be accessed via the served frontend but Hubitat Elevation integration is provided via a Virtual RGB driver - https://github.com/psyvision/led-controller-hubitat

## API Endpoints

`GET /status` - Returns the `status`, `level` and `colour` of the strip

`POST /status/on` - Turn the strip on

`POST /status/off` - Turn the strip off

`GET /colour` - Returns the `colour` of the strip

`POST /colour` - Sets the colour of the strip

`GET /level` - Returns the `level` of the strip

`POST /level` - Sets the level of the strip
