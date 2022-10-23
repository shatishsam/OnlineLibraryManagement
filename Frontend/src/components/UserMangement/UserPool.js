import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "us-east-1_608tDYWXh",
    ClientId: "6e4fvhhdlokhv25tnb8d7itc88"
}

export default new CognitoUserPool(poolData)