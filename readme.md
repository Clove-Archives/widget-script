<div align="center">
<img src="https://doughmination.is-a.dev/images/favicon/avatar.png" alt="Clove Twilight avatar" height="100">

# Discord Widget-v2 Script
</div>

## Prequistories

Node 20+ only

## How it works

First of all, you need to follow <a href="https://chloecinders.com/blog/discord-widgets">this guide to Discord V2 Widgets</a>, making sure that the bot is installed BEFORE you run this script!

As the owner of the app, you can add it to your user directly, however I reccomend following the auth Chloe points out. (ie https://discord.com/oauth2/authorize?client_id=198622483471925248&response_type=code&redirect_uri=https%3A%2F%2Fdiscord.com&scope=openid+sdk.social_layer)

### Setting up the enviroment variables needed:

You need to copy the file named `.env.example` into a file called `.env`
> If you cannot find the file, right click in the folder > open terminal > then `cp .env.example .env` and edit the values

Example:
```txt
# Bot token (Developer Portal -> Bot -> Reset Token)
DISCORD_TOKEN=MTk4NjIyNDgzNDcxOTI1MjQ4.Cl2FMQ.ZnCjm1XVW7vRze4b7Cq4se7kKWs

# Your application's Client ID (Developer Portal -> General Information)
DISCORD_APPLICATION_ID=198622483471925248

# The Discord user ID whose profile widget you're setting.
# (They must have authorized your app once with openid + sdk.social_layer.)
DISCORD_USER_ID=1464890289922641993
```

### Running the script itself

You will need to install the dependacies by running:
```sh
npm i
```

Then deploy the information to the widget by running:
```sh
npm run deploy
```
---

# Legal stuff 
## License
The project is licenced under the ESAL-1.4 licence, see this [License](./LICENCE.md) for more info
