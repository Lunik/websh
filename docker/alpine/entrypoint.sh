#!/bin/sh

screenfetch -L > /etc/motd
echo -e "\n     Welcome to AlpineLinux\n" >> /etc/motd

if [ -z "$USERNAME" ]; then
  USERNAME="demo"
fi

adduser \
  -D \
  -s /bin/bash \
  $USERNAME

echo "$USERNAME:$USERNAME" | chpasswd

echo "$USERNAME ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

exec "$@"