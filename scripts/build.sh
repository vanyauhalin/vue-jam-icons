#!/usr/bin/env sh

set -e
clear

TEMP='temp'
CONFIG='config.json'
OWNER=`jq -r '.owner' $CONFIG`
REPO_ICONS=`jq -r '.repos.icons' $CONFIG`
REPO_SRC=`jq -r '.repos.src' $CONFIG`
VERSION=`jq -r '.version' $CONFIG`
SLUG=`jq -r '.slug' $CONFIG`

# Chalk for coloring messages | chalk --flags 'message'.
chalk() {
  local ESC='\033'
  local NC="$ESC[0m"
  local message="${@: -1}"

  while test $# -gt 0; do
    case "$1" in
      --red)    message="$ESC[31m$message$NC"; shift;;
      --green)  message="$ESC[32m$message$NC"; shift;;
      --blue)   message="$ESC[34m$message$NC"; shift;;
      --bold)   message="$ESC[1m$message$NC";  shift;;
      *)                                       break;;
    esac
  done

  echo -e $message
}

ERROR=`chalk --red --bold 'Error'`
DONE=`chalk --green --bold 'Done'`
S=`chalk --green '!'`

check_version() {
  echo -e "$S Checking the version of Jam icons in:"
  printf "  – jam-icons: "

  latest=`curl -s \
    https://api.github.com/repos/$OWNER/$REPO_ICONS/releases | jq -r .[0].name`

  echo $latest
  echo -e "  – vue-jam-icons: $VERSION"

  if [[ $latest == $VERSION ]]; then
    echo -e $'\n'"$ERROR In vue-jam-icons used the latest version of Jam icons."$'\n'
    exit
  fi
}

download_icons() {
  printf "$S Downloading Jam icons: "

  svn checkout -q https://github.com/$OWNER/$REPO_SRC/trunk/$SLUG $TEMP

  echo -e $DONE
}

generate_src() {
  echo -e "$S Generating icon source files: "

  node -r esm create-icons.js || exit 1
}

update_version() {
  printf "$S Updating the version of Jam icons for the vue-jam-icons: "

  local updating=`echo .version = '"'"$latest"'"'`

  echo `cat $CONFIG | jq "$updating"` > $CONFIG
  echo -e $DONE
}

clean_up() {
  printf "$S Cleaning up temporary files: "

  rm -rf $TEMP

  echo -e $DONE
}

echo -e `chalk --blue --bold 'Building Vue component for Jam icons'`$'\n'

check_version
update_version
download_icons
generate_src
clean_up

echo -e $'\n'"$DONE building icons."$'\n'
