#!/bin/bash
########################################################################################################################
# ██████╗  ██████╗ ████████╗███████╗██╗██╗     ███████╗███████╗
# ██╔══██╗██╔═══██╗╚══██╔══╝██╔════╝██║██║     ██╔════╝██╔════╝
# ██║  ██║██║   ██║   ██║   █████╗  ██║██║     █████╗  ███████╗
# ██║  ██║██║   ██║   ██║   ██╔══╝  ██║██║     ██╔══╝  ╚════██║
# ██████╔╝╚██████╔╝   ██║   ██║     ██║███████╗███████╗███████║
# ╚═════╝  ╚═════╝    ╚═╝   ╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝
########################################################################################################################
DIR="$HOME/dotfiles"

function checkcommand() {
  if [[ -f "$(command -v $1)" ]]; then
    echo "[$1] already installed..."
  else
    $2
  fi
}

function execIfExist() {
  if [[ -f "$(command -v $1)" ]]; then
    $2
  else
    echo "[$1] not exist"
  fi
}

########################################################################################################################
##### core installs
ln -sf $DIR/zsh/zshrc $HOME/.zshrc

########################################################################################################################
##### node config
function installvolta() {
  curl https://get.volta.sh | bash
  volta install node@latest
  volta install yarn@1.22.22
  npm i -g pnpm ts-node yarn neovim
}
checkcommand "volta" installvolta

#### Install git alias
function installGit(){
  sudo apt update
  sudo apt install git
}

function defineGitAlias(){
  git config --global alias.dog "log --all --decorate --oneline --graph"
  git config --global alias.undo "reset --soft HEAD^"
}

checkcommand "git" installGit
execIfExist "git" "defineGitAlias"

#### Install espanso
function installEspanso(){
  # https://espanso.org/docs/install/linux/#deb-x11
  wget https://github.com/federico-terzi/espanso/releases/download/v2.2.1/espanso-debian-x11-amd64.deb
  sudo apt install ./espanso-debian-x11-amd64.deb
  espanso service register
  espanso start

  rm ./espanso-debian-x11-amd64.deb
}

checkcommand "espanso" installEspanso

# Others links
ln -sf $DIR/config/espanso/config/default.yml "$(espanso path config)/config/default.yml"
ln -sf $DIR/config/espanso/match/base.yml "$(espanso path config)/match/base.yml"