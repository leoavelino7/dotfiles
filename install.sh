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