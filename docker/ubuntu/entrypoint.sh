#!/bin/sh

rm /etc/update-motd.d/*
rm /etc/legal
screenfetch -L > /etc/motd
echo "\n           Welcome to Ubuntu\n" >> /etc/motd

if [ -z "$USERNAME" ]; then
  USERNAME="demo"
fi

useradd \
  -s /bin/bash \
  -m \
  -d /home/$USERNAME \
  $USERNAME

echo "$USERNAME:$USERNAME" | chpasswd

echo "$USERNAME ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

exec "$@"