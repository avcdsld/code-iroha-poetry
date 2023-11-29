# Setup

```
ping raspberrypi.local

ssh ara@raspberrypi.local
```

```
sudo passwd root

sudo adduser poet

sudo usermod -G ara,adm,dialout,cdrom,sudo,audio,video,plugdev,games,users,input,render,netdev,spi,i2c,gpio,lpadmin poet

exit
```

```
ssh poet@raspberrypi.local

    sudo apt update

    sudo visudo
```

```
#includedir /etc/sudoers.d
poet  ALL=(ALL) NOPASSWD: ALL
```

```
sudo gpasswd -d ara sudo

sudo vim /etc/lightdm/lightdm.conf
```

```
#autologin-user=pi
```

```
sudo raspi-config
        1. System Options
        -> S5 Boot / Auto Ligin
        -> B1 Console
        -> Finish
        -> reboot now <YES>

ssh poet@raspberrypi.local
```

```
sudo userdel -r ara

id -a pi
    id: 'ara': no such user

sudo apt update

sudo apt upgrade

sudo apt install nodejs

sudo apt install dhcpcd5

sudo systemctl enable dhcpcd

sudo vim /etc/dhcpcd.conf
```

```
static domain_name_servers=8.8.8.8 8.8.4.4
```
->
```
static domain_name_servers=1.1.1.1 1.0.0.1
```

```
sudo service dhcpcd restart

cat /etc/resolv.conf

npm install -g yarn

# Install Golang
wget -4 https://go.dev/dl/go1.21.4.linux-armv6l.tar.gz
sudo tar -C /usr/local -xzf go1.21.4.linux-armv6l.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
echo 'export PATH=$HOME/go/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Install Java
sudo apt install default-jdk
java -version
    openjdk version "17.0.9" 2023-10-17
    OpenJDK Runtime Environment (build 17.0.9+9-Debian-1deb12u1)
    OpenJDK 64-Bit Server VM (build 17.0.9+9-Debian-1deb12u1, mixed mode, sharing)

# Install Mono (C# compiler)
sudo apt install mono-complete

# Install Ruby
sudo apt install ruby

# Install PHP
sudo apt install php
sudo systemctl stop apache2
sudo systemctl disable apache2
sudo systemctl status apache2

# yarn install がネットワークエラーで繋がらないので、IP v6 を無効化する
sudo vim /etc/sysctl.conf
```

```
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
net.ipv6.conf.lo.disable_ipv6 = 1
```

```
sudo sysctl -p
ping -c 4 google.com
```

---

# Testing

```
curl "http://raspberrypi.local/run?poem=i"
    {"elapsedTime":"0.180565035","macAddress":"dc:a6:32:f3:b6:77","timestamp":1701002842529}% 
```

---
# Preparation


```
pwd
    /home/poet

git clone https://github.com/avcdsld/code-iroha-poetry.git

cd code-iroha-poetry/raspi/

javac codes/NewMediaArt/Main.java
mcs codes/PostMedium/PostMediumArt.cs
```

```
## Cloudflare にアカウントを作成し、Web サイトを追加
    poesy.run
    codepoetry.cloudflare...
    https://zenn.dev/togetine/articles/6c9db2db7a9dd9#%E3%83%89%E3%83%A1%E3%82%A4%E3%83%B3%E3%81%AE%E7%99%BB%E9%8C%B2

ssh poet@raspberrypi.local
```

```
wget -4 https://github.com/cloudflare/cloudflared/releases/download/2023.10.0/cloudflared-linux-armhf.deb

sudo apt install ./cloudflared-linux-armhf.deb

cloudflared tunnel login
    ブラウザでログインして認証

sudo ls /home/poet/.cloudflared/cert.pem

# raspi という名前の Tunnel を作成（/home/poet/.cloudflared/ に認証情報 json が作成される）
cloudflared tunnel create raspi

cd /home/poet/.cloudflared/

sudo vi config.yml
    ```
    tunnel: raspi
    credentials-file: /home/poet/.cloudflared/c19ba24d-ac62-47fa-b625-e2703cdb9b43.json

    ingress:
    - hostname: api.poesy.run
        service: http://localhost:80
    - service: http_status:404
    ```

# cloudflared tunnel route dns <トンネル名> api.<ドメイン名>
cloudflared tunnel route dns raspi api.poesy.run
```

---
# systemd サービスとして設定

```
ssh poet@raspberrypi.local
```

```
sudo vim /etc/systemd/system/cloudflared-tunnel.service
```

```
[Unit]
Description=Cloudflare Tunnel

[Service]
ExecStart=/usr/local/bin/cloudflared tunnel run raspi
Restart=always
User=poet

[Install]
WantedBy=multi-user.target
```

```
sudo systemctl enable cloudflared-tunnel
sudo systemctl start cloudflared-tunnel

sudo vim /etc/systemd/system/node-webserver.service
```

```
[Unit]
Description=Node.js Web Server

[Service]
ExecStart=/usr/bin/node /home/poet/code-iroha-poetry/raspi/index.js
WorkingDirectory=/home/poet/code-iroha-poetry/raspi
Restart=always
User=root

[Install]
WantedBy=multi-user.target
```

```
sudo systemctl enable node-webserver
sudo systemctl start node-webserver
```

## ファイアウォール

```
ssh poet@raspberrypi.local
    sudo apt install ufw
    sudo ufw default deny
    sudo ufw allow 22
    sudo ufw allow 80
    sudo ufw allow 443
    sudo ufw allow 7844
    sudo ufw enable
    sudo ufw status
```

## SSH 公開鍵認証

```
ssh-keygen -t ed25519 -f id_ed25519_raspi    
    Generating public/private ed25519 key pair.
    Enter passphrase (empty for no passphrase): 
    Enter same passphrase again: 
    Your identification has been saved in id_ed25519_raspi
    Your public key has been saved in id_ed25519_raspi.pub
    The key fingerprint is:
    SHA256:L3RXKgc950uld68DX+Qx6eNjjdnpz+0mYoE0TAVh5hI t-arakawa@F7C34JNJQP
    The key's randomart image is:
    +--[ED25519 256]--+
    |        E =+.    |
    |         =..     |
    |        .oo o o o|
    |         .+. * *.|
    |        S.oo+ =o=|
    |       . o.+o. ==|
    |        . .  +o==|
    |         .  o *B=|
    |           . .+*B|
    +----[SHA256]-----+

ssh-copy-id -i id_ed25519_raspi poet@raspberrypi.local

ssh -i ~/.ssh/id_ed25519_raspi poet@raspberrypi.local

sudo vim /etc/ssh/sshd_config
    「#PasswordAuthentication yes」という行の下に、「PasswordAuthentication no」追記
    「#PermitRootLogin」という行の下に、「PermitRootLogin no」追記
```

---

# Maintenance

```
ssh -i ~/.ssh/id_ed25519_raspi poet@raspberrypi.local
cd ~/code-iroha-poetry/raspi
git pull
yarn
sudo systemctl restart node-webserver
sudo systemctl restart cloudflared-tunnel
```
