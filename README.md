# Gnome DDCcontrol

Gnome Shell extension to control external brightness.
This is forked from sd65 to allow two monitors.

## How to install

get ddccontrol 

get ddccontrol running as user:
 sudo apt-get install gddccontrol i2c-tools
 sudo adduser $USER i2c
 sudo /bin/sh -c 'echo i2c-dev >> /etc/modules'
see http://www.techytalk.info/debian-ubuntu-gddccontrol-non-root/comment-page-1/

donload as zip and install via gnome-tweak-tool


## How to setup

use ddccontrol in terminal (or gddccontrol) to find out your monitors adresses

as Preferences do not work (at least for me) I deleted it. Instead go to your gnome shell extensions directory (~/.local/share/gnome-shell/extensions), locate the extension and edit the org.gnome.shell.extensions.ddccontrol.gschema.xml in the schemas subdirectory according to the adresses you found.



### In case of trouble

Use gnome tweak tool to see whether the extension is really there and enabled.

Use looking glass to see more details (ALT+F2 lg)
