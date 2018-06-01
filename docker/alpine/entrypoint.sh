#!/bin/sh

if [ -z "$USERNAME" ]; then
  USERNAME="demo"
fi

adduser -D $USERNAME
passwd $USERNAME -d

echo "$USERNAME ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

exec "$@"