# CamViewerPlus

### A customizable browser-based RTSP viewer with multiple grid views.

## Getting Started
### Docker
1. Usage of `docker-compose` is reccomended:
```version: '3'
services:
  camviewerplus:
    container_name: camviewerplus
    image: 'fanman03/camviewerplus:1.2.0'
    restart: unless-stopped
    ports:
      - '6900:6900/udp'
      - '6900:6900'
      - '6980:6980'
      - '3000:3000'
    volumes:
      - config:/usr/src/camviewerplus/conf
volumes:
  config:
```
2. Once the container has been started, a web UI should be live at `http://server-ip:6980`.
3. The config file can be edited by opening the `config.json` file located in the docker volume with your favorite text editor, i.e. `sudo nano /var/lib/docker/volumes/camviewer-plus_config/_data/config.json`.
4. Once configuration changes have been made, restart the container.
### NodeJS
1. Ensure Node.JS and NPM are installed.
2. Clone the git repo.
3. Run `npm i` to install all dependencies.
4. Run `npm run start-prod`. If all went well, a web UI should be live at `http://server-ip:6980`.
5. Edit `config.json` to suit your own preferences.
4. Once configuration changes have been made, restart the app.

## Client
Due to issues with some web browsers, a standalone client exists that is optimized for viewing streams.
[CamViewerPlus Client](https://github.com/Fanman03/CamViewerPlus-Client/)

## Feature Tracker
☑ Customizable grid views

☑ Pan / Zoom (digital)

☐ Multiple streams per camera
