export const HELP_MESSAGE = `CLU helps you nagivate the complexity of the Cloudflare API.
Use it as you would use a native CLI client, try whatever feels intuitive. It's pretty smart.

Usage: [scope] [command] <options>

Scopes:
\taccounts - Account level endpoints.
\t\t(example: account ls vectorize indexes --accountId 1234)

\tzones - Zone level endpoints
\t\t(example: zones ls rulesets --zoneId 1234)

\tradar - Radar level endpoints.
\t\t(example: idk i don't use radar)

\tmisc (default) - All other endpoints.
\t\t(example: get user)
\n`;