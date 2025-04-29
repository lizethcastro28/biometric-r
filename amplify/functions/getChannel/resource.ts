import { defineFunction } from "@aws-amplify/backend";


/**
 * channelFunction
 */
export const channelFunction = defineFunction({
    name: "channel-function",
    timeoutSeconds: 300,
    environment: {
        OAUTH_TOKEN_URL: process.env.OAUTH_TOKEN_URL || "",
        GET_CHANEL_URL: process.env.GET_CHANEL_URL || "",
        SECRET_NAME: process.env.SECRET_NAME || ""
    },
})