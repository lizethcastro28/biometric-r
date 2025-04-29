import { defineBackend } from "@aws-amplify/backend";
import { Stack } from "aws-cdk-lib";
import { Policy, PolicyStatement, Role } from "aws-cdk-lib/aws-iam";
import { auth } from "./auth/resource";
import { channelFunction } from "./functions/getChannel/resource";

const backend = defineBackend({
  auth,
  channelFunction,
});

// Crear un stack para la Lambda
const apiStack = backend.createStack("biometric-stack");

// Policy para invocar APIs externas
const invokeExternalApiPolicy = new Policy(apiStack, "InvokeExternalApiPolicy", {
  statements: [
    new PolicyStatement({
      actions: [
        "execute-api:Invoke",
      ],
      resources: ["*"],
    }),
  ],
});

// Asociar la policy al rol de la Lambda
const lambdaChannelRole = backend.channelFunction.resources.lambda.role as Role;
lambdaChannelRole.attachInlinePolicy(invokeExternalApiPolicy);

// add outputs to the configuration file
backend.addOutput({
  custom: {
    ChannelFunction: {
      functionName: backend.channelFunction.resources.lambda.functionName,
      functionArn: backend.channelFunction.resources.lambda.functionArn,
      region: Stack.of(apiStack).region,
    },
  },
});
