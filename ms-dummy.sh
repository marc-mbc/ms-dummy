#!/bin/bash
#
# initd a node app
# Based on a script posted by https://gist.github.com/jinze at https://gist.github.com/3748766
#
# Example usage:
#
# You can use this to start this service /etc/init.d/ms-dummy
#
# needs forever to work: npm install -g forever
#

# Source function library.
. /lib/lsb/init-functions

pidFile=/var/run/ms-dummy.pid
logFile=/var/run/ms-dummy.log

nodeApp=/var/www/node/ms-dummy/index.js
NAME=ms-dummy


start() {
    echo "Starting $nodeApp"

    # This is found in the library referenced at the top of the script
    start_daemon

    # Notice that we change the PATH because on reboot
   # the PATH does not include the path to node.
   # Launching forever with a full path
   # does not work unless we set the PATH.
   PATH=/usr/local/bin:$PATH
    export NODE_ENV=development
    export NODE_CONFIG_DIR=/var/www/node/$NAME/config
   #PORT=80
   forever start --pidFile $pidFile -l $logFile -a -d $nodeApp
   RETVAL=$?
}

restart() {
    echo -n "Restarting $nodeApp"
    /usr/local/bin/forever restart $nodeApp
    RETVAL=$?
}

stop() {
    echo -n "Shutting down $nodeApp"
   /usr/local/bin/forever stop $nodeApp
   RETVAL=$?
}

status() {
   echo -n "Status $nodeApp"
   /usr/local/bin/forever list
   RETVAL=$?
}

case "$1" in
   start)
        start
        ;;
    stop)
        stop
        ;;
   status)
        status
       ;;
   restart)
    restart
        ;;
    *)
       echo "Usage:  {start|stop|status|restart}"
       exit 1
        ;;
esac
exit $RETVAL
